// @flow
import React, { Component } from 'react';
import buttonsMessages from '../../common/app/buttonsMessages';
import linksMessages from '../../common/app/linksMessages';
import { FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import { fields } from '../../common/lib/redux-fields';
import { connect } from 'react-redux';
import {
  Box,
  Button,
  Checkbox,
  Form,
  Input,
  PageHeader,
  Radio,
  Title,
} from '../app/components';

import RenderTransactions from '../../common/transactions/render'
import SingleForm from '../../common/transactions/SingleForm'

const initialState = {
  title: '',
  category: '',
  amount: '',
  cost: ''
}

const AddSingleForm = ({viewer, transactions}) => {

    // const { viewer, transactions } = this.props
    // const { viewer } = this.props
    if (!viewer) {
      return null
    }

    transactions = [
      {
        title: 'Печенье',
        category: 'Продукты / Сладкое',
        amount: '1 кг',
        cost: '20',
      }, {
        title: 'Печенье',
        category: 'Продукты / Сладкое',
        amount: '2 кг',
        cost: '30',
      }, {
        title: 'Печенье',
        category: 'Продукты / Сладкое',
        amount: '3 кг',
        cost: '40',
      }
    ]

    return (
      <Box>
        <Title message={linksMessages.single} />
        <PageHeader
          heading="Single expense"
          description="Add single expense transaction"
        />
        <SingleForm categories={viewer.categories} />
        <RenderTransactions
          viewer={viewer}
          transactions={transactions}
        />
      </Box>
    );

}

export default connect(
  (state) => ({
    viewer: state.users.viewer,
    transactions: state.transactions,
  }),
)(AddSingleForm);
