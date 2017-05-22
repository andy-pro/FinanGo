import * as CONST from './_const'

const transactions = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 6,
  },
  item: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingTop: 4,
    paddingLeft: 10,
    color: '#555',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    paddingRight: 10,
  },
  income: {
    color: '#4a4',
    // fontWeight: 'bold',
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

  time: {
    color: '#555',
    fontSize: 11,
    backgroundColor: '#ddd',
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginLeft: 10,
    borderRadius: 3,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  summary: {
    fontSize: 14,
    color: '#fff',
    padding: 5,
    borderRadius: 6,
    // borderColor: '#fff',
    // borderWidth: 1,
  },
  summaryR: {
    backgroundColor: '#e99',
  },
  summaryG: {
    backgroundColor: '#6b6',
  },
  summaryView: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20
  },
}

export default transactions
