// @flow
import React from 'react';
import { connect } from 'react-redux';

import { getTransactions } from '../transactions/actions';
import { ScrollView, View, MenuLink as Link } from './';
import { mainCSS } from '../__themes'

const Menu = ({ messages, user, date, getTransactions, delHandler }, { history }) => {

  const MenuLink = ({ ...props }) => {
    if (!props.message) {
      let linkTitle = 'links.' + (props.to.slice(1) || 'home')
      props.message = messages[linkTitle]
      // props.message = linkTitle
    }
    return <Link {...props} />
  }

  const refresh = () => {
    let p = history.location.pathname
    if (p === '/' || p === '/single' || p ==='/delete') {
      getTransactions({ date })
    }
  }

  return (
    <ScrollView
      automaticallyAdjustContentInsets={false}
      style={mainCSS.menu}
    >
      <MenuLink exactly to="/" />
      <MenuLink to="/single" />
      <MenuLink to="/group" />
      <MenuLink to="/income" />
      <MenuLink to="/refresh" action={refresh} />
      <MenuLink to="/delete" action={delHandler} />
      <MenuLink to="/categories" />
      <MenuLink to="/backup" />
      <MenuLink to="/settings" />
      <View style={mainCSS.menuFooter}>
        {user &&
          <MenuLink to="/me" message={user.displayName} />
        }
      </View>
    </ScrollView>
  );

}

Menu.contextTypes = {
  history: React.PropTypes.object,
};

export default connect(
  ({ app , user }) => ({
    currentLocale: app.currentLocale,
    messages: app.messages,
    date: app.date,
    delHandler: app.delHandler,
    user,
  }),
  { getTransactions }
)(Menu);
