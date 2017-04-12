// @flow
import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native'
import { Match } from 'react-router';
import { connect } from 'react-redux';

import { appShowMenu } from '../../app/actions'

const styles = StyleSheet.create({
  text: {
    color: '#ccc',
    fontSize: 18,
    padding: 8,
  },
  link: {
    // color: '#ccc',
    // fontSize: 18,
    // padding: 8,
  },
  linkActive: {
    // color: '#fff',
    backgroundColor: '#444',
  },
});

let MenuLink = ({ exactly, to, action, appShowMenu, message, ...props }, { router }) =>
  <Match exactly={exactly} pattern={to}>
    {({ matched }) => (
      <TouchableHighlight
        onPress={() => {
          if (action) action()
          else router.transitionTo(to);
          setTimeout(() => appShowMenu(false), 0)
        }}
        underlayColor='#333'
        style={[styles.link, matched && styles.linkActive]}
      >
        <Text style={styles.text}>
          {message}
        </Text>
      </TouchableHighlight>
    )}
  </Match>

MenuLink.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(
  null,
  { appShowMenu },
)(MenuLink);
