// @flow
import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { View } from 'react-native'
import { appShowMenu } from '../../common/app/actions'
import { colors, headerCSS } from '../../common/__themes'
import { HeaderBar } from '../../common/__components'

// const iOSDefaultStatusBarHeight = 20;
// const paddingTopOffset = Platform.OS === 'ios' ? iOSDefaultStatusBarHeight : 0;

const iconStyles = {
  set1: {
    size: 30,
    paddingLeft: 12,
    paddingRight: 6,
  },
  set2: {
    size: 30,
    paddingLeft: 8,
    paddingRight: 0,
  }
}

let iconColors = {
  common: colors.header,
  datePicker: colors.header,
  active: '#fff',
  disabled: '#48d09a',
  bgActive: colors.header,
  bgDisabled: colors.header,
  bgDelete: colors.header,
  delete: '#fff',
}

const Header = ({ menuShown, messages, appShowMenu, pattern }) => (
  <View style={headerCSS.header}>
    <Icon.Button
      { ...iconStyles.set1 }
      backgroundColor={colors.header}
      name="ios-menu"
      onPress={() => appShowMenu(!menuShown)}
    />
    <HeaderBar
      style={headerCSS}
      iconStyles={iconStyles}
      iconColors={iconColors}
      pattern={pattern}
      title={messages[`links.${pattern.slice(1) || 'home'}.title`]}
    />
  </View>
);

export default connect(
  ({ app }) => ({
    menuShown: app.menuShown,
    messages: app.messages,
  }),
  { appShowMenu }
)(Header);
