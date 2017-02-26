import { Observable } from 'rxjs'

import users from '../../__data/users'
import config from '../../config'
import constants from './constants'

export const getUserData = payload => {
  let { userId } = config,
      user = users[userId];
  return Observable.of({
    user,
    categories: payload.categories,
    transactions: payload.localdb.transactions
  })
}

export const addTransaction = transaction =>
  Observable.of(payload => {
    payload.payload = transaction
    return {
      type: constants.QUERY,
      query: { table: 'transactions', $op: 'add' },
      payload
    }
  })

  // Observable.of(action => {
  //   action.payload = transaction
  //   return action
  // })
