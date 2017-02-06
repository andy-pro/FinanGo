// @flow
import React from 'react';
import { Box, Text, Link } from './components';

const Footer = () => (
  <Box
    border="top"
    marginTop={1}
    paddingVertical={1}
  >
    <Text size={-1}>Made with love by</Text>
    {'\u00a0'}
    <Link size={-1} to="https://twitter.com/steida">
      steida
    </Link>
  </Box>
);

export default Footer;
