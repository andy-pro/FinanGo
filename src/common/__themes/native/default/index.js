import { StyleSheet } from 'react-native'

import * as CONST from './_const'
import headerCSS from './header'
import categoriesCSS from './categories'
import suggestionsCSS from './suggestions'
import transactionsCSS from './transactions'

const colors = {
  header: CONST._main_,
  touch: '#bbb',
  background: '#fff',
  active: CONST._main_,
  disabled: '#ddd',
  alarm: '#d66',
}

const mainCSS = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: colors.background,
    // paddingHorizontal: 15
  },

  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  divider: {
    borderBottomColor: 'silver',
    borderBottomWidth: 2,
  },

  form: {
    paddingTop: 6,
    paddingBottom: 4,
    paddingHorizontal: 15,
    backgroundColor: '#ffd',
  },

  row: {
    flexDirection: 'row',

    // alignItems: flex-start, flex-end, center, stretch
    // alignItems: 'flex-start',
    // alignItems: 'flex-end',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // justifyContent: 'flex-start',

    // marginBottom: 5,
    // marginVertical: 1,

  },
  between: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  input: {
    // width: '100%',
    // width: 100,
    flex: 1,
    fontSize: 16,
    // flexDirection: 'row',
    // marginVertical: 5,
    // height: 50,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4
  },

  picker: {
    flex: 1,
    // flexDirection: 'row',
    // paddingHorizontal: 8,
    // paddingVertical: 2,
    // marginTop: 4
  },

  menu: {
    padding: 10
  },
  menuFooter: {
    // backgroundColor: '#085',
    borderTopWidth: 1,
    borderTopColor: '#484848',
    // height: 42,
    marginTop: 10,
    // color: '#aaa',
  }
})

const checkboxCSS = StyleSheet.create({
  input: {
    flexDirection: 'row',
    marginVertical: 4,
    // marginTop: 6,
    marginLeft: 3,
    alignItems: 'center',
  },
  image: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    // paddingVertical: 10,
    paddingRight: 10,
  }
})

const datePickerCSS = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginLeft: -5,
  },
  text: {
    color: 'white',
    fontSize: 19,
    paddingTop: 10,
    // marginLeft: -8
  },
})

const iconBtnCSS = {
  width: 38,
  paddingLeft: 11,
  paddingRight: 0,
  // paddingVertical: 6,
}

export {
  colors,
  mainCSS,
  headerCSS,
  categoriesCSS,
  suggestionsCSS,
  transactionsCSS,
  checkboxCSS,
  datePickerCSS,
  iconBtnCSS,
}
