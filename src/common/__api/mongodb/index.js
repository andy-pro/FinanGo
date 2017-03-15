import * as urls from './urls'

import { normalize, denormalize } from './utils'

import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'

const norm = r => normalize(r.response)

const jsonHeaders = {
  'Content-Type': 'application/json;charset=UTF-8'
}

const getUser = () =>
  ajax({ url: urls.user })
  .map(norm)

const getTransactions = query =>
  ajax({ url: urls.transformQuery(query, 1) }) // second arg - order, default by date
  .map(norm)

export { getUser, getTransactions }

export const getUserData = query =>
  Observable.forkJoin( getUser(), getTransactions(query) )
  .map(r => {
    const { categories, ...user } = r[0]
    return {
      user,
      categories,
      transactions: r[1],
    }
  })


export const addTransactions = transactions =>
  ajax({
    url: urls.transactions,
    method: 'POST',
    headers: jsonHeaders,
    body: denormalize(transactions)
  })
  .map(norm)

export const delTransactions = query =>
  ajax({
    url: urls.transformQuery(query),
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify([])
  })
  .map(({ response }) => response)

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const cmdCategory = (payload, cmd) =>
  ajax ({
    url: urls.user,
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(urls[cmd+'Category'](payload))
  })
  .map(r => r.response.categories)
  // .map(norm)
  // .map(r => ({ type, payload: r }))
  // .catch(dispatchError)

//
// export const category = ({ type, payload, $op }) =>
//   ajax ({
//     url: urls.user,
//     method: 'PUT',
//     headers: jsonHeaders,
//     body: JSON.stringify(urls[$op](payload))
//   })
//   .map(norm)
//   // .map(r => ({ type, payload: r }))
//   .catch(dispatchError)

export const getCategories = () =>
  ajax({ url: urls.user })
  .map(r => r.response.categories)

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
