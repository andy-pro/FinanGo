// @flow
import type { State } from '../../common/types';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import theme from './themes/initial';
import { FormattedMessage, Link } from './components';
import { ScrollView, StyleSheet } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { connect } from 'react-redux';

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
  <FormattedMessage {...message}>
    {message =>
      <Link
        {...props}
        activeStyle={styles.tabLinkActive}
        onPress={() => setTimeout(() => appShowMenu(false), 0)}
        style={styles.tabLink}
      >{message}</Link>
    }
  </FormattedMessage>
);

MenuLink.propTypes = {
  appShowMenu: React.PropTypes.func.isRequired,
  message: React.PropTypes.object.isRequired,
};

MenuLink = connect(
  null,
  { appShowMenu },
)(MenuLink);

const Menu = ({ user }) => (
  <ScrollView
    automaticallyAdjustContentInsets={false}
    contentContainerStyle={styles.contentContainer}
  >
    <MenuLink exactly to="/" message={linksMessages.home} />
    <MenuLink to="/single" message={linksMessages.single} />
    <MenuLink to="/group" message={linksMessages.group} />
    <MenuLink to="/income" message={linksMessages.income} />
    <MenuLink to="/este" message={linksMessages.este} />
    <MenuLink to="/todos" message={linksMessages.todos} />
    <MenuLink to="/intl" message={linksMessages.intl} />
    <MenuLink to="/offline" message={linksMessages.offline} />
    <MenuLink to="/broken" message={linksMessages.broken} />
    <MenuLink to="/notfound" message={linksMessages.notfound} />
    {user ?
      <MenuLink to="/me" message={linksMessages.me} />
    :
      <MenuLink to="/signin" message={linksMessages.signIn} />
    }
  </ScrollView>
);

Menu.propTypes = {
  user: React.PropTypes.object,
};

export default connect(
  (state: State) => ({
    user: state.user,
  }),
)(Menu);
