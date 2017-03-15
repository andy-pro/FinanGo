import * as __api from '../__api'
import config from '../config'
import { dispatchError } from '../app/actions'

const { locally } = config

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const changeCategoryView = () => ({
  type: 'CHANGE_CATEGORY_VIEW',
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const cmdCategoryLocal = ({ payload, cmd }) => {
  return payload
}

export const categoryAction = (payload, cmd, opts) => ({
  type: 'epic/categories/UPDATE',
  payload,
  cmd, // add, update, del, replace
  opts,
})

const cmdEpic = action$ =>
  action$.ofType('epic/categories/UPDATE')
    .mergeMap(({ payload, cmd, opts={} }) => {
      const api = locally ? cmdCategoryLocal : __api.cmdCategory
      return api(payload, cmd)
        .map(response => ({
          type: (opts.notify ? 'notify/' : '') + 'categories/UPDATED',
          payload,
          opts,
          response,
          cmd,
          locally,
        }))
        .catch(dispatchError)
    })


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const getCategories = opts => ({
  type: 'epic/categories/GET',
  opts, // exportName, source: transactions or categories
})

const exportEpic = action$ =>
  action$.ofType('epic/categories/GET')
    .mergeMap(({ opts }) =>
      __api.getCategories()
      .map(payload => ({
        type: 'db/EXPORT',
        payload,
        opts,
      }))
      .catch(dispatchError)
    )
// export const addCategory = payload => ({
//   type: locally ? 'ADD_CATEGORY_LOCAL' : 'epic/UPDATE_CATEGORY',
//   payload,
//   $op: 'addCategory',
// })
//
// export const updateCategory = payload => ({
//   type: locally ? 'UPDATE_CATEGORY_LOCAL' : 'epic/UPDATE_CATEGORY',
//   payload,
//   $op: 'updateCategory',
// })
//
// export const delCategory = payload => ({
//   type: locally ? 'DEL_CATEGORY_LOCAL' : 'epic/UPDATE_CATEGORY',
//   payload,
//   $op: 'delCategory',
// })
//
// export const replaceCategories = (payload, opts) => ({
//   type: locally ? 'REPLACE_CATEGORIES_LOCAL' : 'epic/UPDATE_CATEGORY',
//   payload,
//   $op: 'replaceCategory',
//   opts,
// })

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// const updateEpic = action$ =>
//   action$.ofType('epic/UPDATE_CATEGORY')
//     .mergeMap(({ payload, $op, opts }) =>
//       __api.category({
//         // type: 'CATEGORY_UPDATED',
//         payload,
//         $op,
//       })
//       .map(payload => ({
//         type: 'CATEGORY_UPDATED',
//         payload
//       }))
//     )


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



export const epics = [
  cmdEpic,
  // updateEpic,
  exportEpic,
];
