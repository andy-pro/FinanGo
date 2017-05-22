import {
  unshiftItem,
  pushItem,
  updateItemById,
  deleteItemById,
  deleteItemsByIds
} from '../__lib/utils';
import { Query } from './utils'

const reducer = ( state = [], action ) => {

  switch (action.type) {

    case 'user/LOADED':
      return action.payload.transactions

    case 'transactions/CLEAR':
      return []

    case 'transactions/GOTTEN':
      return action.payload

    case 'transactions/ADDED':
    // console.log(JSON.stringify(action));
      return pushItem(state, action.payload)
      // return unshiftItem(state, action.payload) // if order=-1

    case 'transactions/DELETED':
      // console.log('transactions reducer - delete', JSON.stringify(action));
      let { query } = action.query
      if (query.date) {
        if (action.store) {
          // message from websocket broadcast
          let date = Query({ date: action.store.getState().app.date }).date
          if (date.$gte.toISOString() !== query.date.$gte || date.$lt.toISOString() !== query.date.$lt)
            return state
        }
        return [] // delete month
      }
      let { id } = query
      if (id && id.$in) return deleteItemsByIds(state, id.$in)

    case 'notify/transactions/REPLACED':
      // console.log('response', JSON.stringify(action.payload));
      // console.log('response', JSON.stringify(action));

    default:
      return state;

  }
};

export default reducer;
