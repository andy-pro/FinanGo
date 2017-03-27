import { Observable } from 'rxjs'

import { apiCategories } from '../__api'
import config from '../config'
import { dispatchError } from '../app/actions'

const { locally } = config

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const changeCategoryView = () => ({
  type: 'CHANGE_CATEGORY_VIEW',
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const cmdCategoryLocal = payload =>
  Observable.of(payload)

export const categoryAction = (payload, cmd, opts) => ({
  type: 'epic/categories/UPDATE',
  payload,
  cmd, // add, update, del, replace
  opts,
})

const cmdEpic = action$ =>
  action$.ofType('epic/categories/UPDATE')
    .mergeMap(({ payload, cmd, opts={} }) => {
      const api = locally ? cmdCategoryLocal : apiCategories
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

const exportEpic = (action$, { getState }) =>
  action$.ofType('epic/categories/GET')
    .mergeMap(({ opts }) => {
      const api = locally ?
        cmdCategoryLocal(getState().categories)
        :
        apiCategories(null, 'get')
      return api.map(payload => ({
        type: 'db/EXPORT',
        payload,
        opts,
      }))
      .catch(dispatchError)
    })

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [
  cmdEpic,
  // updateEpic,
  exportEpic,
];
