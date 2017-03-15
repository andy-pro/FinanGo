import { StyleSheet } from 'react-native'
import * as CONST from './_const'

const header = StyleSheet.create({
  header: {
    // alignItems: 'center', // align items in the cross-axis flexDirection
    backgroundColor: CONST._main_,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 5,
    paddingRight: 5,
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lside: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rside: {},
  title: {
    color: '#fff',
    fontSize: 20,
    marginTop: 9,
  },
  summary: {
    paddingTop: 14
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  stats: {
    flexDirection: 'row',
    marginTop: -2,
    justifyContent: 'flex-end',
  },
});

export default header
