import React from 'react';
import { connect } from 'react-redux';

import { Text } from '../__components'
import { transactions as styles } from '../__themes'
import { fmtCost } from '../__lib/utils'

const Summary = ({ user, value, style=null }) => {
  return user ? (
    <Text style={[styles.summary, style]}>
      Σ : {fmtCost(value)} {user.currency}
    </Text>
  ) : null
}

export default connect(
  ({ user }) => ({ user })
)(Summary);
