// @flow
import React from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';

const AddSinglePage = ({ user, transactions, isReactNative }) => {

  return (
    <View style={{padding:10, flex: 1}}>
      <View style={{backgroundColor: 'powderblue'}}>
        <Text>QUQUQUQUQUQUQUQU</Text>
      </View>
      <View style={{flex: 1, backgroundColor: 'skyblue',
        borderColor: 'red',
        borderWidth: 1
      }} />
    </View>
  );
}

export default connect(
  (state) => ({
    user: state.user,
    transactions: state.transactions,
    isReactNative: state.device.isReactNative,
  }),
  // { getTransactions }
)(AddSinglePage);
