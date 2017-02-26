// import { Observable } from 'rxjs'
import * as api from '../__api'

// import users from '../__data/users'
// import config from '../config'

// import mockData from '../__config/mockData'

export const getUserData = ({ payload }) => {

      return api.getUserData(payload).map(result => {

        // const { categories, ...user } = result[0]
        return {
          type: 'USER_LOADED',
          payload: result
        }
        // const { categories, ...user } = result[0]
        // return {
        //   type: 'USER_LOADED',
        //   payload: {
        //     user,
        //     categories,
        //     transactions: result[1]
        //   }
        // }

      })

}


//
// export const getUserData = ({ payload }) => {
//   let { userId, storage } = config,
//   user = users[userId];
//   console.log('q', payload);
//   switch (storage) {
//     case 'localfake':
//       mockData.user = user
//       return Observable.of({
//         type: 'USER_LOADED',
//         payload: mockData
//         // payload: {}
//       })
//     default:
//       return api.getUserData.map(result => {
//         const { categories, ...user } = result[0]
//         return {
//           type: 'USER_LOADED',
//           payload: {
//             user,
//             categories,
//             transactions: result[1]
//           }
//         }
//       })
//   }
// }


/*



export const getUserData = ({ payload }) => ({ config }) => {


  action rehydrated from localStorage: {
    type: "persist/REHYDRATE",
    payload: { app, categories, intl, localdb }
  }


  let { userId, storage } = config,
      user = users[userId];

  switch (storage) {
    case 'local':

    // TODO: move this code to 'transactions/actions', make query to DB by last month
      return {
        type: 'USER_LOADED',
        payload: {
          user,
          categories: payload.categories,
          transactions: payload.localdb.transactions
        }
      }
    // end TODO

    case 'localfake':
      mockData.user = user
      return {
        type: 'USER_LOADED',
        payload: mockData
      }
      // return Observable.of({
      //   type: 'USER_LOADED',
      //   payload: mockData
      //   // payload: {}
      // })
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


// // api module have global 'userId' variable from 'common/config.js'
//   action => ({config}) => {
//     console.log('ura map quququq', action, config);
//     return {
//     type: config.storage === 'local' ? 'LOCAL_APP_STARTED' : 'WEB_APP_STARTED',
//     userId: config.userId
//   }
//   }
//
// );

*/
