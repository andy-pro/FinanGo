const green0 = '#18a06a'
// const green0 = '#31aacc'
export default {
  headerColor: green0,
  transaction: {
    root: {
      flex: 1,
      flexDirection: 'row',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: 16,
      color: '#555',
      fontWeight: 600
    },
    amount: {
      fontSize: 14,
      color: green0,
      fontWeight: 'normal'
    },
    category: {
      fontSize: 12,
      fontStyle: 'italic'
    },
    cost: {
      fontSize: 16,
      color: 'red',
      marginTop: 6
    }
  }
}
