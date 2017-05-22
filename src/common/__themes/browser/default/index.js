import * as CONST from './_const'

import categoriesCSS from './categories'
import suggestionsCSS from './suggestions'
import transactionsCSS from './transactions'
import headerCSS from './header'

const colors = {
  header: CONST._main_,
  touch: '#dfd',
  active: CONST._main_,
  disabled: '#ddd',
  alarm: '#d66',
}

const mainCSS = {

  root: {
    // flex: 1,
    fontFamily: 'Arial, sans-serif',
    // paddingHorizontal: 5
  },

  container: {
    // display: 'flex',
    paddingHorizontal: 15,
    // justifyContent: 'space-between',
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
    marginBottom: 10,
  },

  row: {
    display: 'flex',
    // align-items: flex-start | flex-end | center | baseline | stretch (default)
    // alignItems: 'flex-start',
    alignItems: 'baseline',
  },
  between: {
    display: 'flex',
    alignItems: 'flex-start',
    // justify-content: flex-start (default) | flex-end | center | space-between | space-around
    justifyContent: 'space-between',
  },

  // text-type input
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

  menu: {
    backgroundColor: CONST._main_,
    position: 'fixed',
    // top: 0,
    // left: 0,
    marginTop: 24,
    // paddingTop: 10,
    width: 150,
  },
  menuFooter: {
    backgroundColor: '#085',
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    height: 42,
    marginTop: 10,
    // color: '#aaa',
  }

}

const datePickerCSS = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#555',
  },
}

// global button styles for Ionicons
const buttonCSS = {
  backgroundColor: '#888',
  color: 'white',
  // paddingVertical: 5,
  // paddingTop: 5,
  // paddingBottom: 1,
  // paddingHorizontal: 0,
  outline: 0,
  border: 0,
  borderRadius: 4,
  // cursor: 'pointer',
  // height: 26,
  // verticalAlign: 'center'
}

const checkboxCSS = {
  input: {
    // marginLeft: 0,
    // marginRight: 10,

    // for TouchableOpacity and TouchableHighlight if set prop underlayColor
    // auto set property cursor=pointer (see fela/createComponent)
    // cursor: 'pointer',
  },
  image: {
    top: 4,
    position: 'relative',
    width: 18,
    marginRight: 10,
  },
  label: {
    color: '#555',
    fontSize: 14,
    paddingRight: 10,
    // cursor: 'pointer',
  },
  // pull to right
  // rinput: {
  //   marginLeft: 10,
  //   marginRight: 0,
  //   marginTop: 2,
  //   // cursor: 'pointer',
  // }
}

const iconBtnCSS = {}

mainCSS.picker = mainCSS.input

export {
  colors,
  mainCSS,
  categoriesCSS,
  suggestionsCSS,
  transactionsCSS,
  datePickerCSS,
  buttonCSS,
  checkboxCSS,
  headerCSS,
}
