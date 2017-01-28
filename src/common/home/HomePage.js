// @flow
import React from 'react';
import { connect } from 'react-redux';
import RenderTransactions from '../transactions/render'

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
