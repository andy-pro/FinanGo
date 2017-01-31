const green0 = '#18a06a'
// const green0 = '#31aacc'
export default {

  headerColor: green0,

  button: {
    backgroundColor: '#888',
    color: 'white',
    // paddingVertical: 5,
    paddingTop: 5,
    // paddingBottom: 1,
    // paddingHorizontal: 0,
    outline: 0,
    border: 0,
    borderRadius: 4,
    // cursor: 'pointer',
    height: 26,
    verticalAlign: 'center'
  },

  transactionForm: {
    controls: {
      // flex: 1,
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 15,
      // backgroundColor: '#ffd',
      borderBottomColor: 'silver',
      borderBottomWidth: 2
    },
    formRow: {
      display: 'flex',
      flexDirection: 'row',
      // flex-start, flex-end, center, stretch
      alignItems: 'flex-start',
      // paddingVertical: 5
    },
    input: {
      width: '100%',
      borderRadius: 4,
      border: '1px solid #bbb',
      outline: 0,
      flex: 1,
      fontSize: 14,
      // flexDirection: 'row',
      // marginVertical: 5,
      // height: 50,
      paddingHorizontal: 10,
      paddingVertical: 4,
      marginBottom: 10,
      // marginRight: 5
    },

    suggestionView: {
      backgroundColor: '#f6f6f6',
      borderWidth: 1,
      borderColor: '#ddd',
      paddingVertical: 4,
      paddingHorizontal: 10,
      ':hover': {
        backgroundColor: '#cce'
      }
    },
    selected: {
      backgroundColor: '#cce'
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
      flex: 1,
      position: 'relative'
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
      overflow: 'auto',
      padding: 2,
      minWidth: 150,
      boxShadow: "2px 2px 10px grey"
    },
  },

  transaction: {
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
      alignItems: 'center'
    },
    title: {
      fontSize: 15,
      color: '#555',
      fontWeight: '600'
    },
    amount: {
      fontSize: 13,
      color: green0,
      fontWeight: 'normal'
    },
    category: {
      fontSize: 12,
      fontStyle: 'italic'
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
    button: {
      // width: 15,
      // paddingLeft: 12,
      // paddingRight: -5,
    }
  },

}
