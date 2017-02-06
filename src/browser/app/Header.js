// @flow
import React from 'react';
import { connect } from 'react-redux';

import {
  Box,
  PageHeader,
  Title,
} from './components';

const Header = ({ title, user }) => (
  <Box>
    <Title message={title} />
    <PageHeader
      heading={title}
      description={user ? user.displayName : ''}
    />
  </Box>
);

export default connect(
  (state) => ({
    user: state.user,
  }),
)(Header);
