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

export default renderTransactions = ({ viewer, transactions, editable }) => {
  const { currency, categories } = viewer
  // console.log('print instance ds', ds.rowHasChanged, ds.cloneWithRows);
  const dataSource = ds.cloneWithRows(transactions)

  const renderRow = item =>
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
            <Icon.Button
              {...del_btn}
              style={styles.button}
              onPress={() => {  }}
            />
          </View>
        }
      </View>

    </View>

  return (
    <ListView
      style={styles.root}
      dataSource={dataSource}
      renderRow={renderRow}
      enableEmptySections={true}
    />
  )

}
