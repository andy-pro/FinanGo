// @flow
// import type { Action } from '../types';
// import { assocPath, dissocPath, filter } from 'ramda';
import {
  unshiftItem,
  pushItem,
  updateItemById,
  deleteItemById
} from '../__lib/utils';

const reducer = ( state = [], action ) => {

  switch (action.type) {

    case 'USER_LOADED':
      return action.payload.transactions

    case 'CLEAR_TRANSACTIONS':
      return []

    case 'GET_TRANSACTIONS':
      return action.payload

    case 'TRANSACTION_ADDED':
      // return pushItem(state, action.payload)
      return unshiftItem(state, action.payload)


    case 'DEL_TRANSACTION':
      return updateItemById(state, action.id, {didDel: true});

    case 'TRANSACTION_DELETED':
      return deleteItemById(state, action.id)

    case 'WILL_DEL_TRANSACTION':
      return updateItemById(state, action.id, {willDel: true});

    case 'UNDO_DEL_TRANSACTION':
      return updateItemById(state, action.id, {willDel: false});

    default:
      return state;

  }
};

export default reducer;
