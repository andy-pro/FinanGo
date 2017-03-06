// @flow
import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from './themes/initial';
import { Platform, StyleSheet, View, Alert } from 'react-native';
import { appShowMenu, changeCategoryView } from '../../common/app/actions';
import messages from '../messages';
import { Button, Text } from './components';
import DatePicker from '../../common/__components/DatePicker'

import { colors, datePicker as datePickerStyle } from '../../common/__themes'

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
  rside: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

});

const icon = {
  backgroundColor: colors.header,
  // backgroundColor: 'red',
  size: 30,
  paddingLeft: 12,
  paddingRight: 8,
}

const Header = ({ menuShown, appShowMenu, pattern, changeCategoryView }) => (
  <View style={styles.header}>
    <Icon.Button
      { ...icon }
      name="ios-menu"
      onPress={() => appShowMenu(!menuShown)}
    />

    <Text style={styles.title}>
      {messages[`links.${pattern.slice(1) || 'home'}.title`]}
    </Text>

    <View style={styles.rside}>
      {pattern === '/' && <DatePicker icon={icon} style={datePickerStyle} />}
      {pattern === '/categories' &&
        <Icon.Button
          { ...icon }
          name="ios-eye-outline"
          onPress={changeCategoryView}
        />
      }
    </View>

  </View>
);

export default connect(
  state => ({
    menuShown: state.app.menuShown,
  }),
  { appShowMenu, changeCategoryView },
)(Header);
