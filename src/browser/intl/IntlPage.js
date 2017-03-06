// @flow
import React from 'react';
import SwitchLocale from './SwitchLocale';
// import linksMessages from '../../common/app/linksMessages';

import {
  Box,
  Title,
} from '../app/components';

const IntlPage = () => {
  const renderedAt = Date.now();
  const unreadCount = 123;

  return (
    <Box>
      <Title message='Settings' />
      <SwitchLocale />
    </Box>
  );
};

export default IntlPage;
