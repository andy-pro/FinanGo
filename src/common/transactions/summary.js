import React from 'react';
import { connect } from 'react-redux';

import { Text } from '../__components'
import { transactionsCSS } from '../__themes'
import { fmtCost } from '../__lib/utils'

const Summary = ({ user, value, style=null }) => {
  return user ? (
    <Text style={[transactionsCSS.summary, style]}>
      Σ : {fmtCost(value)} {user.currency}
    </Text>
  ) : null
}

export default connect(
  ({ user }) => ({ user })
)(Summary);
