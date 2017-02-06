/* set necessary adapter */
import * as api from './mongodb'
// export * from './redis'

import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'
import initialState from '../initialState'

const { id: userId } = initialState.config.user
const userURL = api.getUserURL(userId)
const transactionsURL = api.getTransactionsURL(userId, order='-1')
const norm = r => api.normalize(r.response)
const denorm = api.denormalize

const jsonHeaders = {
  'Content-Type': 'application/json;charset=UTF-8'
}

const __getUser = ajax({ url: userURL }).map(norm)

const __getTransactions = ajax({ url: transactionsURL }).map(norm)

export const getUserData = Observable.forkJoin(__getUser, __getTransactions)

// export { __getUser, getTransactions }
export const getTransactions = () => __getTransactions

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
