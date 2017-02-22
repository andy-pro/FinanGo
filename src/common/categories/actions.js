import * as api from '../__api'
import initialState from '../initialState'

const { locally } = initialState.config

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const categoryEpic = action$ =>
  action$.filter(({ type }) => type.endsWith('_CATEGORY_EPIC'))
    .mergeMap(({ type, payload }) => {
      let dw
      switch (type) {
        case 'ADD_CATEGORY_EPIC':
          dw = api.addCategory; break;
        case 'UPDATE_CATEGORY_EPIC':
          dw = api.updateCategory; break;
        case 'DEL_CATEGORY_EPIC':
          dw = api.delCategory;
      }
      return dw(payload)
        .map(payload => ({
          type: 'CATEGORY_UPDATED',
          payload
        }))
      })

export const epics = [
  categoryEpic,
];
