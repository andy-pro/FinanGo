// @flow
import React from 'react';
import { connect } from 'react-redux';
import RenderTransactions from './../../common/transactions/render'
// import { View } from 'react-native'
// import RoundButton from './../../common/components/RoundButton'

const HomePage = ({ viewer, transactions }) => {
  if (!viewer) return null
  // const { currency } = viewer
  return (
    <RenderTransactions
      viewer={viewer}
      transactions={transactions}
    />
  );
}

export default connect(
  (state) => ({
    viewer: state.users.viewer,
    transactions: state.transactions,
  }),
  // { getTransactions }
)(HomePage);
