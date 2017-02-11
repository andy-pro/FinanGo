import * as CONST from './_const'

const suggestionsPanel = {
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
    boxShadow: "2px 2px 10px grey",
    whiteSpace: 'nowrap'
  },
}

export default suggestionsPanel
