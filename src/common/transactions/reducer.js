import {
  unshiftItem,
  pushItem,
  updateItemById,
  deleteItemById,
  deleteItemsByIds
} from '../__lib/utils';

const reducer = ( state = [], action ) => {

  switch (action.type) {

    case 'user/LOADED':
      return action.payload.transactions

    case 'transactions/CLEAR':
      return []

    case 'transactions/GOTTEN':
      return action.payload

    case 'transactions/ADDED':
      return pushItem(state, action.response)
      // return unshiftItem(state, action.payload) // if order=-1

    case 'transactions/DELETED':
      if (action.payload.date) return [] // delete month
      let { id } = action.payload
      if (id && id.$in) return deleteItemsByIds(state, id.$in)

    default:
      return state;

  }
};

export default reducer;
