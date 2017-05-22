import React from 'react';
import { connect } from 'react-redux';

import { Text } from '../__components'
import { transactionsCSS as css } from '../__themes'
import { fmtCost } from '../__lib/utils'

const Summary = ({ user, value, style }) => {
  style = style || (value > 0 ? css.summaryG : css.summaryR)
  return user ? (
    <Text style={[css.summary, style]}>
      Σ : {fmtCost(value)} {user.currency}
    </Text>
  ) : null
}

export default connect(
  ({ user }) => ({ user })
)(Summary);
