// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RenderTransactions from './render'
import Form from './form'

import { changeMonth } from '../app/actions'
import { getTransactions, clearTransactions, delTransactions, setDelHandler } from './actions'
import { Alert } from '../__components';
import { Popup } from '../__components/Popup';

import { pick } from '../__lib/utils'
import { isCurrentMonth } from '../__lib/dateUtils'

const LIMIT = 150

class TransactionsPage extends Component {

  componentWillMount() {
    // this.props.getTransactions()
    // console.log('============ TransactionsPage WILL Mount ==============');

    const { date, user, pattern, changeMonth, getTransactions, clearTransactions, setDelHandler, transactions } = this.props

    let len = transactions.length


    if (user) {

      // setDelHandler(len && pattern === '/delete' ? this.delTransactions : null)
      // setDelHandler()
      // setDelHandler(pattern === '/delete' ? this.delTransactions : null)

      if (pattern === '/delete') setDelHandler(this.delTransactions)

      switch (pattern) {
        case '/':
          changeMonth()
          return getTransactions()

        case '/delete':
          return getTransactions({ date })

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


  delTransactions = ({ deleteMonth }) => {
    let { transactions, date } = this.props,
        ids = [],
        len,
        args

    // console.log('delete month?', deleteMonth, JSON.stringify(date));

    if (deleteMonth) {
      len = transactions.length
    } else {
      transactions.forEach(item => {
        if (item.delFlag) {
          ids.push(item.id)
        }
      })
      len = ids.length
    }
    let details = ` (${len} items)`
    // if (len < LIMIT || deleteMonth) {
    if (len && (len < LIMIT || deleteMonth)) {
      args =[
        `Are you shure?${details}`,
        [
          { text: 'Cancel', null, style: 'cancel' },
          { text: 'OK', onPress: () => {
            let query = deleteMonth ? { date } : { id: {$in: ids} }
            this.props.delTransactions(query)
          }},
        ],
        { cancelable: false }
      ]
    } else {
      if (len >= LIMIT) args = [`Request-URI Too Long.${details}`]
      else args = ['Nothing to remove']
    }
    Alert.alert('Delete transactions', ...args)
  }

  render () {

    // console.log('!!! Root transactions page render !!!');
    const renderProps = pick(this.props, ['date', 'user', 'categories', 'transactions', 'pattern'])

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
      <Popup>
        <Form { ...renderProps }>
          <RenderTransactions { ...renderProps } />
        </Form>
      </Popup>
    )

  }

}

export default connect(
  ({ app, user, categories, transactions }) => ({
    date: app.date,
    messages: app.messages,
    user,
    categories,
    transactions,
  }),
  { changeMonth, getTransactions, clearTransactions, delTransactions, setDelHandler }
)(TransactionsPage);
