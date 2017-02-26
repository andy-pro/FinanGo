import { Observable } from 'rxjs'

import users from '../__data/users'
import config from '../config'

import mockData from '../__config/mockData'

export const getUserData = ({ payload }) => {
  let { userId } = config,
      user = users[userId];
  mockData.user = user
  return Observable.of(mockData)
}

export const addTransaction = payload =>
  Observable.of(type => ({ type, payload }))
