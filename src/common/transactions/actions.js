import { apiTransactions } from '../__api'
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
  query: { data: transactions, cmd: '$add' },
  nextType: 'transactions/' + (transactions instanceof Array ? 'ARRAY/' : '') + 'ADDED',
  opts,
})

export const delTransactions = query => ({
  type: 'epic/transactions/UPDATE',
  query: { query: Query(query), cmd: '$del' },
  nextType: 'transactions/DELETED',
})

export const replaceTransactions = (transactions, opts, query) => ({
  type: 'epic/transactions/UPDATE',
  query: {
    query: Query(query),
    cmd: transactions.length ? '$replace' : '$del',
    data: transactions
  },
  nextType: 'transactions/REPLACED',
  opts,
})

const updateTransactionsEpic = (action$, store) =>
  action$.ofType('epic/transactions/UPDATE')
    .mergeMap(({ query, nextType, opts={} }) =>
      apiTransactions(query, store)
      .map(payload => ({
        type: (opts.notify ? 'notify/' : '') + nextType,
        payload,
        query,
        opts,
      }))
      .catch(dispatchError)
    )
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/*
query:

  undefined - данные за текущий месяц;
  { date: {year} } - за год;
  { date: {year, month} } - за указанный месяц;
  { date: {$gte: {year, month}, $lt: {year, month}} } - за указанный период;
  { date: {$all: true} } - база данных целиком;

  { id: {$in: [id1, id2, ..., idN]} } - записи с этими id
*/

export const getTransactions = (query, opts) => ({
  type: 'epic/transactions/GET',
  query: Query(query),
  opts, // exportName, source: transactions or categories
})

const getTransactionsEpic = (action$, store) =>
  action$.ofType('epic/transactions/GET')
    .switchMap(({ query, opts={} }) =>
      apiTransactions({ query, cmd: '$get' }, store)
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
  updateTransactionsEpic,
  getTransactionsEpic,
  // monthChangedEpic,
];
