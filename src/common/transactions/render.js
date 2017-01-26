// @flow
import React from 'react';

// import { View, Text, ListView, StyleSheet } from '@components';
import { View, Text, ListView, StyleSheet } from '../components';
import { getCategoryBySlug } from './utils'
import theme from '../app/themes/default'

const getDateString = date =>
  // new Date(date).toLocaleString()
  new Date(date).toLocaleDateString()

const styles = StyleSheet.create(theme.transaction);

const renderItem = item =>
  <View style={styles.root}>

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

    <Text style={styles.cost}>
      {item.cost} {currency}
    </Text>

  </View>

let currency, categories

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
// var ds = new ListView.DataSource({rowHasChanged: 'ququsyaka-buzyu'});

export default renderTransactions = ({ viewer, transactions }) => {
  currency = viewer.currency
  categories = viewer.categories
  // console.log('print instance ds', ds.rowHasChanged, ds.cloneWithRows);
  const dataSource = ds.cloneWithRows(transactions)

  return (
    <View>

    <ListView
      style={{paddingHorizontal: 15}}
      dataSource={dataSource}
      renderRow={renderItem}
      enableEmptySections={true}
    />
</View>
  )

}
