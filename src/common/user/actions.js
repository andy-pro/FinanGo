import { Observable } from 'rxjs'
import * as api from '../__api'
import initialState from '../initialState'
import mockData from '../configureMockData'

const { storage, locally } = initialState.config

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const getUserData = () => {
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
