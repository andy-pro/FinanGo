import { StyleSheet } from 'react-native'

import * as CONST from './_const'
import categories from './categories'
import suggestions from './suggestions'
import transactions from './transactions'

const colors = {
  header: CONST._main_,
  touch: '#bbb',
  background: '#fff',
}


const mainStyles = StyleSheet.create({

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
    justifyContent: 'space-between',

    // marginBottom: 5,
    // marginVertical: 1,

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

const checkbox = StyleSheet.create({
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

const datePicker = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  text: {
    color: 'white',
    fontSize: 20,
    paddingTop: 9,
    // marginLeft: -8
  },
})

const menuBtn = {
  backgroundColor: CONST._main_,
  // backgroundColor: 'red',
  size: 30,
  paddingLeft: 12,
  paddingRight: 8,
}

const iconBtn = {
  width: 38,
  paddingLeft: 11,
  paddingRight: 0,
  // paddingVertical: 6,
}

export {
  colors,
  menuBtn,
  iconBtn,
  mainStyles,
  categories,
  suggestions,
  transactions,
  checkbox,
  datePicker,
}
