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
import SingleForm from '../../common/transactions/singleForm2'

const initialState = {
  title: '',
  category: '',
  amount: '',
  cost: ''
}

class AddSingleForm extends Component {

  fields = {}
  state = initialState

  amountTypes = ['кг', 'г', 'шт', 'м.п.']

  onChange = data => this.setState(data)

  onSubmit = () => {
    // const values = this.props.fields.$values();
    // alert(JSON.stringify(values, null, 2)); // eslint-disable-line no-alert
    alert('ququ')
    console.log('on submit', process.ENV);
    // this.props.fields.$reset();
    // To see how to handle form validation and IO, check /auth.
  };

  render() {
    // const { viewer, transactions } = this.props
    const { viewer } = this.props
    if (!viewer) {
      return null
    }

    const transactions = [
      {
        title: 'Печенье',
        category: 'Продукты / Сладкое',
        amount: '1 кг',
        cost: '20',
      }, {
        title: 'Печенье',
        category: 'Продукты / Сладкое',
        amount: '1 кг',
        cost: '20',
      }
    ]

    return (
      <Box>
        <Title message={linksMessages.single} />
        <PageHeader
          heading="Single expense"
          description="Add single expense transaction"
        />
        <Form
          maxWidth={21}
          onSubmit={this.onSubmit}
        >
          <input />
          <Button primary onClick={this.onSubmit}>
            <FormattedMessage {...buttonsMessages.submit} />
          </Button>
        </Form>
        <SingleForm categories={viewer.categories} />
        <RenderTransactions
          viewer={viewer}
          transactions={transactions}
        />
      </Box>
    );
  }
}

export default connect(
  (state) => ({
    viewer: state.users.viewer,
    transactions: state.transactions,
  }),
)(AddSingleForm);
