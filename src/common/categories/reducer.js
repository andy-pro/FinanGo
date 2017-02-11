import {
  // unshiftItem,
  // pushItem,
  // updateItemById,
  // deleteItemById,
  // getCategoryByPath
  addCategoryToPath,
  updateCategoryByPath,
  delCategoryByPath,
} from '../__lib/utils';

const reducer = ( state = [], action ) => {

  switch (action.type) {

    case 'USER_LOADED':
      return action.payload.categories

    case 'ADD_CATEGORY_LOCAL':
      return addCategoryToPath(state, action.payload)

    case 'UPDATE_CATEGORY_LOCAL':
      return updateCategoryByPath(state, action.payload)

    case 'DEL_CATEGORY_LOCAL':
      return delCategoryByPath(state, action.payload)

    default:
      return state;

  }
};

export default reducer;
