// @flow
// import type { State } from '../../common/types';
import React from 'react';

import theme from './themes/initial';

import { getTransactions } from '../../common/transactions/actions';
import { Link } from './components';
import { ScrollView, StyleSheet } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { connect } from 'react-redux';

import messages from '../messages'

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: theme.fontSizeH5 * 0.5,
    paddingVertical: theme.fontSizeH5,
  },
  tabLink: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSize,
    padding: theme.fontSize * 0.625,
  },
  tabLinkActive: {
    color: theme.bright(theme.inverseTextColor),
    backgroundColor: theme.bright(theme.inverseBackgroundColor),
  },
});

let MenuLink = ({ appShowMenu, message, ...props }) => (
  <Link
    {...props}
    activeStyle={styles.tabLinkActive}
    onPress={() => setTimeout(() => appShowMenu(false), 0)}
    style={styles.tabLink}
  >
    {message}
  </Link>
);

MenuLink = connect(
  null,
  { appShowMenu },
)(MenuLink);

const Menu = ({ user, date, getTransactions }) => (
  <ScrollView
    automaticallyAdjustContentInsets={false}
    contentContainerStyle={styles.contentContainer}
  >
    <MenuLink exactly to="/" message={messages['links.home']} />
    <MenuLink to="/single" message={messages['links.single']} />
    <MenuLink to="/group" message={messages['links.group']} />
    <MenuLink to="/income" message={messages['links.income']} />
    <MenuLink to="/refresh" message={messages['links.refresh']} action={() => getTransactions(date)} />
    <MenuLink to="/categories" message={messages['links.categories']} />
    <MenuLink to="/settings" message={messages['links.settings']} />
    <MenuLink to="/me" message={messages['links.me']} />
  </ScrollView>
);

export default connect(
  (state) => ({
    date: state.app.date,
    user: state.user,
  }),
  { getTransactions }
)(Menu);
