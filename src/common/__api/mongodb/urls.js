import { denormalize } from './utils'
import * as dt from '../../__lib/dateUtils'

// const __dbURL = 'https://api.mlab.com/api/1/databases/shop/collections/';
// const __apiKey = 'apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD';
// "id" : "5856ffa4da7d1f056c935686"
// for test:
// https://api.mlab.com/api/1/databases/shop/collections/users/5856ffa4da7d1f056c935686?apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD

// date query
// https://api.mlab.com/api/1/databases/shop/collections/purchases?q={date:{$gte:{$date:%222016-10-01T00:00:00Z%22},$lte:{$date:%222016-12-20T00:00:00Z%22}}}&
// f={%22date%22:1}&apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD

import config from '../../config'
const { userId } = config

const {apiKey: __apiKey, databaseURL: __dbURL } = config.mongolab
const __usersURL = __dbURL + 'users';
const __transactions = `${__dbURL}transactions?${__apiKey}`;

export const user = `${__usersURL}/${userId}?${__apiKey}`

export const filterTransactions = (filter, order=1) => {
  filter = filter || dt.getCurrentDate()
  let q = denormalize({userId}, false)
  if (filter.year) {
    q.date = {
      $gte: { $date: dt.startMonthToISO(filter) },
      $lt:  { $date: dt.endMonthToISO(filter) }
    }
  } else {
    q[filter.field] = filter.value
  }
  // return __dbURL + 'purchases?q=' + q + '&' + __apiKey
  return `${__transactions}&q=${JSON.stringify(q)}&s={"date":${order}}`
}

export { __transactions as transactions }
//
// export const delTransactionURL = id =>
//   `${__transactions}/${id}?${__apiKey}`

export const delTransactions = ids => {
  let q = {
    _id: { $in: ids.map(id => ({ $oid: id })) }
  }
  return `${__transactions}&q=${JSON.stringify(q)}`
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const addCategory = category => ({
  $addToSet: { [category.path]: category.data }
})
/*
{
  $addToSet: {
    [category.path] : {
      title: category.title,
      slug: category.slug,
      color: category.color
    }
  }
}
*/

export const updateCategory = category => ({
  $set: setBodyFields(category)
})
/*
{
  $set: {
    [category.path + '.title']: category.title,
    [category.path + '.slug']: category.slug,
    [category.path + '.color']: category.color
  }
}
*/
const setBodyFields = ({data, path}) =>
  Object.keys(data).reduce((src, field) => {
    src[path + '.' + field] = data[field]
    return src
  }, {})

export const delCategory = category => ({
  $pull: { [category.parentPath]: {title: category.title} }
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
