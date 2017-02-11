import * as CONST from './_const'

const transactionForm = {
  form: {
    paddingHorizontal: 15,
  },
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
    // paddingVertical: 5,
    justifyContent: 'space-between',
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
    marginBottom: 6,
    // marginRight: 5
  },
  checkbox: {
    input: {
      position: 'relative',
      top: 1,
      marginLeft: 0,
      marginBottom: 16,
      marginRight: 6,
    },
    label: {
      color: '#555',
    }
  },

  suggestionView: {
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 4,
    paddingLeft: 10,
    paddingRight: 30,
    ':hover': {
      backgroundColor: '#cce'
    },
  },
  suggestion: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#666',
  },
  suggestionAmount: {
    // textAlign: auto, left, right, center, justify
    textAlign: 'right',
  },
  highlight: {
    color: 'red'
  }
}

export default transactionForm
