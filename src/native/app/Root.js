// @flow
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';
import { AsyncStorage, Platform } from 'react-native';
// import uuid from 'react-native-uuid';

import configureStore from '../../common/__config/store';
import * as backup from '../backup'
import messages from '../messages'
import __config from '../../common/config'
import initialState from '../../common/initialState';
import { getCurrentDate } from '../../common/__lib/dateUtils'

import App from './App'

initialState.app.messages = messages
initialState.app.date = getCurrentDate()
// initialState.config = config
__config.isNative = true
__config.platform = Platform.OS

const getDefaultDeviceLocale = () => {
  const { defaultLocale, locales } = initialState.app;
  // const deviceLocale = ReactNativeI18n.locale.split('-')[0];
  const deviceLocale = 'en'
  // console.log('dev loc', deviceLocale); // 'en'
  const isSupported = locales.indexOf(deviceLocale) !== -1;
  return isSupported ? deviceLocale : defaultLocale;
};

const createNativeInitialState = () => ({
  ...initialState,
  app: {
    ...initialState.app,
    currentLocale: getDefaultDeviceLocale(),
  }
});

const store = configureStore({
  initialState: createNativeInitialState(),
  platformDeps: {
    config: __config,
    storageEngine: AsyncStorage,
    backup,
    messages,
  },
});

// Must be the ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {

  render() {
    return (
      <Redux store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Redux>
    );
  }

}

export default Root;
