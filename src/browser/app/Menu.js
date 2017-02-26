// @flow
import React from 'react';
import { connect } from 'react-redux';

import type { State, User } from '../../common/types';

import { getTransactions } from '../../common/transactions/actions';
import { Link } from '../app/components';
import { View, Text } from '../../common/__components'
import messages from '../messages'
import menuTitles from '../../common/app/menuTitles'

import { mainStyles } from '../../common/__themes'

const HeaderLink = ({ exactly, to, message, action }) => {
  message = message || messages[menuTitles[to]]
  if (action) to = action
  return (
    <Link
      display='block'
      bold
      color="white"
      exactly={exactly}
      paddingHorizontal={0.7}
      paddingVertical={0.3}
      to={to}
    >
      {message}
    </Link>
  );
}

const Header = ({ user, date, getTransactions }) => {
  return (
    <View style={mainStyles.menu}>
      <HeaderLink exactly to="/" />
      <HeaderLink to="/single" />
      <HeaderLink to="/group" />
      <HeaderLink to="/income" />
      <HeaderLink to='/refresh' action={() => getTransactions(date)} />
      <HeaderLink to="/categories" />
      <HeaderLink to="/settings" />
      <View style={mainStyles.menuFooter}>
        {user &&
          <HeaderLink to="/me" message={user.displayName} />
        }
      </View>
    </View>
  );
}

export default connect(
  (state) => ({
    // currentLocale: state.intl.currentLocale,
    date: state.app.date,
    user: state.user,
    // themeName: state.app.currentTheme,
    // theme: themes[state.app.currentTheme] || themes.defaultTheme,
  }),
  { getTransactions }
)(Header);
