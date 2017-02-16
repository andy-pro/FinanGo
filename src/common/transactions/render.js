// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delTransaction, undoDelTransaction } from './actions'

import { View, Text, TouchableHighlight, ListView, Icon, Alert } from '../__components';
import { getCategoryBySlug, fmtCost } from '../__lib/utils'

import scan from './scan'

import { colors, mainStyles, transactions as styles, iconBtn as iconBtnStyle } from '../__themes'

// const getDateString = date =>
//   // new Date(date).toLocaleString()
//   new Date(date).toLocaleDateString()

/* presets */
const del_btn = { name: 'ios-trash-outline', backgroundColor: '#d66' }
const rfr_btn = { name: 'ios-refresh-circle-outline', backgroundColor: '#18a06a' }
const dis_btn = { name: 'ios-refresh-circle-outline', backgroundColor: '#aaa' }

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const scanAndClone = (items, id) => ds.cloneWithRows(scan(items, id))

class Transactions extends Component {

// export default renderTransactions = ({ user, categories, transactions, editable, onClick }) => {
  state = { editing: false }

  onDelTransaction = (e, item) => {
    if (item.willDel) {
      // console.log('%cundelete transaction', 'color:green;font-size:15px', item.id)
      this.props.undoDelTransaction(item.id)
    } else {
      // console.log('%cdelete transaction', 'color:red;font-size:15px', item.id)
      this.props.delTransaction(item.id)
    }
  }

  onRowPress = () => {
    // Alert.alert('quququ editing:'+this.state.editing)
    if (this.state.editing) return
    if (this.props.editable && !this.state.editing) {
      this.setState({
        editing: true
      })
    }
  }

  render() {
    let { user, categories, transactions, editModeGroupId } = this.props
    if (!user) return null
    let { editing } = this.state
    const { currency } = user

    // const dataSource = ds.cloneWithRows(transactions)
    const dataSource = scanAndClone(transactions, editModeGroupId)
    let button

    const renderSummary = (sum, style=null) => {
      return (
        <Text style={[styles.summary, style]}>
          Σ : {fmtCost(sum)} {currency}
        </Text>
      )
    }

    const renderSummaryView = (sum) => {
      return (
        <View style={styles.summaryView}>
          {renderSummary(sum)}
        </View>
      )
    }

    const renderGroupInfo = () => {
      let len = transactions.length
      let sum = len ? transactions[len-1].summary : 0
      return `Покупок: ${len} на сумму: ${sum} ${currency}`
    }

    const renderRow = (item) => {

      if (editing) {
        button = item.didDel ? {...dis_btn} : item.willDel ? {...rfr_btn} : {...del_btn}
        button.style = iconBtnStyle
        if (!item.didDel) {
          button.onPress = (e) => this.onDelTransaction(e, item)
        }
      }

      // console.log('render row', item.title);
      return (
        <View>

          {item.newDate &&
            <View style={mainStyles.row}>
              <Text style={styles.date}>
                {editModeGroupId ? renderGroupInfo() : item.newDate}
              </Text>
            </View>
          }

          <TouchableHighlight
            onPress={this.onRowPress}
            underlayColor={colors.touch}
          >

            <View style={[
              styles.item,
              item.groupId ? styles.group : null,
              item.groupMaster ? styles.groupMaster : null
            ]}>

              {item.groupMaster ?

                <View style={mainStyles.row}>
                  <Icon.Button
                    name="ios-list-box-outline"
                    backgroundColor={colors.header}
                    onPress={this.onGroupSubmit}
                    style={iconBtnStyle}
                  />


                  <View style={styles.groupInfo}>
                    <View style={mainStyles.row}>
                      <Text style={styles.groupTitle}>
                        {item.title}
                      </Text>
                      <Text style={styles.time}>
                        {item.time}
                      </Text>
                      {/*<Text style={{fontSize: 10, color: '#808'}}>id: {item.groupId}</Text>*/}
                    </View>
                    <View>
                      <Text style={styles.category}>
                        Покупок: {item.amount}
                      </Text>
                    </View>
                  </View>

                </View>

                :

                <View onPress={this.onRowPress}>
                  <View style={mainStyles.row}>
                    <Text style={styles.title} onPress={this.onRowPress}>
                      {item.title}
                    </Text>
                    {item.amount &&
                      <Text style={styles.amount}>
                        ({item.amount})
                      </Text>
                    }
                    {item.time &&
                      <Text style={styles.time}>
                        {item.time}
                      </Text>
                    }
                  </View>

                  <View>
                    <Text style={styles.category}>
                      {item.category && getCategoryBySlug(item.category, categories)}
                    </Text>

                    {/*<Text style={{fontSize: 10, color: '#808'}}> id: {item.groupId}</Text>*/}

                  </View>
                </View>
              }

              <View style={mainStyles.row}>

                {item.groupMaster ?
                  renderSummary(item.cost, {backgroundColor: '#18a06a'})
                  :
                  <Text style={styles.cost}>
                    {fmtCost(item.cost)} {currency}
                  </Text>
                }

                {editing &&
                  <View style={{marginLeft: 15}}>
                    <Icon.Button {...button} />
                  </View>
                }
              </View>

            </View>

          </TouchableHighlight>



          {item.summary &&
            renderSummaryView(item.summary)
          }

        </View>
      )
    }

    return (
      <ListView
        style={mainStyles.container}
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
