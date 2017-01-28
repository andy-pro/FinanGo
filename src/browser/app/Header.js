// @flow
import React from 'react';
import { connect } from 'react-redux';

import {
  Box,
  PageHeader,
  Title,
} from './components';

const Header = ({ title, viewer }) => (
  <Box>
    <Title message={title} />
    <PageHeader
      heading={title.defaultMessage}
      description={viewer ? viewer.displayName : ''}
    />
  </Box>
);

export default connect(
  (state) => ({
    viewer: state.users.viewer,
  }),
)(Header);
