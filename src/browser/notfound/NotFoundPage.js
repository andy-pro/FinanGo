// @flow
import React from 'react';
// import linksMessages from '../../common/app/linksMessages';
// import messages from '../../common/notfound/messages';
// import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Box,
  Link,
  PageHeader,
  Title,
} from '../app/components';

const NotFoundPage = () => (
  <Box>
    <Title message='Not found' />
    <PageHeader
      heading='Not found'
      description='broken or removed'
    />
    <Link exactly to="/">
      back to home
    </Link>
  </Box>
);

export default NotFoundPage
