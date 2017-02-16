import * as CONST from './_const'

const suggestions = {

  root: {
    flex: 1,
    position: 'relative'
  },

  list: {
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
    boxShadow: "2px 2px 10px grey",
    whiteSpace: 'nowrap'
  },

  view: {
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
  text: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#666',
  },
  amount: {
    // textAlign: auto, left, right, center, justify
    textAlign: 'right',
  },
  highlight: {
    color: 'red'
  },


}

suggestions.selected = [
  suggestions.view,
  { backgroundColor: '#cce' }
]

export default suggestions
