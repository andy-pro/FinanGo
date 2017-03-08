// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setBalance, setDelHandler } from './actions'

import { View, Text, TouchableHighlight, TouchableOpacity, ListView, Icon, Checkbox } from '../__components';

import { getCategoryBySlug, fmtCost } from '../__lib/utils'
import Summary from './summary'

import scan from './scan'
// import { calcBalance } from './utils'

import { colors, mainCSS, transactionsCSS as styles, iconBtnCSS } from '../__themes'

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
    //   dataSource: this.scanAndClone(transactions, groupMode, 0)
    // }
  }
  */

  componentWillMount() {
    console.log('transactions renderer mount!!!!');
    const { transactions, groupMode } = this.props
    this.state = {
      ds: this.scanAndClone(transactions, groupMode, 0)
    }
  }

  scanAndClone = (transactions, groupMode, shownId) => {
    let data = scan(transactions, groupMode)
    if (this.props.pattern === '/') {
      // let balance = calcBalance(transactions)
      this.props.setBalance(data.balance)
    }
    let { dataBlob, sectionIds, rowIds } = data
    if (shownId !== undefined && data.length) {
      let sid = sectionIds[shownId]
      let blob = dataBlob[sid]
      this.setItemsShown(blob, dataBlob, rowIds, true)
    }
    return ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
  }

  onSectionPress = blob => {
    let { _dataBlob, sectionIdentities, rowIdentities } = this.state.ds
    this.setItemsShown(blob, _dataBlob, rowIdentities) // toggle
    this.setState({
      ds: ds.cloneWithRowsAndSections(_dataBlob, sectionIdentities, rowIdentities)
    })
  }

  setItemsShown = (blob, dataBlob, rowIds, value) => {
    // if value is undefined 'shown' will be toggled
    let shown = value === undefined ? !Boolean(blob.shown) : value
    blob.shown = shown
    rowIds[blob.rows].forEach(row => dataBlob[row].shown = shown)
  }

  cloneData = ({ dataBlob, sectionIds, rowIds }) => {
    return ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
  }

  componentWillReceiveProps(nextProps) {
    console.log('we are receive props');
    let { transactions, groupMode, date } = nextProps,
        { _transactions, _groupMode, _date } = this.props,
        rescan = transactions !== _transactions || groupMode !== _groupMode
    if (rescan) {
      this.setState({
        ds: this.scanAndClone(transactions, groupMode, date === _date ? undefined : 0)
        // ds: this.scanAndClone(transactions, groupMode)
      })
    }
  }

  onTransactionPress = () => {
    if (this.props.editable && !this.props.delHandler) {
      this.props.setDelHandler(this.props.delTransactions)
    }
  }

  // deleteTransactions = () => {
  //   let { _dataBlob, sectionIdentities, rowIdentities } = this.state.ds
  //   const ids = []
  //   rowIdentities.forEach(days => {
  //     days.forEach(row => {
  //       let item = _dataBlob[row]
  //       if (item.delFlag) ids.push(item.id)
  //     })
  //   })
  //
  //   // return this.props.delTransactions(ids)
  //
  //   let args, len = ids.length
  //   if (len) {
  //     args =[
  //       `Are you shure? (${len} items)`,
  //       [
  //         { text: 'Cancel', null, style: 'cancel' },
  //         { text: 'OK', onPress: () => this.props.delTransactions(ids) },
  //       ],
  //       { cancelable: false }
  //     ]
  //   } else args = ['Nothing to remove']
  //   Alert.alert('Delete transactions', ...args)
  // }

  toggleDelBlob = (blob, sectionId) => {
    let { _dataBlob, sectionIdentities, rowIdentities } = this.state.ds
    let children = rowIdentities[_dataBlob[sectionId].rows]
    delFlag = !Boolean(blob.delFlag)
    blob.delFlag = delFlag
    if (blob.day) { // it's a day
      children.forEach(row => {
        _dataBlob[row].delFlag = delFlag
      })
    } else if (blob.groupMaster) { // it's a group transaction
      let { groupId } = blob
      children.forEach(row => {
        row = _dataBlob[row]
        if (row.groupId === groupId) row.delFlag = delFlag
      })
    }
    this.setState({
      ds: ds.cloneWithRowsAndSections(_dataBlob, sectionIdentities, rowIdentities)
    })
  }

//=====================================
  render() {
//=====================================
    let { user, categories, transactions, groupMode, delHandler } = this.props
    console.log('%crender transactions, count:', 'color:blue;font-weight:bold', transactions.length);
    if (!user || !transactions.length) return null
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

    const renderSectionHeader = (blob, sectionId) => {
      let name = blob.shown ? 'remove' : 'add'
      return (
        <View style={styles.header}>
          <Icon.Button name={`ios-${name}-circle-outline`}
            backgroundColor='#b3b3b3'
            onPress={() => this.onSectionPress(blob)}
          >
            {groupMode ? renderGroupInfo(blob) : blob.day}
          </Icon.Button>
          {delHandler &&
            <Checkbox
              onPress={() => this.toggleDelBlob(blob, sectionId)}
              checked={blob.delFlag}
            />
          }
        </View>
      )
    }

    const renderRow = (item, sectionId) => {

      // console.log('render row', item.title);

      if (!item.shown) {
        return item.last ? renderSummaryDay(sectionId) : null
      }

      return (
        <View>

          <TouchableHighlight
            onPress={this.onTransactionPress}
            underlayColor={colors.touch}
            style={[
              styles.item,
              item.groupId ? styles.group : null,
              item.groupMaster ? styles.groupMaster : null,
            ]}
          >
            <View style={styles.itemRow}>

              {item.groupMaster ?

                <View style={mainCSS.row}>
                  <Icon.Button
                    name="ios-list-box-outline"
                    backgroundColor={colors.header}
                    onPress={this.onGroupSubmit}
                    style={iconBtnCSS}
                  />

                  <View style={styles.groupInfo}>
                    <View style={mainCSS.row}>
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
                        Покупок: {item.amount} на сумму:{' '}
                        <Text style={styles.cost}>
                          {fmtCost(item.groupCost)} {currency}
                        </Text>
                      </Text>
                    </View>
                  </View>

                </View>

              :

                <View>
                  <View style={mainCSS.row}>
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

              <View style={mainCSS.row}>
                {!item.groupMaster &&
                  <Text style={styles.cost}>
                    {fmtCost(item.cost)} {currency}
                  </Text>
                }
                {delHandler &&
                  <Checkbox
                    onPress={() => this.toggleDelBlob(item, sectionId)}
                    checked={item.delFlag}
                  />
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
        style={mainCSS.container}
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
  ({app}) => ({
    delHandler: Boolean(app.delHandler),
  }),
  { setBalance, setDelHandler }
)(RenderTransactions);
