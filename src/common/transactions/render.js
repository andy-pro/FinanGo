// @flow
import React from 'react';

import { View, Text, ListView, StyleSheet, Icon } from '../components';
import { getCategoryBySlug } from './utils'
import { defaultTheme as theme } from '../app/themes'

const styles = StyleSheet.create(theme.transaction);

const getDateString = date =>
  // new Date(date).toLocaleString()
  new Date(date).toLocaleDateString()

/* presets */
const del_btn = { name: 'ios-trash-outline', backgroundColor: '#d66' }
const rfr_btn = { name: 'ios-refresh-circle-outline', backgroundColor: '#18a06a' }
const dis_btn = { name: 'ios-refresh-circle-outline', backgroundColor: '#aaa' }


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// var ds = new ListView.DataSource({rowHasChanged: 'ququsyaka-buzyu'});

export default renderTransactions = ({ user, transactions, editable, onClick }) => {
  if (!user) return null

  const { currency, categories } = user
  // console.log('print instance ds', ds.rowHasChanged, ds.cloneWithRows);
  const dataSource = ds.cloneWithRows(transactions)

  const renderRow = item => {
    let button = item.didDel ? {...dis_btn} : item.willDel ? {...rfr_btn} : {...del_btn}
    // let button = item.didDel ? dis_btn : item.willDel ? rfr_btn : del_btn
    // button.style = {...styles.button}
    button.style = styles.button
    // console.log('onPress', button.onPress);
    // console.log('onPress', {...rfr_btn});
    if (!item.didDel) {
      button.onPress = (e) => onClick(e, item)
      button.style.cursor = 'pointer'
    } else {
      // button.onPress = undefined
      button.style.cursor = 'default'
    }
    return (
      <View style={styles.item}>

        <View>
          <Text style={styles.title}>{item.title}
            {item.amount &&
              <Text style={styles.amount}>
                {' '}({item.amount})
              </Text>
            }
          </Text>
          <View>
            <Text style={styles.category}>
              {item.category && getCategoryBySlug(item.category, categories)}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.cost}>
            {item.cost} {currency}
          </Text>
          {editable &&
            <View style={{marginLeft: 15}}>
              <Icon.Button {...button} />
            </View>
          }
        </View>

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
