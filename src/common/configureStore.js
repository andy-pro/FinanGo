// @flow
import configureMiddleware from './configureMiddleware';
import configureStorage from './configureStorage';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import app from './app/reducer';
// import auth from './auth/reducer';
import config from './config/reducer';
import device from './device/reducer';
import intl from './intl/reducer';
import todos from './todos/reducer';
// import users from './users/reducer';
import user from './user/reducer';
import { fieldsReducer as fields } from './lib/redux-fields';
import categories from './categories/reducer';
import transactions from './transactions/reducer';

const configureStore = (options) => {
  const {
    initialState,
    platformDeps = {},
    platformMiddleware = [],
  } = options;

  const reducer = combineReducers({
    app,
    // auth,
    config,
    device,
    fields,
    intl,
    todos,
    user,
    // users,
    categories,
    transactions,
  })

  const middleware = configureMiddleware(
    initialState,
    platformDeps,
    platformMiddleware,
  );

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      autoRehydrate(),
    ),
  );

  if (platformDeps.storageEngine) {
    const config = configureStorage(
      initialState.config.appName,
      platformDeps.storageEngine,
    );
    persistStore(store, config);
  }

/*  // Enable hot reloading for reducers.
  if (module.hot && typeof module.hot.accept === 'function') {
    if (initialState.device.isReactNative) {
      // React Native for some reason needs accept without the explicit path.
      // facebook.github.io/react-native/blog/2016/03/24/introducing-hot-reloading.html
      module.hot.accept(() => {
        // const configureReducer = require('./configureReducer').default;

        store.replaceReducer(configureReducer(initialState));
      });
    } else {
      // Webpack for some reason needs accept with the explicit path.
      module.hot.accept('./configureReducer', () => {
        const configureReducer = require('./configureReducer').default;

        store.replaceReducer(configureReducer(initialState));
      });
    }
  }
*/

  return store;
};

export default configureStore;
