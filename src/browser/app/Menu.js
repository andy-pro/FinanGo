// @flow
import type { State, User } from '../../common/types';
import React from 'react';

import { getTransactions } from '../../common/transactions/actions';

import linksMessages from '../../common/app/linksMessages';

import { Box, Link } from '../app/components';
import { FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import { connect } from 'react-redux';

const HeaderLink = ({ exactly, to, message }) => (
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
    <FormattedMessage {...message} />
  </Link>
);

const Header = ({ user, width, getTransactions }) => {

  const refresh = () =>
    getTransactions(user.id)

  return (
    <Box
      backgroundColor="primary"
      width={width}
      position='fixed'
      top={0}
      left={0}
      marginVertical={0.5}
      paddingHorizontal={0.5}
    >
      <HeaderLink exactly to="/" message={linksMessages.home} />
      <HeaderLink to="/single" message={linksMessages.single} />
      <HeaderLink to="/group" message={linksMessages.group} />
      <HeaderLink to="/income" message={linksMessages.income} />
      <HeaderLink to={refresh} message={linksMessages.refresh} />
      <HeaderLink to="/este" message={linksMessages.este} />
      <HeaderLink to="/todos" message={linksMessages.todos} />
      <HeaderLink to="/fields" message={linksMessages.fields} />
      <HeaderLink to="/intl" message={linksMessages.intl} />
      <HeaderLink to="/offline" message={linksMessages.offline} />
      <HeaderLink to="/me" message={linksMessages.me} />
      {!user &&
        <HeaderLink to="/signin" message={linksMessages.signIn} />
      }
    </Box>
  );
}

export default compose(
  connect(
    ({ user }) => ({ user }),
    { getTransactions }
  ),
)(Header);
