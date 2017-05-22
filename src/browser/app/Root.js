// @flow
import React from 'react';
import { BrowserRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';
import localforage from 'localforage';
import { Provider as Fela } from 'react-fela';

import configureFela from '../../common/__config/fela';
import configureStore from '../../common/__config/store';
import * as backup from '../backup'
import messages from '../messages'
import config from '../../common/config'

import App from './App';

var start_time = performance.now()
process.__elapsed = (msg) => {
  console.info(msg, performance.now() - start_time)
  start_time = performance.now()
}

const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
initialState.app.messages = messages

// server
// initialState.config = config

// serverless
// initialState.config.userId = "5856ffa4da7d1f056c935686", // andy pro
// initialState.config.userId = "58a33d33793e920948fb163c", // faddey
// initialState.config.userId =  "58580962da7d1f056c935688", // fedya zadov
// config.userId = initialState.config.userId
// initialState.config = config


const store = configureStore({
  initialState,
  platformDeps: {
    config,
    storageEngine: localforage,
    backup,
    messages,
  },
});

if (config.storage === 'mongodb') {
  require('../../common/__api/mongodb')
    .init({
      // http - ws; https - wss
      url: location.origin.replace(/^http/, 'ws'),
      // dispatch: store.dispatch
      store,
    })
}

// This should be part of Fela.
// TODO: https://github.com/rofrischmann/fela/issues/125
const getFelaMountNode = () => {
  const node = document.getElementById('stylesheet');
  const parent = node.parentNode;
  if (!node || !parent) {
    throw new Error('missing stylesheet node for Fela');
  }
  const nextNode = document.createElement('style');
  nextNode.id = 'stylesheet';
  parent.replaceChild(nextNode, node);
  return nextNode;
};

// We needs such Root for vanilla hot reloading.
const Root = () => (
  <Redux store={store}>
    <Fela mountNode={getFelaMountNode()} renderer={configureFela()}>
      {/*<BrowserRouter basename="/finan-go">*/}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Fela>
  </Redux>
);

export default Root;
