// @flow
import React, {Component} from 'react';

import messages from '../messages'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>{messages['links.home']}</h1>
        <h2>{messages['transactions.transaction']}</h2>
        <h3>Good to see you, {messages['placeholders.category']}</h3>
      </div>
    );
  }
}
