import * as CONST from './_const'

const transactions = {
  header: {
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    // flex: 1,
    // flexDirection: 'row',
    display: 'flex',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: 3,
    paddingHorizontal: 10,
    // padding: 10,
    alignItems: 'center',
    cursor: 'pointer',
    color: '#555',
  },
  title: {
    fontSize: 15,
    // color: '#555',
    fontWeight: '600'
  },
  groupTitle: {
    color: CONST._main_,
    fontWeight: '600',
    fontSize: 18,
  },
  group: {
    backgroundColor: '#f3f3f3',
  },
  groupMaster: {
    backgroundColor: '#e0f0d8',
    paddingVertical: 5,
  },
  groupInfo: {
    paddingLeft: 10,
  },
  amount: {
    fontSize: 13,
    color: CONST._main_,
    fontWeight: 'normal',
    marginLeft: 10,
  },
  category: {
    fontSize: 12,
    fontStyle: 'italic',
    marginVertical: 4,
    display: 'inline-block'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cost: {
    fontSize: 14,
    color: 'red',
  },

  resumeTitle: {
    fontSize: 14,
    // fontStyle: 'italic',
    // fontWeight: '600',
    display: 'block',
  },
  resume: {
    fontSize: 13,
    fontStyle: 'italic',
    // color: '#888'
  },

  // date: {
  //   color:'#555',
  //   fontSize: 16,
  //   backgroundColor: '#ddd',
  //   padding: 5,
  //   borderRadius: 5,
  //   marginVertical: 15,
  //   display: 'inline-block'
  // },
  time: {
    color: '#555',
    fontSize: 11,
    backgroundColor: '#ddd',
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginLeft: 10
  },
  summary: {
    fontSize: 14,
    backgroundColor: '#e99',
    color: '#fff',
    padding: 5,
    borderRadius: 6,
    borderColor: '#fff',
    borderWidth: 1,
  },
  summaryView: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20
  },
}

export default transactions
