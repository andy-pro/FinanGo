import { Observable } from 'rxjs'

import mockData from '../__mockData'
import users from '../__mockData/users'
import config from '../config'


export const getUserData = ({ type }) => {
  let { userId } = config,
      user = users[userId];
  mockData.user = user
  return Observable.of({ type, payload: mockData })
}

export const getTransactions = ({ type }) => Observable.of({ type, payload: mockData.transactions })

export const addTransactions = action => Observable.of(action)

export const delTransactions = action => Observable.of(action)
