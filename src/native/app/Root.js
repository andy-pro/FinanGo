// @flow
import App from './App';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';

// Must be the ES6 class to ensure hot reload works for stateless components.
/* eslint-disable react/prefer-stateless-function */
class Root extends React.Component {

  render() {
    return (
      <Redux store={this.props.store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Redux>
    );
  }

}

export default Root;
