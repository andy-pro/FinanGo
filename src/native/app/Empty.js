/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
// import { FormattedMessage } from './components';
// import { intlMessage as FormattedMessage } from './components';
// import messages from '../../common/transactions/messages';

// <FormattedMessage {...messages.transaction} />

import strings from '../../common/app/strings'

export default class Empty extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {strings.how}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
