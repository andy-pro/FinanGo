import { Observable } from 'rxjs'
import * as api from '../api'
import initialState from '../initialState'
import mockData from '../_mockData'

const { storage, locally } = initialState.config

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const getUserData = action => {
  switch (storage) {
    case 'localfake':
      return Observable.of({
        type: 'USER_LOADED',
        payload: mockData
      })
    default:
      return api.getUserData.map(result => {
        const { categories, ...user } = result[0]
        return {
          type: 'USER_LOADED',
          payload: {
            user,
            categories,
            transactions: result[1]
          }
        }
      })
  }
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const getTransactions = () => {
  switch (storage) {
    case 'localfake':
      return {
        type: 'GET_TRANSACTIONS',
        payload: mockData.transactions
      }
    default:
      return {
        type: 'GET_TRANSACTIONS_EPIC'
      }
  }
}

const getTransactionsEpic = action$ =>
  action$.ofType('GET_TRANSACTIONS_EPIC')
    .switchMap(action =>
      api.getTransactions()
        .map(payload => ({
          type: 'GET_TRANSACTIONS',
          payload
        }))
    )

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const addTransaction = payload => ({
  type: locally ? 'TRANSACTION_ADDED' : 'ADD_TRANSACTION_EPIC',
  payload
})

const addTransactionEpic = action$ =>
  action$.ofType('ADD_TRANSACTION_EPIC')
    .mergeMap(action =>
      api.addTransaction(action.payload)
        .map(payload => ({
          type: 'TRANSACTION_ADDED',
          payload
        }))
    )

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const delTransaction = id => ({
  type: 'WILL_DEL_TRANSACTION',
  id
})

export const undoDelTransaction = id => ({
  type: 'UNDO_DEL_TRANSACTION',
  id
})

const preDelTransactionEpic = action$ => action$.ofType('WILL_DEL_TRANSACTION')
  .mergeMap(action =>
    Observable.of({
      type: locally ? 'TRANSACTION_DELETED' : 'DEL_TRANSACTION',
      id: action.id
    })
    .delay(3000)
    .takeUntil(action$.ofType('UNDO_DEL_TRANSACTION').filter(({id}) => id === action.id))
  )

const delTransactionEpic = action$ =>
  action$.ofType('DEL_TRANSACTION')
    .mergeMap(action =>
      api.delTransaction(action.id)
      .map(id => ({
        type: 'TRANSACTION_DELETED',
        id
      }))
    )

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [
  getTransactionsEpic,
  addTransactionEpic,
  preDelTransactionEpic,
  delTransactionEpic,
];
