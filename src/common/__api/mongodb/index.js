/* set necessary adapter */
import * as urls from './urls'
// export * from './redis'

import { normalize, denormalize /*, convertCategoryPath*/ } from './utils'

import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'

import config from '../../config'

const { userId } = config
const userURL = urls.getUserURL(userId)

const norm = r => normalize(r.response)

// return redux-action-object
const action = r => type => ({type, payload: normalize(r.response)})

const jsonHeaders = {
  'Content-Type': 'application/json;charset=UTF-8'
}

const __getUser = () => ajax({ url: userURL }).map(norm)

// const getTransactions = date => ajax({ url: transactionsDatedURL(date) }).map(norm)

const getTransactions = filter => {
  if (!filter) {
    filter = new Date()
    filter = { year: filter.getFullYear(), month: filter.getMonth() }
  }
  let url = urls.getTransactionsURL(userId, filter)
  return ajax({ url }).map(norm)
}

export { getTransactions }

// export const getUserData = () => Observable.forkJoin(__getUser(), getTransactions())

export const getUserData = () =>
  Observable.forkJoin(__getUser(), getTransactions())
    .map(r => {
      const { categories, ...user } = r[0]
      return {
        user,
        categories,
        transactions: r[1]
      }
    })


// export const getUserData = () => ajax({ url: userURL }).map(norm)

export const addTransaction = transaction =>
  ajax({
    url: urls.addTransactionURL(transaction),
    method: 'POST',
    headers: jsonHeaders,
    body: denormalize(transaction)
  }).map(action)

export const delTransaction = id =>
  ajax({
    url: urls.delTransactionURL(id),
    method: 'DELETE'
  }).map(r => norm(r).id)

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const addCategory = category =>
  ajax(__req_category(category, urls.addCategoryBody)).map(norm)

export const updateCategory = category =>
  ajax(__req_category(category, urls.updateCategoryBody)).map(norm)

export const delCategory = category =>
  ajax(__req_category(category, urls.delCategoryBody)).map(norm)

const __req_category = (body, conv) => ({
  url: urls.getUserURL(userId),
  method: 'PUT',
  headers: jsonHeaders,
  body: JSON.stringify(conv(body))
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
