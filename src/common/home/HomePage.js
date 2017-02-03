// @flow
import React from 'react';
import { connect } from 'react-redux';
import RenderTransactions from '../transactions/render'

const HomePage = ({ user, transactions }) => {
  if (!user) return null
  return (
    <RenderTransactions
      user={user}
      transactions={transactions}
    />
  );
}

export default connect(
  (state) => ({
    user: state.user,
    transactions: state.transactions,
  }),
  // { getTransactions }
)(HomePage);
