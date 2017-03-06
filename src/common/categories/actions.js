import * as __api from '../__api'
import config from '../config'

const { locally } = config

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const changeCategoryView = () => ({
  type: 'CHANGE_CATEGORY_VIEW',
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const addCategory = payload => ({
  type: locally ? 'ADD_CATEGORY_LOCAL' : 'epic/UPDATE_CATEGORY',
  payload,
  $op: 'addCategory',
})

export const updateCategory = payload => ({
  type: locally ? 'UPDATE_CATEGORY_LOCAL' : 'epic/UPDATE_CATEGORY',
  payload,
  $op: 'updateCategory',
})

export const delCategory = payload => ({
  type: locally ? 'DEL_CATEGORY_LOCAL' : 'epic/UPDATE_CATEGORY',
  payload,
  $op: 'delCategory',
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const categoryEpic = action$ =>
  action$.ofType('epic/UPDATE_CATEGORY')
    .mergeMap(({ payload, $op }) => __api.category({
      type: 'CATEGORY_UPDATED',
      payload,
      $op,
    }))

export const epics = [
  categoryEpic,
];
