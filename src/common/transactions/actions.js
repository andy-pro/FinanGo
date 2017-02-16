import { Observable } from 'rxjs'
import * as api from '../__api'
import initialState from '../initialState'
import mockData from '../configureMockData'

const { storage, locally } = initialState.config

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const clearTransactions = () => ({
  type: 'CLEAR_TRANSACTIONS'
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const getTransactions = (date) => {
  switch (storage) {
    case 'localfake':
      return {
        type: 'GET_TRANSACTIONS',
        payload: mockData.transactions
      }
    default:
      return {
        type: 'GET_TRANSACTIONS_EPIC',
        payload: date
      }
  }
}

export { getTransactions }

const getTransactionsEpic = action$ =>
  action$.ofType('GET_TRANSACTIONS_EPIC')
    .switchMap(action =>
      api.getTransactions(action.payload)
        .map(payload => ({
          type: 'GET_TRANSACTIONS',
          payload
        }))
    )

const monthChangedEpic = action$ =>
  action$.ofType('MONTH_CHANGED')
    .map(action => getTransactions(action.payload))

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
  monthChangedEpic,
  addTransactionEpic,
  preDelTransactionEpic,
  delTransactionEpic,
];
