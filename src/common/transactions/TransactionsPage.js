// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RenderTransactions from './render'
import Form from './form'

import { changeMonth } from '../app/actions'
import { clearTransactions, setDelHandler, delTransactions } from './actions'
import { Alert } from '../__components';
import { pick } from '../__lib/utils'
import { isCurrentMonth } from '../__lib/dateUtils'

class TransactionsPage extends Component {

  componentWillMount() {
    // this.props.getTransactions()
    console.log('============ TransactionsPage WILL Mount ==============');

    const { date, user, pattern, changeMonth, clearTransactions, setDelHandler, transactions } = this.props

    let len = transactions.length


    if (user) {

      // setDelHandler(len && pattern === '/delete' ? this.delTransactions : null)
      // setDelHandler()
      // setDelHandler(pattern === '/delete' ? this.delTransactions : null)

      if (pattern === '/delete') setDelHandler(this.delTransactions)

      switch (pattern) {
        case '/':
          return changeMonth()
        case '/group':
          if (len) clearTransactions()
        case '/single':
          if (len && !isCurrentMonth(date)) clearTransactions()
      }

    }

  }

  componentWillReceiveProps(nextProps) {

    // this.props.setDelHandler(this.props.pattern === '/delete' ? this.delTransactions : null)
    const { pattern, setDelHandler } = nextProps

    // console.log('CWRP cwrp6', pattern);
    // let len = transactions.length

    if (pattern === '/delete') setDelHandler(this.delTransactions)

  }

  componentWillUnmount() {
    this.props.setDelHandler()
  }

  // setDelHandler = () => {
  //   const { user, pattern, setDelHandler, transactions } = this.props
  //   let deleteMode = user && pattern === '/delete' && transactions.length && !this.deleteMode
  //   if (deleteMode) {
  //
  //     setDelHandler(pattern === '/delete' ? this.delTransactions : null)
  //
  //
  //   }
  //
  // }


  delTransactions = () => {
    let ids = []
    this.props.transactions.forEach(item => {
      if (item.delFlag) {
        ids.push(item.id)
      }
    })

    // return this.props.delTransactions(ids)

    let args, len = ids.length
    if (len) {
      args =[
        `Are you shure? (${len} items)`,
        [
          { text: 'Cancel', null, style: 'cancel' },
          { text: 'OK', onPress: () => this.props.delTransactions(ids) },
        ],
        { cancelable: false }
      ]
    } else args = ['Nothing to remove']
    Alert.alert('Delete transactions', ...args)
  }

  render () {

    console.log('!!! Root transactions page render !!!');
    const renderProps = pick(this.props, ['date', 'user', 'categories', 'transactions', 'isNative', 'pattern'])

    if (!renderProps.user) return null

    renderProps.delTransactions = this.delTransactions
    const { pattern } = renderProps

    if (pattern === '/' || pattern === '/delete')  {
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
  ({ app, device, user, categories, transactions }) => ({
    date: app.date,
    user,
    categories,
    transactions,
    isNative: device.isReactNative,
  }),
  // { getTransactions }
  { changeMonth, clearTransactions, delTransactions, setDelHandler }
)(TransactionsPage);
