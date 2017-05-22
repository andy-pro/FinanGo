import {
  // addCategoryToPath,
  // updateCategoryByPath,
  // delCategoryByPath,
  cmdCategoryLocal,
} from '../__lib/utils';

export default function user(state=null, action) {

  switch (action.type) {

    case 'user/LOADED':
    // action.payload.user.categories = {title: 'Categories', sub: action.payload.user.categories}
      return action.payload.user

    case 'categories/UPDATED':
    case 'notify/categories/UPDATED':
      if (action.locally) {
        return cmdCategoryLocal(state, action)
        // let { payload } = action
        // switch (action.cmd) {
        //   case 'add':
        //     return addCategoryToPath(state, payload)
        //   case 'update':
        //     return updateCategoryByPath(state, payload)
        //   case 'del':
        //     return delCategoryByPath(state, payload)
        //   case 'replace':
        //     return payload
        // }
      } else return action.response

    default:
      return state;
  }

}
