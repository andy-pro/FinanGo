import React from 'react';
import { connect } from 'react-redux';
import { changeMonth } from '../app/actions'

import { View, Text, Icon } from './index'
import * as dt from '../__lib/dateUtils'

const DatePicker = ({ date, changeMonth, icon, style }) => (
  <View style={style.container}>
    <Icon.Button
      { ...icon }
      name='ios-arrow-back'
      onPress={() => changeMonth(dt.monthBack(date))}
    />
  <Text style={style.text}> {dt.fmtDate(date)} </Text>
    <Icon.Button
      { ...icon }
      name='ios-arrow-forward'
      onPress={() => {
        let newDate = dt.monthForward(date)
        if (date !== newDate) changeMonth(newDate)
      }}
    />
</View>
)

export default connect(
  (state) => ({
    date: state.app.date
  }),
  { changeMonth }
)(DatePicker);
