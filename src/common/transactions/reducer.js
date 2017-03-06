import {
  unshiftItem,
  pushItem,
  updateItemById,
  deleteItemById,
  deleteItemsByIds
} from '../__lib/utils';

const reducer = ( state = [], action ) => {

  switch (action.type) {

    case 'USER_LOADED':
      return action.payload.transactions

    case 'CLEAR_TRANSACTIONS':
      return []

    case 'TRANSACTIONS_GOTTEN':
      return action.payload

    case 'TRANSACTION_ADDED':
      return pushItem(state, action.payload)
      // return unshiftItem(state, action.payload) // if order=-1

    case 'TRANSACTIONS_DELETED':
      return deleteItemsByIds(state, action.payload)

    default:
      return state;

  }
};

export default reducer;
