import { StyleSheet } from 'react-native'
import * as CONST from './_const'

const suggestions = StyleSheet.create({
  root: {
    flex: 1
  },
  list: {
    position: 'absolute',
    // top: 42,
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
    zIndex: 1,
  },

  view: {
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#666'
  },
  amount: {
    // textAlign: auto, left, right, center, justify
    textAlign: 'right',
  },
  highlight: {
    color: 'red'
  },

})

suggestions.selected = suggestions.view

export default suggestions
