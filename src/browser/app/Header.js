// @flow
import React from 'react';
// import { connect } from 'react-redux';
import { DatePicker } from '../../common/__components'

import { Box, Heading, Title } from './components';
import messages from '../messages'
import titles from '../../common/app/menuTitles';

const Header = ({ pattern }) => {
  const title = messages[titles[pattern] + '.title']
  return (
    <Box>
      <Title message={title} />
      <Box
        border="bottom"
        borderWidth={2}
        marginBottom={1}
        marginTop={0}
        paddingBottom={0.5}
      >
        <Box
          display='flex'
          marginLeft={0.65}
          marginRight={0.65}
          justifyContent='space-between'
        >
          <Heading size={1} marginBottom={0}>{title}</Heading>
          {pattern === '/' && <DatePicker />}
        </Box>
      </Box>
    </Box>
  );
}

export default Header

//
// export default connect(
//   (state) => ({
//     user: state.user,
//   }),
// )(Header);
