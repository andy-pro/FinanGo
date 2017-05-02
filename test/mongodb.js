import { Observable } from 'rxjs'
import { REHYDRATE } from 'redux-persist/constants';
import { ActionsObservable } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax';
import colors from 'colors'

import shortid from 'shortid'

import { compose } from '../src/common/__lib/utils'
import { __del_id, __copy } from './utils'
import mockData from '../src/common/__mockData/transactionsFull'

import { Query } from '../src/common/transactions/utils'
import config from '../src/common/config'

import mockCategories from '../src/common/__mockData/categories'

require('./date-query')
require('./mongodb-utils')

const assert = require('chai').assert;

var print = function() {
  arguments[0] = arguments[0].bold.bgGreen;
  console.log.apply(console, arguments);
}

global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


config.locally = false

const MODE = process.env.MONGO_ACCESS
if (MODE === 'DIRECT') {
  config.storage = 'mongolab'
  config.agent = false
  config.mongolab = {
    "apiKey": "apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD",
    "databaseURL": "https://api.mlab.com/api/1/databases/shop/collections/"
  }
} else if (MODE === 'AGENT') {
  config.agent = true
  config.storage = 'mongolab'
  config.mongolab = {
    apiKey: '',
    // databaseURL: 'api/'
    databaseURL: 'https://finan-go.herokuapp.com/api/'
  }
} else if (MODE === 'WS') {
  config.storage = 'mongodb'
  global.WebSocket = require('ws')
  require('../src/common/__api/mongodb')
    .init({
      // http - ws; https - wss
      url: 'ws://localhost:3000',
      dispatch: () => {}
    })
}

const app_actions = require('../src/common/app/actions')
const trns_actions = require('../src/common/transactions/actions')
const ctgs_actions = require('../src/common/categories/actions')
const backup_api = require('../src/common/backup/api')

// epics
const appStartedFinanGoEpic = app_actions.epics[0],
      updateTransactionsEpic = trns_actions.epics[0],
      getTransactionsEpic = trns_actions.epics[1],
      cmdCategoriesEpic = ctgs_actions.epics[0],
      exportCategoriesEpic = ctgs_actions.epics[1],
// actions
      { addTransactions, delTransactions, getTransactions } = trns_actions

// config.userId = "5856ffa4da7d1f056c935686" // andy pro
// config.userId = "58a33d33793e920948fb163c" // faddey
config.userId = "58580962da7d1f056c935688" // fedya zadov

print('FinanGo Epics test, mongolab storage')

describe('FinanGo epics test, mongolab storage, categories:', function() {
  this.timeout(10000);

  let category, len
  print('Start categories')

  it('start app, user/LOADED action', () => {
    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    let action$ = ActionsObservable.of({type: REHYDRATE})
    return appStartedFinanGoEpic(action$).toPromise()
      .then(({ payload: { user, categories } }) => {
        console.log(user.displayName);
        assert.equal(user.id, config.userId)
        len = categories.length
      })
  })

  it('add category', () => {
    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    let id = shortid.generate()
    category = {
      data: { title: "Продукты-"+id, slug: "Produkty-"+id },
      path: "categories"
    }
    let action = ctgs_actions.categoryAction(category, 'add')
    let action$ = ActionsObservable.of(action)
    return cmdCategoriesEpic(action$).toPromise()
      .then(({ type, response: categories }) => {
        assert.equal(type, 'categories/UPDATED')
        let _len = categories.length
        assert.equal(len + 1, _len)
        assert.deepEqual(categories[_len - 1], category.data)
      })
  })

  it('rename category', () => {
    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    let old_category = __copy(category.data)
    let id = shortid.generate()
    category = {
      data: { title: "Продукты-"+id, slug: "Produkty-"+id },
      path: "categories." + len
    }
    let action = ctgs_actions.categoryAction(category, 'update')
    let action$ = ActionsObservable.of(action)
    return cmdCategoriesEpic(action$).toPromise()
      .then(({ response: categories }) => {
        let _len = categories.length
        assert.equal(len + 1, _len)
        let upd = categories[_len - 1]
        assert.deepEqual(upd, category.data)
        assert.notEqual(upd.title, old_category.title)
        assert.notEqual(upd.slug, old_category.slug)
      })
  })

  it('delete category', () => {
    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    category = {
      parentPath: "categories",
      title: category.data.title
    }
    let action = ctgs_actions.categoryAction(category, 'del')
    let action$ = ActionsObservable.of(action)
    return cmdCategoriesEpic(action$).toPromise()
      .then(({ response: categories }) => {
        assert.equal(len, categories.length)
      })
  })

  it('replace categories', () => {
    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    category = [
      { "title": "Кефир", "slug": "Kefir" },
      { "title": "Ряженка", "slug": "Ryazhenka" },
      { "title": "Йогурт", "slug": "Jogurt" },
      { "title": "Закваска", "slug": "Zakvaska" }
    ]
    let action = ctgs_actions.categoryAction(__copy(category), 'replace')
    let action$ = ActionsObservable.of(action)
    return cmdCategoriesEpic(action$).toPromise()
      .then(({ response: categories }) => {
        assert.equal(4, categories.length)
        assert.deepEqual(category, categories)
      })
  })

  it('import & export categories', () => {
    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    category = __copy(mockCategories)
    // add header
    let mockFile = backup_api.__api_export(category, { source: 'categories' })

    let action = backup_api.__api_import(mockFile)

    let action$ = ActionsObservable.of(action)
    return cmdCategoriesEpic(action$).toPromise()
      .then(actionReceived => {
        let { type, opts, response: categories } = actionReceived
        assert.equal(type, 'notify/categories/UPDATED')
        len = categories.length
        assert.equal(mockCategories.length, len)
        let _opts = {"notify": {"header": "import.categories", "message": "success", "extra": ["count.categories", len]}}
        assert.deepEqual(opts, _opts)
      })

  })


})


describe('FinanGo epics test, mongolab storage, transactions', function() {
  this.timeout(10000);

  let user, userId, categories, gottenTransactions

  it('start app, user/LOADED action', () => {
    print('Start transactions')
    let action$ = ActionsObservable.of({type: REHYDRATE})
    return appStartedFinanGoEpic(action$).toPromise()
      .then(actionReceived => {
        // console.log(actionReceived.type);
        user = actionReceived.payload.user
        categories = actionReceived.payload.categories
        // print('user data');
        console.log(user.displayName);
        userId = user.id
        assert.equal(userId, config.userId)
        // assert.deepEqual(actionReceived.payload, expectedUserInfo)
      })
  })

  it('add single transaction, transactions/ADDED action', () => {
    print('User:', user.displayName, userId)
    let item_before = compose(__del_id, __copy)(mockData[0])
    item_before.userId = userId
    let action = compose(addTransactions, __copy)(item_before)
    let action$ = ActionsObservable.of(action)
    return updateTransactionsEpic(action$).toPromise()
      .then(actionReceived => {
        let { type, payload } = actionReceived
        // console.log(item_before, payload);
        assert.equal(type, 'transactions/ADDED')
        delete payload.id
        assert.deepEqual(item_before, payload)
      })
  })

  it('add array of transactions, transactions/ARRAY/ADDED action', () => {
    let array_before = compose(__del_id, __copy)(mockData)
    array_before.forEach(item => item.userId = userId)
    let action = addTransactions(array_before)
    let action$ = ActionsObservable.of(action)
    return updateTransactionsEpic(action$).toPromise()
      .then(actionReceived => {
        let { type, payload } = actionReceived
        // console.log('===================', actionReceived);
        assert.equal(type, 'transactions/ARRAY/ADDED')
        assert.equal(array_before.length, payload.n)
        // delete response.id
        // assert.deepEqual(item_before, response)
      })
  })

  it('get all transactions, transactions/GOTTEN action', () => {
    let action = getTransactions({ date: {$all: true} })
    let action$ = ActionsObservable.of(action)
    return getTransactionsEpic(action$).toPromise()
      .then(actionReceived => {
        let { type, payload } = actionReceived
        gottenTransactions = payload
        if (payload && payload.length)
        console.log('transactions:', payload.length, 'items received');
        assert.equal(type, 'transactions/GOTTEN')
      })
  })

  it('delete all transactions, transactions/DELETED action', () => {
    // create ids of deleted
    let ids = gottenTransactions.map(item => item.id)
    // length of ids must be < 150
    let action = delTransactions({ id: {$in: ids} })
    let action$ = ActionsObservable.of(action)
    return updateTransactionsEpic(action$).toPromise()
      .then(actionReceived => {
        // console.log(actionReceived);
        let { type, payload, query } = actionReceived
        // transactions = payload
        // if (payload && payload.length)
        assert.equal(type, 'transactions/DELETED')
        assert.equal(ids.length, payload.removed)
        console.log('transactions:', payload.removed, 'items removed');
      })
  })

})
