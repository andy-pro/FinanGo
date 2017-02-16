import * as CONST from './_const'

import categories from './categories'
import suggestions from './suggestions'
import transactions from './transactions'

const colors = {
  header: CONST._main_,
  touch: '#dfd',
}

const mainStyles = {

  // headerColor: CONST._main_,
  // touchColor: '#dfd',

  root: {
    // flex: 1,
    fontFamily: 'Arial, sans-serif',
    paddingHorizontal: 5
  },

  form: {
    // flex: 1,
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 15,
    // backgroundColor: '#ffd',
  },

  divider: {
    borderBottomColor: 'silver',
    borderBottomWidth: 2,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    // flex-start, flex-end, center, stretch
    alignItems: 'flex-start',
    // paddingVertical: 5,
    justifyContent: 'space-between',
  },
  input: {
    width: 0,
    borderRadius: 4,
    border: '1px solid #bbb',
    outline: 0,
    flex: '1 0 auto',
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
      cursor: 'pointer',
    },
    label: {
      color: '#555',
      fontSize: 14,
      paddingRight: 10,
      cursor: 'pointer',
    }
  },

  menu: {
    backgroundColor: CONST._main_,
    position: 'fixed',
    // top: 0,
    // left: 0,
    marginTop: 24,
    paddingVertical: 10,
    width: 150,
  },


}

const datePicker = {
  container: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-end'
  },
  text: {
    color: '#555',
  },
}

// global button styles for Ionicons
const button = {
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
}

const menuBtn = {
  backgroundColor: '#ddd',
}

export {
  colors,
  menuBtn,
  mainStyles,
  categories,
  suggestions,
  transactions,
  datePicker,
  button
}
