import * as urls from './urls'

import { normalize, denormalize } from './utils'

import { Observable } from 'rxjs'
import { ajax } from 'rxjs/observable/dom/ajax'

import config from '../../config'

const dispatchError = error => Observable.of({
  type: 'APP_ERROR',
  payload: { error }
})

const norm = r => normalize(r.response)

const jsonHeaders = {
  'Content-Type': 'application/json;charset=UTF-8'
}

const __getUser = () => ajax({ url: urls.user }).map(norm)

const __getTransactions = filter => {
  let url = urls.filterTransactions(filter)
  return ajax({ url }).map(norm)
}

export const getUserData = ({ type }) =>
  Observable.forkJoin(__getUser(), __getTransactions())
    .map(r => {
      const { categories, ...user } = r[0]
      return {
        type,
        payload: {
          user,
          categories,
          transactions: r[1]
        }
      }
    })
    .catch(dispatchError)


export const getTransactions = ({ type, payload:filter }) =>
  __getTransactions(filter)
    .map(payload => ({ type, payload }))
    .catch(dispatchError)

export const addTransaction = ({ type, payload:transaction }) =>
  ajax({
    url: urls.transactions,
    method: 'POST',
    headers: jsonHeaders,
    body: denormalize(transaction)
  })
  .map(r => ({ type, payload: normalize(r.response) }))
  .catch(dispatchError)

export const delTransactions = ({ type, payload }) =>
  ajax({
    url: urls.delTransactions(payload), // payload: array of id
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify([])
  })
  .map(r => ({ type, payload, response: r.response }))
  .catch(dispatchError)

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const category = ({ type, payload, $op }) =>
  ajax ({
    url: urls.user,
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(urls[$op](payload))
  })
  .map(r => ({ type, payload: normalize(r.response) }))
  .catch(dispatchError)

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
