// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RenderTransactions from './render'
import Form from './form'
// import { getTransactions } from '../transactions/actions'
import { setMonthToNow } from '../app/actions'
import { clearTransactions } from './actions'

class TransactionsPage extends Component {

  componentWillMount() {
    // this.props.getTransactions()
    // console.log('============ TransactionsPage WILL Mount ==============');

    const { user, pattern, setMonthToNow, clearTransactions, transactions } = this.props

    if (user) {
      switch (pattern) {
        case '/':
          return setMonthToNow()
        case '/group':
          if (transactions.length) {
            clearTransactions()
          }
      }
    }

  }

  render () {

    // console.log('!!! TransactionsPage !!!');
    const { user, categories, transactions, isNative, pattern } = this.props
    // let len = transactions.length

    if (!user) return null

    const renderProps = { user, categories, transactions, isNative, pattern }

    if (pattern === '/')  {
      return <RenderTransactions { ...renderProps } />
    }

    renderProps.editable = true

    if (pattern === '/group') {
      renderProps.groupMode = true
    }

    return (
      <Form { ...renderProps }>
        <RenderTransactions { ...renderProps } />
      </Form>
    )

  }

}

export default connect(
  ({ device, user, categories, transactions }) => ({
    user,
    categories,
    transactions,
    isNative: device.isReactNative,
  }),
  // { getTransactions }
  { setMonthToNow, clearTransactions }
)(TransactionsPage);
