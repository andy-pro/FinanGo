// @flow
import React from 'react';
import { connect } from 'react-redux';

import { Box, Title } from './components';
import { View } from '../../common/__components'
import messages from '../messages'
import { colors, mainCSS } from '../../common/__themes'
import { HeaderBar } from '../../common/__components'

const styles = {
  bar: {
    paddingHorizontal: 15,
    display: 'flex',
    alignItems: 'flex-start',
    // justify-content: flex-start (default) | flex-end | center | space-between | space-around
    justifyContent: 'space-between',
  },
  lside: {
    textAlign: 'center',
  },
  rside: {
    width: 130,
  },
  title: {
    fontSize: 24,
  },
  summary: {
    paddingTop: 11
  },
  picker: {

  },
  stats: {
    display: 'flex',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
}

const iconStyles = {
  set1: {},
  set2: {},
}

let iconColors = {
  common: colors.header,
  datePicker: '#bbb',
  active: '#fff',
  disabled: '#fff',
  bgActive: colors.active,
  bgDisabled: colors.disabled,
  bgDelete: '#d66',
  delete: '#fff',
}

const Header = ({ pattern }) => {

  const title = messages[`links.${pattern.slice(1) || 'home'}.title`]

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
        <HeaderBar
          style={styles}
          iconStyles={iconStyles}
          iconColors={iconColors}
          pattern={pattern}
          title={title}
        />
      </Box>
    </Box>
  )

}

export default Header
