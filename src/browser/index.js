// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './app/Root';

const appElement = document.getElementById('app');

ReactDOM.render(<Root />, appElement);

// Hot reload render.
// gist.github.com/gaearon/06bd9e2223556cb0d841#file-native-js
if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./app/Root', () => {
    const NextRoot = require('./app/Root').default;
    ReactDOM.render(<NextRoot />, appElement);
  });
}
