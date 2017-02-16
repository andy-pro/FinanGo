import { StyleSheet } from 'react-native'
import * as CONST from './_const'

const transactions = StyleSheet.create({
  // root: {
  //   flex: 1,
  //   paddingHorizontal: 15
  // },
  item: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600'
  },
  groupTitle: {
    color: CONST._main_,
    fontWeight: '600',
    fontSize: 18,
  },
  group: {
    backgroundColor: '#e8e8e8',
  },
  groupMaster: {
    backgroundColor: '#e0f0d8',
    paddingVertical: 5,
  },
  groupInfo: {
    paddingLeft: 10,
  },
  amount: {
    fontSize: 14,
    color: CONST._main_,
    fontWeight: 'normal',
    marginLeft: 10,
  },
  category: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  cost: {
    fontSize: 16,
    color: 'red',
    marginTop: 8,
    // marginRight: 10
  },

  date: {
    padding: 5,
    borderRadius: 5,
    marginVertical: 15,
    backgroundColor: '#ccc',
    color:'#555',
    fontSize: 16,
  },
  time: {
    color: '#555',
    fontSize: 11,
    backgroundColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 10
  },
  summary: {
    fontSize: 14,
    backgroundColor: '#f99',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  summaryView: {
    // display: 'flex',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20
  },

})

export default transactions
