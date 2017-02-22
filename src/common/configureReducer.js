import { combineReducers } from 'redux';

import app from './app/reducer';
// import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import todos from './todos/reducer';
// import users from './users/reducer';
import user from './user/reducer';
// import { fieldsReducer as fields } from './lib/redux-fields';
import categories from './categories/reducer';
import transactions from './transactions/reducer';
import list from './list/reducer';


// stackoverflow.com/q/35622588/233902
const resetStateOnSignOutReducer = (reducer, initialState) => (state, action) => {
  const userWasSignedOut =
    action.type === 'ON_AUTH' &&
    state.users.viewer &&
    !action.payload.firebaseUser;
  if (!userWasSignedOut) {
    return reducer(state, action);
  }
  // Purge sensitive data, preserve only app and safe initial state.
  return reducer({
    app: state.app,
    config: initialState.config,
    device: initialState.device,
    intl: initialState.intl,
  }, action);
};

const configureReducer = (initialState: Object) => {

  let reducer = combineReducers({
    app,
    // auth,
    config,
    device,
    // fields,
    intl,
    todos,
    // users,
    user,
    categories,
    transactions,
    list
  });

  // The power of higher-order reducers, http://slides.com/omnidan/hor
  reducer = resetStateOnSignOutReducer(reducer, initialState);

  return reducer;
};

export default configureReducer;
