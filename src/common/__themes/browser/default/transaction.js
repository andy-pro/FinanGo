import * as CONST from './_const'

const transaction = {
  root: {
    // flex: 1,
    fontFamily: 'Arial, sans-serif',
    paddingHorizontal: 15
  },
  item: {
    // flex: 1,
    // flexDirection: 'row',
    display: 'flex',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
    cursor: 'pointer',
  },
  title: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600'
  },
  groupTitle: {
    color: CONST._main_,
    fontWeight: '600',
    fontSize: 18,
    paddingLeft: 10
  },
  groupBox: {
    marginTop: 20,
    // backgroundColor: '#aaa',
    // paddingLeft: 10
    // paddingVertical: 3,
    // paddingHorizontal: 10,
    // borderRadius: 6
  },
  amount: {
    fontSize: 13,
    color: CONST._main_,
    fontWeight: 'normal'
  },
  category: {
    fontSize: 12,
    fontStyle: 'italic',
    marginVertical: 5,
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
  date: {
    color:'#555',
    fontSize: 16,
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    marginVertical: 15,
    display: 'inline-block'
  },
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
    fontSize: 13,
    backgroundColor: '#faa',
    color: '#fff',
    padding: 5,
    borderRadius: 5
  },
  lastSummary: {
    borderWidth: 0,
    marginBottom: 20
  }
}

export default transaction
