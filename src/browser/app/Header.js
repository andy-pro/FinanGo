// @flow
import React from 'react';
import { connect } from 'react-redux';

import { Box, Title } from './components';
import { View } from '../../common/__components'
import { colors, mainCSS, headerCSS } from '../../common/__themes'
import { HeaderBar } from '../../common/__components'

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
  bgDelete: colors.alarm,
  delete: '#fff',
}

const Header = ({ messages, pattern }) => {

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
          style={headerCSS}
          iconStyles={iconStyles}
          iconColors={iconColors}
          pattern={pattern}
          title={title}
        />
      </Box>
    </Box>
  )

}

export default connect(
  ({ app }) => ({ messages: app.messages })
)(Header);
