// @flow
import React from 'react';
import { BrowserRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';
import { Provider as Fela } from 'react-fela';
import configureFela from '../../common/__config/fela';
import App from './App';

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
const Root = ({ store }) => (
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
