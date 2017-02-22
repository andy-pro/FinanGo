// @flow
import React from 'react';
import SwitchLocale from './SwitchLocale';
// import linksMessages from '../../common/app/linksMessages';

import {
  Box,
  PageHeader,
  Paragraph,
  Title,
} from '../app/components';

const IntlPage = () => {
  const renderedAt = Date.now();
  const unreadCount = 123;

  return (
    <Box>
      <Title message='Settings' />
      <PageHeader
        heading="Settings"
      />
      <SwitchLocale />
    </Box>
  );
};

export default IntlPage;
