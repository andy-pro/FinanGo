// @flow
// import type { Action } from '../types';
// import { assocPath, dissocPath, filter } from 'ramda';
import {
  unshiftItem,
  pushItem,
  updateItemById,
  deleteItemById
} from '../lib/utils';

const reducer = ( state = [], action ) => {

  switch (action.type) {

    case 'GET_TRANSACTIONS':
      return action.payload

    case 'TRANSACTION_ADDED':
      // return pushItem(state, action.payload)
      return unshiftItem(state, action.payload)

    case 'TRANSACTION_DELETED':
      return deleteItemById(state, action.payload.id)

    case 'WILL_DEL_TRANSACTION_UNI':
      return updateItemById(state, action.id, {willDel: true});

    case 'UNDO_DEL_TRANSACTION_UNI':
      return updateItemById(state, action.id, {willDel: false});

    case 'DEL_TRANSACTION_UNI':
      return updateItemById(state, action.id, {didDel: true});

    default:
      return state;

  }
};

export default reducer;
