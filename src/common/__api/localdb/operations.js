import constants from './constants'
import {
  unshiftItem,
  pushItem,
  updateItemById,
  deleteItemsByIds,
} from '../../__lib/utils';

import filters from './filters'

import mockData from '../../__mockData'
import users from '../../__mockData/users'
import config from '../../config'


export default (file, _action) => {

/* _action - служебный, имеет структуру:

  action = {
    "type": "localdb/QUERY",
    "query": {"table": "transactions", "$op":  "init"},
    "payload": {  // пользовательский action
      "type": "USER_LOADED",
      "payload": {...}
    }
  }

*/

  // payload - пользовательский action, переименуем в action для красоты
  let { query, payload: action } = _action,
      { table } = query

  // объект для фиксации данных в store.localdb
  const modify = {
    type: constants.STATE,
    payload: file
  }

  // inplace-трансформация объекта action и
  // внесение именений в state.localdb, если необходимо

  switch (query['$op']) {

    case '$init':
      let data = action.payload || {},
          categories = data.categories || [],
          localdb = data[constants.filename] || {},
          transactions = localdb.transactions || []

      let populate = config.populate && !categories.length && !transactions.length
      if (populate) {
        categories = mockData.categories
        transactions = mockData.transactions
        file[table] = transactions
      }

      action.payload = {
        user: users[config.userId],
        categories,
        transactions: filters.filterByDate(transactions) // without date - current date
      }

      return populate ? modify : {}

    case '$add':
      // immutable or mutable?
      // console.log(JSON.stringify(action.payload));
      // file[table] = pushItem(file[table], action.payload)
      file[table] = pushItem(file[table], Object.assign({}, action.payload))
      // file[table].push(action.payload)
      return modify

    case '$del':
      file[table] = deleteItemsByIds(file[table], action.payload)
      return modify

    // операция get никак не изменяет базу данных,
    // но должна сделать выборку из file и положить в action.payload
    case '$get':
      let date = action.payload
      action.payload = filters.filterByDate(file[table], date)
      return {}

  }


}
