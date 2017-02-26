// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { delTransaction, undoDelTransaction } from './actions'
import { setCurrentBalance } from '../app/actions'

import { View, Text, TouchableHighlight, TouchableOpacity, ListView, Icon, Alert } from '../__components';
import { getCategoryBySlug, fmtCost } from '../__lib/utils'
import Summary from './summary'

import scan from './scan'
// import { calcBalance } from './utils'

import { colors, mainStyles, transactions as styles, iconBtn as iconBtnStyle } from '../__themes'

/* presets */
const del_btn = { name: 'ios-trash-outline', backgroundColor: '#d66' }
const rfr_btn = { name: 'ios-refresh-circle-outline', backgroundColor: '#18a06a' }
const dis_btn = { name: 'ios-refresh-circle-outline', backgroundColor: '#aaa' }


let ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
  getSectionHeaderData: (dataBlob, sectionId) => dataBlob[sectionId],
  getRowData: (dataBlob, sectionId, rowId) => dataBlob[rowId]
});

// var qwer = 0
// console.log('get rend module, qwer:', qwer);

class RenderTransactions extends Component {


  /*
  constructor(props) {
    super(props);
    qwer = qwer + 1
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('~ render transactions constructor ~');
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('class count:', qwer, 'transactions count:', props.transactions.length);

    // const { transactions, groupMode } = props
    // this.state = {
    //   editing: false,
    //   dataSource: this.scanAndClone(transactions, groupMode, 0)
    // }
  }
  */

  componentWillMount() {
    const { transactions, groupMode } = this.props
    this.state = {
      editing: false,
      ds: this.scanAndClone(transactions, groupMode, 0)
    }
  }

  scanAndClone = (transactions, groupMode, toggleId) => {
    let data = scan(transactions, groupMode)
    if (this.props.pattern === '/') {
      // let balance = calcBalance(transactions)
      this.props.setCurrentBalance(data.balance)
    }
    let { dataBlob, sectionIds, rowIds } = data
    if (toggleId !== undefined && data.length) {
      let sid = sectionIds[toggleId]
      let blob = dataBlob[sid]
      this.toggleItemsShown(blob, dataBlob, rowIds)
    }
    return ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
  }

  onSectionPress = blob => {
    let { _dataBlob, sectionIdentities, rowIdentities } = this.state.ds
    this.toggleItemsShown(blob, _dataBlob, rowIdentities)
    this.setState({
      ds: ds.cloneWithRowsAndSections(_dataBlob, sectionIdentities, rowIdentities)
    })
  }

  toggleItemsShown = (blob, dataBlob, rowIds) => {
    let shown = !Boolean(blob.shown)
    blob.shown = shown
    rowIds[blob.rows].forEach(row => dataBlob[row].shown = shown)
  }

  cloneData = ({ dataBlob, sectionIds, rowIds }) => {
    return ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
  }

  componentWillReceiveProps(nextProps) {
    // console.log('we are receive props');
    const { transactions, groupMode } = nextProps
    this.setState({
      ds: this.scanAndClone(transactions, groupMode, 0)
    })
  }

  onDelTransaction = (e, item) => {
    if (item.willDel) {
      // console.log('%cundelete transaction', 'color:green;font-size:15px', item.id)
      this.props.undoDelTransaction(item.id)
    } else {
      // console.log('%cdelete transaction', 'color:red;font-size:15px', item.id)
      this.props.delTransaction(item.id)
    }
  }

  onTransactionPress = () => {
    // Alert.alert('quququ editing:'+this.state.editing)
    if (this.state.editing) return
    if (this.props.editable && !this.state.editing) {
      this.setState({
        editing: true
      })
    }
  }

//=====================================
  render() {
//=====================================
    let { user, categories, transactions, groupMode } = this.props
    console.log('%crender transactions, count:', 'color:blue;font-weight:bold', transactions.length);
    if (!user || !transactions.length) return null
    let { editing } = this.state
    const { currency } = user

    const renderSummaryDay = (id) => {
      let item = this.state.ds._dataBlob[id]
      return (
        <View style={styles.item}>
          <View style={{
              // width: 500
              // flexWrap: 'wrap',
              flex: 2,
            }}>
            <Text style={styles.resumeTitle}>
              Покупок: {item.amount}
            </Text>
            {item.resume.length > 0 &&
              <Text style={styles.resume}>
                ({item.resume.join(', ')})
              </Text>
            }
          </View>
          <View style={styles.summaryView}>
            <Summary value={item.summary} />
          </View>
        </View>
      )
    }

    const renderGroupInfo = ({ amount, summary }) => {
      return `Покупок: ${amount} на сумму: ${summary} ${currency}`
    }

    const renderSectionHeader = (blob, id) => {
      let name = blob.shown ? 'remove' : 'add'
      return (
        <View style={styles.header}>
          <Icon.Button name={`ios-${name}-circle-outline`}
            backgroundColor='#b3b3b3'
            onPress={() => this.onSectionPress(blob)}
          >
            {groupMode ? renderGroupInfo(blob) : blob.day}
          </Icon.Button>
        </View>
      )
    }

    const renderRow = (item, sectionId) => {

      // console.log('render row', item.title);

      if (!item.shown) {
        return item.last ? renderSummaryDay(sectionId) : null
      }

      let button

      if (editing) {
        button = item.didDel ? {...dis_btn} : item.willDel ? {...rfr_btn} : {...del_btn}
        button.style = iconBtnStyle
        if (!item.didDel) {
          button.onPress = (e) => this.onDelTransaction(e, item)
        }
      }

      return (
        <View>

          <TouchableHighlight
            onPress={this.onTransactionPress}
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

                <View>
                  <View style={mainStyles.row}>
                    <Text style={styles.title}>
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
                  <Summary value={item.groupCost} />
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

          {item.last &&
            renderSummaryDay(sectionId)
          }

        </View>
      )
    }

    return (
      <ListView
        style={mainStyles.container}
        dataSource={this.state.ds}
        renderRow={renderRow}
        renderSectionHeader={renderSectionHeader}
        enableEmptySections
        initialListSize={Infinity}
      />
    )

  }

}

// export default RenderTransactions

export default connect(
  null,
  { delTransaction, undoDelTransaction, setCurrentBalance }
)(RenderTransactions);
