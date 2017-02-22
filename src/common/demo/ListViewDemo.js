import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ListView, TextInput, Image, Alert } from 'react-native';

import demoData from './demoData'

//``````````````````````````````````````````````//

const stylesFooter = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: '#8E8E8E',
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    color: '#8E8E8E',
  },
});

const Footer = (props) => (
  <View style={stylesFooter.container}>
    <TouchableOpacity style={stylesFooter.button} onPress={() => console.log('load more')}>
      <Text style={stylesFooter.text}>Load More</Text>
    </TouchableOpacity>
  </View>
);

//``````````````````````````````````````````````//

const stylesHeader = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});

const Header = (props) => (
  <View style={stylesHeader.container}>
    <TextInput
      style={stylesHeader.input}
      placeholder="Search..."
      onChangeText={(text) => console.log('searching for ', text)}
    />
  </View>
);

//``````````````````````````````````````````````//

const stylesRow = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8E8E8E',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});

const Row = (props) => {
  return props.disable ?
    null
  :
    <View style={stylesRow.container}>
      <Image source={{ uri: props.picture.large}} style={stylesRow.photo} />
      <Text style={stylesRow.text}>
        {`${props.name.first} ${props.name.last}`}
      </Text>
    </View>
}


//``````````````````````````````````````````````//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  section: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#8E8E8E',
  },

});

//``````````````````````````````````````````````//
class ListViewDemo extends React.Component {

  constructor(props) {
    super(props);

    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });

    // const { dataBlob, sectionIds, rowIds } = this.formatData(demoData);
    this.data = this.formatData(demoData);
    const { dataBlob, sectionIds, rowIds } = this.data
    this.state = {
      dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
    };
  }


  renderSection = (sectionData, sectionId) => {
    return (
      <View style={styles.section}>

        <TouchableOpacity onPress={() => {
          // Alert.alert('header info', JSON.stringify(sectionData))
          const { dataBlob, sectionIds, rowIds } = this.data
          sectionData.rows.forEach(row => dataBlob[row].disable = !Boolean(dataBlob[row].disable))
          this.setState({
            dataSource: this.ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
          })
          // Alert.alert(JSON.stringify(dataBlob['0:0'].disable))
          // sectionData.rows.forEach(row => Alert.alert(JSON.stringify(demoData)))
        }}>
          <Text>{sectionData.character} {sectionId}</Text>
        </TouchableOpacity>

      </View>
    );
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data} />}
        renderHeader={() => <Header />}
        renderFooter={() => <Footer />}
        renderSectionHeader={(sectionData, sectionId) => this.renderSection(sectionData, sectionId)}
      />
    );
  }


  formatData(data) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      const currentChar = alphabet[sectionId];

      const users = data.filter((user) => user.name.first.toUpperCase().indexOf(currentChar) === 0);

      if (users.length > 0) {
        sectionIds.push(sectionId);

        rowIds.push([]);

        let rows = []

        for (let i = 0; i < users.length; i++) {
          const rowId = `${sectionId}:${i}`;
          rowIds[rowIds.length - 1].push(rowId);
          rows.push(rowId)
          dataBlob[rowId] = users[i];
        }

        dataBlob[sectionId] = { character: currentChar, rows };

      }
    }
    // console.log(dataBlob, sectionIds, rowIds);
    return { dataBlob, sectionIds, rowIds };
  }

}

export default ListViewDemo;
