import React from 'react';
import { connect } from 'react-redux';
import { changeMonth } from '../app/actions'
import { getTransactions } from '../transactions/actions'

import { View, Text, Icon } from './'
import * as dt from '../__lib/dateUtils'

const DatePicker = ({ date, changeMonth, getTransactions, icon, style }, { history }) => {
  const __changeMonth = date => {
    changeMonth(date)
    if (history.location.pathname !== '/backup') {
      getTransactions({ date })
    }
  }
  return (
    <View style={style.container}>
      <Icon.Button
        { ...icon }
        name='ios-arrow-back'
        onPress={() => __changeMonth(dt.monthBack(date))}
      />
      <Text style={style.text}> {dt.fmtDate(date)} </Text>
      <Icon.Button
        { ...icon }
        name='ios-arrow-forward'
        onPress={() => {
          let newDate = dt.monthForward(date)
          if (date !== newDate) __changeMonth(newDate)
        }}
      />
    </View>
  )
}

DatePicker.contextTypes = {
  history: React.PropTypes.object,
}

export default connect(
  ({ app }) => ({
    date: app.date
  }),
  { changeMonth, getTransactions }
)(DatePicker);
