import React from 'react';
import { connect } from 'react-redux';
import { changeMonth } from '../app/actions'

import { Text, Icon } from './index'
import * as dt from '../__lib/dateUtils'

const DatePicker = ({ date, changeMonth }) => (
  <Text>
    <Icon.Button
      name='ios-arrow-back'
      backgroundColor='#ddd'
      onPress={() => changeMonth(dt.monthBack(date))}
    />
    <Text> {dt.fmtDate(date)} </Text>
    <Icon.Button
      name='ios-arrow-forward'
      backgroundColor='#ddd'
      onPress={() => {
        let newDate = dt.monthForward(date)
        if (date !== newDate) changeMonth(newDate)
      }}
    />
  </Text>
)

export default connect(
  (state) => ({
    date: state.app.date
  }),
  { changeMonth }
)(DatePicker);
