// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delTransaction, undoDelTransaction } from './actions'

import { View, Text, ListView, StyleSheet, Icon } from '../__components';
import { getCategoryBySlug, fmtCost } from '../__lib/utils'
import { defaultTheme as theme } from '../__themes'

const styles = StyleSheet.create(theme.transaction);

const getDateString = date =>
  // new Date(date).toLocaleString()
  new Date(date).toLocaleDateString()

/* presets */
const del_btn = { name: 'ios-trash-outline', backgroundColor: '#d66' }
const rfr_btn = { name: 'ios-refresh-circle-outline', backgroundColor: '#18a06a' }
const dis_btn = { name: 'ios-refresh-circle-outline', backgroundColor: '#aaa' }

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Transactions extends Component {

// export default renderTransactions = ({ user, categories, transactions, editable, onClick }) => {
  state = { editing: false }

  onDelTransaction = (e, item) => {
    if (item.willDel) {
      console.log('%cundelete transaction', 'color:green;font-size:15px', item.id)
      this.props.undoDelTransaction(item.id)
    } else {
      console.log('%cdelete transaction', 'color:red;font-size:15px', item.id)
      this.props.delTransaction(item.id)
    }
  }

  onRowPress = () => {
    if (this.state.editing) return
    if (this.props.editable && !this.state.editing) {
      this.setState({
        editing: true
      })
    }
  }

  render() {
    let { user, categories, transactions } = this.props
    if (!user) return null
    let { editing } = this.state
    const { currency } = user
    const dataSource = ds.cloneWithRows(transactions)
    let newDate = null,
        summaryComponent = null,
        lastSummaryComponent = null,
        summary = 0,
        len = transactions.length,
        button,
        dt;

    const renderSummary = () => {
      return (
        <View style={[styles.item, styles.lastSummary]}>
          <Text></Text>
          <Text style={styles.summary}>
            Σ : {fmtCost(summary)} {currency}
          </Text>
        </View>
      )
    }

    const renderRow = (item, sid, rid) => {

      if (editing) {
        button = item.didDel ? {...dis_btn} : item.willDel ? {...rfr_btn} : {...del_btn}
        if (!item.didDel) {
          button.onPress = (e) => this.onDelTransaction(e, item)
        }
      }

      dt = new Date(item.date)
      let date = dt.getDate()
      if (date !== newDate) {
        newDate = date
        date = dt.toDateString()
        if (summary) {
          summaryComponent = renderSummary()
          summary = 0
        }
      } else {
        date = null
        summaryComponent = null
      }
      let cost = parseFloat(item.cost)
      if (cost) summary += cost
      if (rid === len - 1) {
        lastSummaryComponent = renderSummary()
      }
  // console.log('render row', this.state);
      return (
        <View>

          {summaryComponent}

          {date &&
            <View>
              <Text style={styles.date}>
                {date}
              </Text>
            </View>
          }

          <View style={[
              styles.item,
              item.groupMaster ? styles.groupBox : null
            ]}>

            {item.groupMaster ?
              <View onPress={this.onRowPress}>
                <Icon.Button
                  name="ios-list-outline"
                  backgroundColor="#18a06a"
                  onPress={this.onGroupSubmit}
                />
                <Text style={styles.groupTitle}>
                  {item.title}
                </Text>
              </View>
              :
              <View onPress={this.onRowPress}>
                <Text style={styles.title}>
                  {item.title}
                  {item.amount &&
                    <Text style={styles.amount}>
                      {' '}({item.amount})
                    </Text>
                  }
                </Text>
                <Text style={styles.time}>
                  {dt.toLocaleTimeString()}
                </Text>
                <View>
                  <Text style={styles.category}>
                    {item.category && getCategoryBySlug(item.category, categories)}
                  </Text>

                  <Text style={{fontSize: 11, color: '#808'}}> id: {item.groupId}</Text>

                </View>
              </View>
            }

            <View style={styles.row}>
              <Text style={styles.cost}>
                {fmtCost(item.cost)} {currency}
              </Text>
              {editing &&
                <View style={{marginLeft: 15}}>
                  <Icon.Button {...button} />
                </View>
              }
            </View>

          </View>

          {lastSummaryComponent}

        </View>
      )
    }

    return (
      <ListView
        style={styles.root}
        dataSource={dataSource}
        renderRow={renderRow}
        enableEmptySections={true}
      />
    )

  }

}

// export default Transactions

export default connect(
  (state) => ({
    user: state.user,
    categories: state.categories,
    transactions: state.transactions,
    // isReactNative: state.device.isReactNative,
  }),
  { delTransaction, undoDelTransaction }
)(Transactions);
