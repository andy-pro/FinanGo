import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'

import * as urls from './urls'
import { normalize, denormalize } from './utils'

const norm = r => normalize(r.response)

const jsonHeaders = {
  'Content-Type': 'application/json;charset=UTF-8'
}

const getUser = () =>
  ajax({
    url: urls.user(),
    // test: console.log('get user', new Date()),
  })
  .map(norm)

const getTransactions = ({ query }) =>
  ajax({
    url: urls.transformQuery(query, 1),  // second arg - order, default by date
    // test: console.log('get transactions', new Date()),
  })
  .map(norm)

// export { getUser, getTransactions }

const getUserData = query =>
  Observable.forkJoin( getUser(), getTransactions(query) )
  .map(([{categories, ...user}, transactions]) => ({
    user,
    categories,
    transactions,
  }))

const replaceTransactions = query =>
  delTransactions(query)
    .mergeMap(r =>
      r.removed === undefined ?
        Observable.throw(new Error('Deleting transactions: error'))
      :
        addTransactions(query)
    )

const addTransactions = ({ data }) =>
  ajax({
    url: urls.transactions,
    method: 'POST',
    headers: jsonHeaders,
    body: denormalize(data),
    // test: console.log('add transactions', new Date()),
  })
  .map(norm)

const delTransactions = ({ query }) =>
  ajax({
    url: urls.transformQuery(query),
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify([]),
    // test: console.log('del transactions', new Date()),
  })
  .map(({ response }) => response)


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const __api = {
  $init:    getUserData,
  $get:     getTransactions,
  $add:     addTransactions,
  $del:     delTransactions,
  $replace: replaceTransactions,
}

export const apiTransactions = query => __api[query.cmd](query)

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const apiCategories = (payload, cmd) => {
  /* cmd: get, add, update, del */
  let opts = cmd === 'get' ? {} : {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(urls[cmd+'Category'](payload))
  }
  opts.url = urls.user()
  return ajax (opts)
  .map(r => r.response.categories)
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
