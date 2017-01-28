// @flow
import React from 'react';
import { connect } from 'react-redux';
import RenderTransactions from './render'
import SingleForm from './SingleForm'

const AddSinglePage = ({ viewer, transactions, isReactNative }) => {
  if (!viewer) return null

  // let transactions2 = [
  //   {
  //     title: 'Печенье',
  //     category: 'Продукты / Сладкое',
  //     amount: '1 кг',
  //     cost: '20',
  //   }, {
  //     title: 'Печенье',
  //     category: 'Продукты / Сладкое',
  //     amount: '2 кг',
  //     cost: '30',
  //   }, {
  //     title: 'Печенье',
  //     category: 'Продукты / Сладкое',
  //     amount: '3 кг',
  //     cost: '40',
  //   }
  // ]

  return (
    <SingleForm categories={viewer.categories} isReactNative={isReactNative}>
      <RenderTransactions
        viewer={viewer}
        transactions={transactions}
        editable={true}
      />
    </SingleForm>
  );

}

export default connect(
  (state) => ({
    viewer: state.users.viewer,
    transactions: state.transactions,
    isReactNative: state.device.isReactNative,
  }),
  // { getTransactions }
)(AddSinglePage);
