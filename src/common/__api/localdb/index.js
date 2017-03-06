import { Observable } from 'rxjs'

import constants from './constants'

const __transactionsQuery = ($op, action) =>
  Observable.of({
    type: constants.QUERY,
    query: { table: 'transactions', $op },
    payload: action
  })

export const getUserData = action => __transactionsQuery('init', action)

export const addTransaction = action => __transactionsQuery('add', action)

export const delTransactions = action => __transactionsQuery('del', action)

export const getTransactions = action => __transactionsQuery('get', action)
