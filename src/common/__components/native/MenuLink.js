// @flow
import React from 'react';
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux';

import { appShowMenu } from '../../app/actions'
import Link from './Link';

const styles = StyleSheet.create({
  link: {
    color: '#ccc',
    fontSize: 18,
    padding: 8,
  },
  linkActive: {
    color: '#fff',
    backgroundColor: '#393939',
  },
});

let MenuLink = ({ appShowMenu, message, ...props }) => (
  <Link
    {...props}
    style={styles}
    onPress={() => setTimeout(() => appShowMenu(false), 0)}
  >
    {message}
  </Link>
)

export default connect(
  null,
  { appShowMenu },
)(MenuLink);
