import { StyleSheet } from 'react-native'
import * as CONST from './_const'

const transactions = StyleSheet.create({
  root: {
    // flex: 1,
    paddingHorizontal: 15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  itemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    paddingLeft: 8,
  },
  amount: {
    fontSize: 14,
    color: CONST._main_,
    fontWeight: 'normal',
    marginLeft: 8,
  },
  category: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  cost: {
    fontSize: 16,
    color: 'red',
    marginTop: 8,
    marginRight: 10
  },

  resumeTitle: {
    fontSize: 14,
    // fontStyle: 'italic',
    fontWeight: '600',
  },

  resume: {
    fontSize: 14,
    fontStyle: 'italic'
  },

  // date: {
  //   padding: 5,
  //   borderRadius: 5,
  //   marginTop: 20,
  //   backgroundColor: '#ccc',
  //   color:'#555',
  //   fontSize: 16,
  // },
  time: {
    color: '#555',
    fontSize: 11,
    backgroundColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 8
  },
  summary: {
    fontSize: 14,
    backgroundColor: '#f99',
    color: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  summaryView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 5,
    // marginBottom: 10,
  },

})

export default transactions
