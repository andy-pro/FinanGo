const green0 = '#18a06a'
// const green0 = '#31aacc'
const styles = {

  headerColor: green0,

  transaction: {
    root: {
      flex: 1,
      paddingHorizontal: 15
    },
    item: {
      flex: 1,
      flexDirection: 'row',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      paddingVertical: 5
    },
    title: {
      fontSize: 16,
      color: '#555',
      fontWeight: '600'
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
    row: {
      flexDirection: 'row'
    },
    cost: {
      fontSize: 16,
      color: 'red',
      marginTop: 8,
      // marginRight: 10
    },
    button: {
      width: 38,
      paddingLeft: 12,
      paddingRight: 0,
    }
  },

  transactionForm: {
    controls: {
      // flex: 1,
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 15,
      backgroundColor: '#ffd',
      borderBottomColor: 'silver',
      borderBottomWidth: 2
    },
    formRow: {
      // flex: 1,
      flexDirection: 'row',
      // alignItems: 'baseline' // flex-start, flex-end, center, stretch
      alignItems: 'flex-start',
      // paddingVertical: 5
    },
    input: {
      // width: '100%',
      // width: 100,
      flex: 1,
      fontSize: 16,
      flexDirection: 'row',
      // marginVertical: 5,
      // height: 50,
      paddingHorizontal: 10,
      paddingVertical: 3,
      // marginTop: 4
    },

    suggestionView: {
      backgroundColor: '#f6f6f6',
      borderWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 4,
      paddingHorizontal: 10,
    },
    suggestion: {
      fontWeight: 'bold',
      fontSize: 13,
      color: '#666'
    },
    suggestionAmount: {
      // textAlign: auto, left, right, center, justify
      textAlign: 'right',
    },
    highlight: {
      color: 'red'
    }
  },

  suggestionsPanel: {
    root: {
      flex: 1
    },
    suggestions: {
      position: 'absolute',
      top: 42,
      left: 16,
      maxHeight: 174,
      backgroundColor: '#f0f0f0',
      // marginHorizontal: 4,
      borderColor: '#8a8',
      borderWidth: 1,
      // borderStyle: 'solid',
      // overflow: 'auto', // visible, hidden, scroll
      overflow: 'scroll',
      padding: 2,
      minWidth: 150,
      // zIndex: 2
    },
  },

}

styles.transactionForm.selected = styles.transactionForm.suggestionView

export default styles
