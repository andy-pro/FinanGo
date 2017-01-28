// @flow
import React from 'react';
import { connect } from 'react-redux';

import linksMessages from '../app/linksMessages';
import { View, Text } from '../components'
import {
  Box,
  Button,
  Checkbox,
  Form,
  Input,
  PageHeader,
  Radio,
  Title,
} from '../../browser/app/components';

const AddGroupPage = ({viewer, transactions, isReactNative}) => {

    if (!viewer) {
      return null
    }

    return (
      <Box>

        <Title message={linksMessages.group} />
        <PageHeader
          heading="Group expense"
          description="Add group expense transaction"
        />

        <View style={{padding:10, flex: 1}}>
          <View style={{backgroundColor: 'powderblue'}}>
            <Text>QUQUQUQUQUQUQUQU</Text>
          </View>
        </View>

      </Box>
    );

}

export default connect(
  (state) => ({
    viewer: state.users.viewer,
    transactions: state.transactions,
    isReactNative: state.device.isReactNative,
  }),
  // { getTransactions }
)(AddGroupPage);