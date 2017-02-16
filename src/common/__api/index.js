/* set necessary adapter */
import * as api from './mongodb'
// export * from './redis'

import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import initialState from '../initialState'

const { id: userId } = initialState.config.user
const userURL = api.getUserURL(userId)

const norm = r => api.normalize(r.response)
const denorm = api.denormalize

const jsonHeaders = {
  'Content-Type': 'application/json;charset=UTF-8'
}

const __getUser = ajax({ url: userURL }).map(norm)

// const getTransactions = date => ajax({ url: transactionsDatedURL(date) }).map(norm)

const getTransactions = filter => {
  if (!filter) {
    filter = new Date()
    filter = { year: filter.getFullYear(), month: filter.getMonth() }
  }
  let url = api.getTransactionsURL(userId, filter)
  return ajax({ url }).map(norm)
}

export { getTransactions }

export const getUserData = Observable.forkJoin(__getUser, getTransactions())

// export const getUserData = () => ajax({ url: userURL }).map(norm)

export const addTransaction = transaction =>
  ajax({
    url: api.addTransactionURL(transaction),
    method: 'POST',
    headers: jsonHeaders,
    body: denorm(transaction)
  }).map(norm)

export const delTransaction = id =>
  ajax({
    url: api.delTransactionURL(id),
    method: 'DELETE'
  }).map(r => norm(r).id)

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const addCategory = category =>
  ajax(__req_category(category, api.addCategoryBody)).map(norm)

export const updateCategory = category =>
  ajax(__req_category(category, api.updateCategoryBody)).map(norm)

export const delCategory = category =>
  ajax(__req_category(category, api.delCategoryBody)).map(norm)

const __req_category = (body, conv) => ({
  url: api.getUserURL(userId),
  method: 'PUT',
  headers: jsonHeaders,
  body: JSON.stringify(conv(body))
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
