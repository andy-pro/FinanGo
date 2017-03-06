// @flow
import React from 'react';
import { connect } from 'react-redux';

import type { State, User } from '../../common/types';

import { getTransactions } from '../../common/transactions/actions';
import { Link } from '../app/components';
import { View, Text } from '../../common/__components'
import messages from '../messages'

import { mainCSS } from '../../common/__themes'

const MenuLink = ({ exactly, to, message, action }) => {
  let linkTitle = 'links.' + (to.slice(1) || 'home')
  message = message || messages[linkTitle]
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

const Menu = ({ user, date, getTransactions, delHandler }, { history }) => {

  const refresh = () => {
    let p = history.location.pathname
    if (p === '/' || p === '/single' || p ==='/delete') {
      getTransactions(date)
    }
  }

  return (
    <View style={mainCSS.menu}>
      <MenuLink exactly to="/" />
      <MenuLink to="/single" />
      <MenuLink to="/group" />
      <MenuLink to="/income" />
      <MenuLink to='/refresh' action={refresh} />
      <MenuLink to="/delete" action={delHandler} />
      <MenuLink to="/categories" />
      <MenuLink to="/settings" />
      <View style={mainCSS.menuFooter}>
        {user &&
          <MenuLink to="/me" message={user.displayName} />
        }
      </View>
    </View>
  );
}

Menu.contextTypes = {
  history: React.PropTypes.object,
};

export default connect(
  ({ app , user }) => ({
    // currentLocale: state.intl.currentLocale,
    date: app.date,
    delHandler: app.delHandler,
    user,
    // themeName: state.app.currentTheme,
    // theme: themes[state.app.currentTheme] || themes.defaultTheme,
  }),
  { getTransactions }
)(Menu);
