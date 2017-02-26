import { normalize, denormalize /*, convertCategoryPath*/ } from './utils'
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

const {apiKey: __apiKey, databaseURL: __dbURL } = config.mongolab
const __usersURL = __dbURL + 'users';
const __transactionsURL = __dbURL + 'transactions';

export const getUserURL = userId =>
  `${__usersURL}/${userId}?${__apiKey}`

export const getTransactionsURL = (userId, filter, order=-1) => {
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
  return `${__transactionsURL}?q=${JSON.stringify(q)}&s={"date":${order}}&${__apiKey}`
}

// export const getTransactionsURL = (userId, order) =>
//   __transactionsURL + '?q=' + denormalize({userId}) + '&s={"date":' + order + '}&' + __apiKey

export const addTransactionURL = () =>
  `${__transactionsURL}?${__apiKey}`

export const delTransactionURL = id =>
  `${__transactionsURL}/${id}?${__apiKey}`

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const addCategoryBody = category => ({
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

export const updateCategoryBody = category => ({
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

export const delCategoryBody = category => ({
  $pull: { [category.parentPath]: {title: category.title} }
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/*
const usersURL = rootURL + 'users';
const rootURL = 'https://api.mlab.com/api/1/databases/shop/collections/';
const apiKey = 'apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD';
const purchasesURL = rootURL + 'purchases';
const jsonHeaders = {
  'Content-Type': 'application/json;charset=UTF-8'
};

const ajax = (url, opts={}) =>
  fetch(url + apiKey, opts)
    .then(r => r.json())
    .then(r => normalize(r))

//  fetch(usersURL + '?f={firstName:1,lastName:1}&' + apiKey)
export const getUsers = () =>
  ajax(usersURL + '?')

const getUser = id =>
  ajax(usersURL + '/' + id + '?')

const getPurchases = (id) =>
  ajax(purchasesURL + '?q=' + denormalize({userId:id}) + '&')

export { getUser, getPurchases }

// set current user from 'admin panel'
export const setUser = (user) =>
  Promise.all([user, getPurchases(user._id)])

export const getUserData = (id) =>
  Promise.all([getUser(id), getPurchases(id)])

export const addUser = (user) =>
  ajax(usersURL + '?', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(user)
  })

export const updateUser = (id, data) =>
  ajax(usersURL + '/' + id + '?', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify( { $set: data } )
  })

export const delUser = (id) =>
  ajax(usersURL + '/' + id + '?', {
    method: 'DELETE'
  })

export const addPurchase = (purchase) =>
  ajax(purchasesURL + '?', {
    method: 'POST',
    headers: jsonHeaders,
    body: denormalize(purchase)
  })

export const delPurchase = (id) =>
  ajax(purchasesURL + '/' + id + '?', {
    method: 'DELETE'
  })

const categoryQuery2 = (category, operator, path) =>
  ajax(usersURL + '/' + category.userId + '?', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({
      [operator] : {
        [path] : {
          title : category.title,
          slug: category.slug
        }
      }
    })
  })

const categoryQuery = (category, body) =>
  ajax(usersURL + '/' + category.userId + '?', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify(body)
  })

export const addCategory = (category) =>
  categoryQuery(category, {
    $addToSet: {
      [category.path] : {
        title: category.title,
        slug: category.slug
      }
    }
  })

export const updateCategory = (category) =>
  categoryQuery(category, {
    $set: {
      [category.path + '.title']: category.title,
      [category.path + '.slug']: category.slug
    }
  })

export const delCategory = (category) =>
  categoryQuery(category, {
    $pull: {
      [category.parentPath]: {title: category.title}
    }
  })

export const delCategory2 = (category) =>
  ajax(usersURL + '/' + category.userId + '?', {
    method: 'PUT',
    headers: jsonHeaders,
    body: JSON.stringify({
      $pull : {
        // 'categories' : {slug: 'products'}
        // 'categories.0.sub.0.sub' : {slug: 'Salo'}
        'categories.0.sub.0.sub.1.sub' : {slug: 'Mylo'}
      }
    })
  })

*/
