// @flow
import React from 'react';
import { connect } from 'react-redux';
import RenderTransactions from '../transactions/render'

const HomePage = ({ user, categories, transactions }) => {
  if (!user) return null
  return (
    <RenderTransactions
      user={user}
      categories={categories}
      transactions={transactions}
    />
  );
}

export default connect(
  (state) => ({
    user: state.user,
    categories: state.categories,
    transactions: state.transactions,
  }),
  // { getTransactions }
)(HomePage);
