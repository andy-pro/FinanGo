import { StyleSheet } from 'react-native'
import * as CONST from './_const'

const categories = StyleSheet.create({
  container: {
    // paddingHorizontal: 15,
  },
  header: {
    fontWeight: '600',
    fontSize: 18,
    color: '#484',
    backgroundColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 3,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  list: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  sub: {
    marginLeft: 15,
  },
  item: {
    fontSize: 18,
    // marginLeft: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 2,
    borderRadius: 5,
    flex: 0,
  }
})

export default categories
