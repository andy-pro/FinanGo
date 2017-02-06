// @flow
import type { State, User } from '../../common/types';
import React from 'react';

import { getTransactions } from '../../common/transactions/actions';

// import linksMessages from '../../common/app/linksMessages';

import { Box, Link } from '../app/components';
// import { FormattedMessage } from 'react-intl';
// import { compose } from 'ramda';
import { connect } from 'react-redux';

import messages from '../messages'
import menuTitles from '../../common/app/menuTitles'

const HeaderLink = ({ exactly, to }) => {
  let message
  if (to instanceof Array) {
    message = to[0]
    to = to[1]
  } else message = to
  message = messages[menuTitles[message]]
  return (
    <Link
      display='block'
      backgroundColor="primary"
      bold
      color="white"
      exactly={exactly}
      paddingHorizontal={0.5}
      paddingVertical={0.5}
      to={to}
    >
      {message}
    </Link>
  );
}

const Header = ({ getTransactions }) => {

  return (
    <Box
      backgroundColor="primary"
      position='fixed'
      top={0}
      left={0}
      marginVertical={0.5}
      paddingHorizontal={0.5}
    >
      <HeaderLink exactly to="/" />
      <HeaderLink to="/single" />
      <HeaderLink to="/group" />
      <HeaderLink to="/income" />
      <HeaderLink to={['/refresh', getTransactions]} />
      <HeaderLink to="/este" />
      <HeaderLink to="/todos" />
      <HeaderLink to="/fields" />
      <HeaderLink to="/intl" />
      <HeaderLink to="/offline" />
      <HeaderLink to="/me" />
    </Box>
  );
}

export default connect(
  (state) => ({
    currentLocale: state.intl.currentLocale,
    // themeName: state.app.currentTheme,
    // theme: themes[state.app.currentTheme] || themes.defaultTheme,
  }),
  { getTransactions }
)(Header);
