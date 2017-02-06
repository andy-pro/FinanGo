// @flow
import React from 'react';
import { View, Text, Alert, NativeModules, Platform, Button } from 'react-native'
import { connect } from 'react-redux';

import { appError } from '../../common/app/actions'

const AddDroupPage = ({ user, transactions, isReactNative, appError }) => {

  return (
    <View style={{padding:10, flex: 1}}>
      <View style={{backgroundColor: 'powderblue'}}>
        <Text>QUQUQUQUQUQUQUQU</Text>
        <Button
          onPress={() => {
            // Alert.alert('Set Error', 'error')
            appError({
              message: 'Zdrasti'
            })
          }}
          title="Set error"
          color="#841515"
        />
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
  { appError }
)(AddDroupPage);
