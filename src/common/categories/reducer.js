import {
  unshiftItem,
  pushItem,
  updateItemById,
  deleteItemById
} from '../lib/utils';

const reducer = ( state = [], action ) => {

  switch (action.type) {

    case 'USER_LOADED':
      return action.payload.categories

    default:
      return state;

  }
};

export default reducer;
