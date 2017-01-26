// @flow
import type { Action, UsersState } from '../types';
import createUserFirebase from './createUserFirebase';
import { compose, last, map, prop, sortBy, values } from 'ramda';

import mockData from './../_mockData'

const initialState = {
  // Undefined is absence of evidence, null is evidence of absence.
  online: undefined,
  viewer: undefined,
};

const reducer = (
  state: UsersState = initialState,
  action: Action,
): UsersState => {
  switch (action.type) {

    case 'ON_AUTH': {
      // const user = createUserFirebase(action.payload.firebaseUser);
      // console.log('print from reduser ON_AUTH', action);
      return { ...state, viewer: mockData[0] };
    }

    case 'ON_USERS_PRESENCE': {
      const { presence } = action.payload;
      if (!presence) {
        return { ...state, online: null };
      }
      const sortBylastSeenAt = sortBy(prop('lastSeenAt'));
      const online = compose(
        map(item => item.user),
        sortBy(sortBylastSeenAt),
        values,
        map(compose(last, sortBylastSeenAt, values)),
      )(presence);
      return { ...state, online };
    }

    default:
      return state;

  }
};

export default reducer;
