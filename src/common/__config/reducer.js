import { combineReducers } from 'redux';

import app from '../app/reducer';
import device from '../device/reducer';
import user from '../user/reducer';
import categories from '../categories/reducer';
import transactions from '../transactions/reducer';

import configureLocalDB from './localdb';

import config from '../config'

// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (state, action) => {
  const userWasSignedOut = action.type === 'ON_AUTH' && state.user;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }
  // Purge sensitive data, preserve only app and safe initial state.
  return reducer({
    app: state.app,
    device: initialState.device,
  }, action);
};

const configureReducer = initialState => {

  let reducer = {
    app,
    device,
    config: (state={}) => state,
    user,
    categories,
    transactions,
  }

  if (config.storage === 'local') {
    reducer[configureLocalDB.filename] = configureLocalDB.reducer
  }

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  return resetStateOnSignOutReducer(
    combineReducers(reducer),
    initialState
  );

};

export default configureReducer;
