// @flow
import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from './themes/initial';
import { Platform, StyleSheet, View, Alert } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { changeViewMode } from '../../common/categories/actions';
import titles from '../../common/app/menuTitles';
import messages from '../messages';
import { Button, Text } from './components';
import { DatePicker } from '../../common/__components'

import { colors, datePicker as datePickerStyle, menuBtn } from '../../common/__themes'

const iOSDefaultStatusBarHeight = 20;
const paddingTopOffset = Platform.OS === 'ios' ? iOSDefaultStatusBarHeight : 0;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center', // align items in the cross-axis flexDirection
    backgroundColor: colors.header,
    borderBottomColor: theme.bright(theme.brandPrimary),
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    // justifyContent: 'space-between', // align items in the flexDirection
    // paddingBottom: theme.fontSize * 0.625,
    // paddingTop: (theme.fontSize * 0.625) + paddingTopOffset,
    // paddingVertical: 10
    paddingHorizontal: 7,
    paddingRight: 3,
  },
  title: {
    color: theme.inverseTextColor,
    fontSize: theme.fontSizeH5,
    marginLeft: 10,
  },

});

let language = 'html';

const Header = ({ menuShown, appShowMenu, pattern, changeViewMode }) => (
  <View style={styles.header}>
    <Icon.Button
      { ...menuBtn }
      name="ios-menu"
      onPress={() => appShowMenu(!menuShown)}
    />

    <Text style={styles.title}>
      {messages[titles[pattern]]}
    </Text>

    {pattern === '/' && <DatePicker icon={menuBtn} style={datePickerStyle} />}

    {pattern === '/categories' &&
      <Icon.Button
        { ...menuBtn }
        name="ios-eye-outline"
        onPress={changeViewMode}
      />
    }

  </View>
);

export default connect(
  state => ({
    menuShown: state.app.menuShown,
  }),
  { appShowMenu, changeViewMode },
)(Header);
