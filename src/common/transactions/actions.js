import * as __api from '../__api'

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const setBalance = balance => ({
  type: 'SET_BALANCE',
  payload: balance
})

export const setDelHandler = handler => ({
  type: 'SET_DEL_HANDLER',
  payload: handler
})
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const clearTransactions = () => ({
  type: 'CLEAR_TRANSACTIONS'
})
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const addTransaction = transaction => ({
  type: 'epic/UPDATE_TRANSACTIONS',
  api: __api.addTransaction,
  payload: {
    type: 'TRANSACTION_ADDED',
    payload: transaction
  }
})

export const delTransactions = ids => ({
  type: 'epic/UPDATE_TRANSACTIONS',
  api: __api.delTransactions,
  payload: {
    type: 'TRANSACTIONS_DELETED',
    payload: ids
  }
})

const updateTransactionEpic = action$ =>
  action$.ofType('epic/UPDATE_TRANSACTIONS')
    .mergeMap(({ api, payload }) => api(payload))
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const getTransactions = date => ({
  type: 'epic/GET_TRANSACTIONS',
  payload: date
})

export { getTransactions }

const getTransactionsEpic = action$ =>
  action$.ofType('epic/GET_TRANSACTIONS')
    .switchMap(({ payload }) => __api.getTransactions({
      type: 'TRANSACTIONS_GOTTEN',
      payload
    }))

const monthChangedEpic = action$ =>
  action$.ofType('MONTH_CHANGED')
    .map(({ payload }) => getTransactions(payload))

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [
  updateTransactionEpic,
  getTransactionsEpic,
  monthChangedEpic,
];
