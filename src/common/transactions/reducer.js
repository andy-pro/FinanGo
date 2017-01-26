// @flow
import type { Action } from '../types';
// import { assocPath, dissocPath, filter } from 'ramda';

import _mockData from './../_mockData.js'

const initialState = []

const reducer = (
  state = initialState,
  action: Action,
) => {

  // console.log('print reducer', action, state);
  switch (action.type) {

    case 'GET_TRANSACTIONS': {
      return _mockData[1]
      break
      // return action.payload.todos
      //   .reduce((state, todo) =>
      //     assocPath(['all', todo.id], todo, state)
      //   , state);
    }

    default:
      return state;

  }
};

export default reducer;
