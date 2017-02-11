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


export const getUserData = Observable.forkJoin(__getUser, getTransactions())

// export const getUserData = () => ajax({ url: userURL }).map(norm)

export const addTransaction = transaction =>
  ajax(__add_req(transaction)).map(norm)

export const delTransaction = id =>
  ajax(__del_req(id)).map(r => norm(r).id)

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const __add_req = item => ({
  url: api.addTransactionURL(item),
  method: 'POST',
  headers: jsonHeaders,
  body: denorm(item)
})

const __del_req = id => ({
  url: api.delTransactionURL(id),
  method: 'DELETE'
})

export { getTransactions }
