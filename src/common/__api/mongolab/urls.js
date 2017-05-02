import { denormalize } from './utils'
// import * as dt from '../../__lib/dateUtils'

// const __dbURL = 'https://api.mlab.com/api/1/databases/shop/collections/';
// const __apiKey = 'apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD';
// "id" : "5856ffa4da7d1f056c935686"
// for test:
// https://api.mlab.com/api/1/databases/shop/collections/users/5856ffa4da7d1f056c935686?apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD

// date query
// https://api.mlab.com/api/1/databases/shop/collections/purchases?q={date:{$gte:{$date:%222016-10-01T00:00:00Z%22},$lte:{$date:%222016-12-20T00:00:00Z%22}}}&
// f={%22date%22:1}&apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD

import config from '../../config'
// const { userId } = config

const {apiKey: __apiKey, databaseURL: __dbURL } = config.mongolab
const __usersURL = __dbURL + 'users';

// const __transactions = `${__dbURL}transactions?${__apiKey}`;
const __transactions = config.agent ? __dbURL + 'transactions' : `${__dbURL}transactions?${__apiKey}`;

const __query = (q, sort='') => {
  if (sort) sort = `&s=${JSON.stringify(sort)}`
  return config.agent ? `${__transactions}?q=${JSON.stringify(q)}${sort}` : `${__transactions}&q=${JSON.stringify(q)}${sort}`
}

export const user = () => config.agent ? `${__usersURL}/${config.userId}` : `${__usersURL}/${config.userId}?${__apiKey}`

export const transformQuery = (query, order) => {

  // console.log('Untransformed query:', JSON.stringify(query));

  let sort
  if (order) sort = typeof order === 'object' ? order : { date: order }

  let q = denormalize({userId: config.userId}, false)

  Object.keys(query).forEach(key => {
    let _filter = query[key]
    switch (key) {

      case 'date':
        let { $all, $gte, $lt } = _filter
        if ($gte && $lt) {
          q.date = {
            $gte: { $date: _filter.$gte.toISOString() },
            $lt:  { $date: _filter.$lt.toISOString()  }
          }
        }
        break;

      case 'id':
        // { id: {$in: [id1, id2, ..., idN]} } => { _id: {$in: [{$oid: id1}, {$oid: id2},... {$oid: idN}]} }

        // console.log(_filter, Object.keys(_filter))

        q._id = Object.keys(_filter).reduce((res, $op) => {
          res[$op] = _filter[$op].map(id => ({ $oid: id }))
          return res
        }, {})

      default:

    }
  })
  // console.log('Transformed query:', JSON.stringify(q));
  return __query(q, sort)
}

export { __transactions as transactions }

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
  Object.keys(data).reduce((res, field) => {
    res[path + '.' + field] = data[field]
    return res
  }, {})

export const delCategory = category => ({
  $pull: { [category.parentPath]: {title: category.title} }
})

export const replaceCategory = categories => ({
  $set: { categories }
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
