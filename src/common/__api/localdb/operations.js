import constants from './constants'
import {
  unshiftItem,
  pushItem,
  updateItemById,
  deleteItemById
} from '../../__lib/utils';

export default (file, action) => {

  let { query, payload } = action,
      { table } = query

  switch (query['$op']) {
    case 'add':
    file[table] = unshiftItem(file[table], payload.payload)
      return {
        type: constants.STATE,
        payload: file
      }
    default:

  }

}
