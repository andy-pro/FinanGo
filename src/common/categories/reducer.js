import {
  addCategoryToPath,
  updateCategoryByPath,
  delCategoryByPath,
} from '../__lib/utils';

const reducer = ( state = [], action ) => {

  switch (action.type) {

    // case 'user/LOADED':
      // return action.payload.categories

    case 'categories/UPDATED':
    case 'notify/categories/UPDATED':
      if (action.locally) {
        let { payload } = action
        switch (action.cmd) {
          case 'add':
            return addCategoryToPath(state, payload)
          case 'update':
            return updateCategoryByPath(state, payload)
          case 'del':
            return delCategoryByPath(state, payload)
          case 'replace':
            return payload
        }
      } else return action.response

    default:
      return state;

  }
};

export default reducer;
