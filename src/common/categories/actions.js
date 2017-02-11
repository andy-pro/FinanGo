import { Observable } from 'rxjs'
import * as api from '../__api'
import initialState from '../initialState'
// import mockData from '../_mockData'

const { storage, locally } = initialState.config

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// export const addCategory = (category) => ({
//   type: types.PROMISE,
//   payload: types.CATEGORY_ADDED,
//   promise: api.addCategory(category)
// })

export const addCategory = payload => ({
  type: locally ? 'ADD_CATEGORY_LOCAL' : 'ADD_CATEGORY_EPIC',
  payload
})

export const updateCategory = payload => ({
  type: locally ? 'UPDATE_CATEGORY_LOCAL' : 'UPDATE_CATEGORY_EPIC',
  payload
})

export const delCategory = payload => ({
  type: locally ? 'DEL_CATEGORY_LOCAL' : 'DEL_CATEGORY_EPIC',
  payload
})


//
// export const updateCategory = (category) => ({
//   type: types.PROMISE,
//   payload: types.CATEGORY_UPDATED,
//   promise: api.updateCategory(category)
// })

// export const delCategory = (category) => ({
//   type: types.PROMISE,
//   payload: types.CATEGORY_UPDATED,
//   promise: api.delCategory(category)
// })
