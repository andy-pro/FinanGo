// @flow
import React from 'react';
import { connect } from 'react-redux';

import { changeViewMode } from '../../common/categories/actions';
import { Box, Heading, Title } from './components';
import { DatePicker, Icon } from '../../common/__components'
import messages from '../messages'
import titles from '../../common/app/menuTitles';

import { colors, datePicker as datePickerStyle } from '../../common/__themes'

const Header = ({ pattern, changeViewMode }) => {
  const title = messages[titles[pattern] + '.title']
  return (
    <Box>
      <Title message={title} />
      <Box
        border="bottom"
        borderWidth={2}
        marginBottom={0.5}
        marginTop={0}
        paddingBottom={0.5}
      >
        <Box
          display='flex'
          marginLeft={0.85}
          marginRight={0.85}
          justifyContent='space-between'
        >
          <Heading size={1} marginBottom={0}>{title}</Heading>
          {pattern === '/' &&
            <DatePicker
              icon={{backgroundColor: '#bbb'}}
              style={datePickerStyle}
            />
          }
          {pattern === '/categories' &&
            <Icon.Button
              backgroundColor={colors.header}
              name="ios-eye-outline"
              onPress={changeViewMode}
            />
          }

        </Box>
      </Box>
    </Box>
  );
}

export default connect(
  null,
  { changeViewMode },
)(Header);
