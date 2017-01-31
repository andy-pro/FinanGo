import { normalize, denormalize, convertCategoryPath } from './utils'

const __rootURL = 'https://api.mlab.com/api/1/databases/shop/collections/';
const __apiKey = 'apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD';
const __usersURL = __rootURL + 'users';
const __transactionsURL = __rootURL + 'transactions';
// const __transactionsURL = __rootURL + 'purchases';


export { normalize, denormalize }

export const getTransactionsURL = userId =>
  __transactionsURL + '?q=' + denormalize({userId}) + '&s={"date":-1}&' + __apiKey

export const addTransactionURL = () =>
  __transactionsURL + '?' + __apiKey

export const delTransactionURL = id =>
  __transactionsURL + '/' + id + '?' + __apiKey


//=============================================

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
