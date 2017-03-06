import { StyleSheet } from 'react-native'

import * as CONST from './_const'
import categoriesCSS from './categories'
import suggestionsCSS from './suggestions'
import transactionsCSS from './transactions'

const colors = {
  header: CONST._main_,
  touch: '#bbb',
  background: '#fff',
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

    // alignItems: 'baseline' // flex-start, flex-end, center, stretch
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input: {
    // width: '100%',
    // width: 100,
    flex: 1,
    fontSize: 16,
    flexDirection: 'row',
    // marginVertical: 5,
    // height: 50,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4
  },

})

const checkboxCSS = StyleSheet.create({
  input: {
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 2,
  },
  label: {
    fontSize: 16,
    padding: 10,
  }
})

const datePickerCSS = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 20,
    paddingTop: 9,
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
  categoriesCSS,
  suggestionsCSS,
  transactionsCSS,
  checkboxCSS,
  datePickerCSS,
  iconBtnCSS,
}
