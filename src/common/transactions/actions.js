import * as __api from '../__api'
import { Query } from './utils'
import { dispatchError } from '../app/actions'

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
  type: 'transactions/CLEAR'
})
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const addTransactions = (transactions, opts) => ({
  type: 'epic/transactions/UPDATE',
  payload: transactions,
  api: __api.addTransactions,
  nextType: 'transactions/' + (transactions instanceof Array ? 'ARRAY/' : '') + 'ADDED',
  opts,
})

export const delTransactions = query => ({
  type: 'epic/transactions/UPDATE',
  payload: Query(query),
  api: __api.delTransactions,
  nextType: 'transactions/DELETED',
})

const updateTransactionEpic = action$ =>
  action$.ofType('epic/transactions/UPDATE')
    .mergeMap(({ api, nextType, payload, opts={} }) =>
      api(payload)
      .map(response => ({
        type: (opts.notify ? 'notify/' : '') + nextType,
        response,
        payload,
        opts,
      }))
      .catch(dispatchError)
    )
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


export const getTransactions = (query, opts) => ({
  type: 'epic/transactions/GET',
  query: Query(query),
  opts, // exportName, source: transactions or categories
})

const getTransactionsEpic = action$ =>
  action$.ofType('epic/transactions/GET')
    .switchMap(({ query, opts={} }) =>
      __api.getTransactions(query)
      .map(payload => ({
        type: opts.exportName ? 'db/EXPORT' : 'transactions/GOTTEN',
        payload,
        opts
      }))
      .catch(dispatchError)
    )


// const monthChangedEpic = action$ =>
//   action$.ofType('MONTH_CHANGED')
//     .map(({ payload }) => getTransactions(payload))

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [
  updateTransactionEpic,
  getTransactionsEpic,
  // monthChangedEpic,
];
