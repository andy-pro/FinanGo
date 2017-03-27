import { Observable } from 'rxjs'
import { REHYDRATE } from 'redux-persist/constants';
import { createEpicMiddleware, ActionsObservable } from 'redux-observable';
import configureMockStore from 'redux-mock-store';
import colors from 'colors'

import { compose } from '../src/common/__lib/utils'
import { __del_id, __copy } from './utils'
import mockData from '../src/common/__mockData/transactionsFull'

import configureLocalDB from '../src/common/__config/localdb';
import config from '../src/common/config'

const { filename, STATE } = configureLocalDB

const assert = require('chai').assert;

const print = function() {
  arguments[0] = arguments[0].bold.bgYellow;
  console.log.apply(console, arguments);
}

config.storage = 'local'

require('./date-query.js')
require ('./local-categories.js')

const app_actions = require('../src/common/app/actions')
const trns_actions = require('../src/common/transactions/actions')
const configureEpics = require('../src/common/__config/epics').default

const rootEpic = configureEpics();
const epicMiddleware = createEpicMiddleware(rootEpic);

const mockStore = configureMockStore([
  epicMiddleware
])

// config.userId = "5856ffa4da7d1f056c935686" // andy pro
// config.userId = "58a33d33793e920948fb163c" // faddey
config.userId = "58580962da7d1f056c935688" // fedya zadov

describe('FinanGo epics test, localdb storage, transactions', () => {

  let store, gottenTransactions

  let initialState = {
    [filename]: {
      transactions: []
    }
  }

  store = mockStore(initialState);
  // beforeEach(() => {
  //   // store = mockStore({});
  //   // store = mockStore(initialState);
  // });
  // afterEach(() => {
  //   // nock.cleanAll();
  //   // epicMiddleware.replaceEpic(appStartedFinanGoEpic);
  //   // epicMiddleware.replaceEpic(configureEpics());
  // });

  // store = mockStore(initialState);

  let { userId } = config

  it('start app, user/LOADED action', () => {
    // create initial action
    let initialAction = { type: REHYDRATE }

    store.dispatch(initialAction);
    let data = store.getActions()
    // console.log(data[1].payload.user);
    let { type, payload } = data[1]

    assert.deepEqual(data[0], initialAction)
    assert.equal(type, 'user/LOADED')
    assert.equal(payload.user.id, userId)

    // print('user name', payload.user.displayName)

    store.clearActions()
  });

  it('add single transaction, transactions/ADDED action', () => {
    // create initial action
    // print('create ADD TRANSACTION')

    let state_before = store.getState()
    let trns_len_before = getTransactionsLength(state_before)

    let item_before = compose(__del_id, __copy)(mockData[0])
    let initialAction = trns_actions.addTransactions(item_before)

    store.dispatch(initialAction);
    let data = store.getActions()

    assert.equal(data[0].type, initialAction.type)
    assert.equal(data[1].type, STATE)

    let state_after = store.getState()
    let trns_len_after = getTransactionsLength(state_after)
    assert.equal(trns_len_before, trns_len_after - 1)

    let responseAction = data[2]
    assert.equal(initialAction.nextType, responseAction.type)
    let item_after = responseAction.payload
    assert.isString(item_after.id)
    delete item_after.id
    assert.deepEqual(item_before, item_after)

    store.clearActions()
  });

  it('add array of transactions, transactions/ARRAY/ADDED action', () => {
    // create initial action
    // print('create ADD TRANSACTION')

    let state_before = store.getState()
    let trns_len_before = getTransactionsLength(state_before)

    let array_before = compose(__del_id, __copy)(mockData)
    let initialAction = trns_actions.addTransactions(array_before)

    store.dispatch(initialAction);
    let data = store.getActions()

    assert.equal(data[0].type, initialAction.type)
    assert.equal(data[1].type, STATE)

    let state_after = store.getState()
    let trns_len_after = getTransactionsLength(state_after)
    assert.equal(trns_len_before, trns_len_after - array_before.length)

    let responseAction = data[2]
    assert.equal(initialAction.nextType, responseAction.type)
    let items_after = responseAction.payload
    // assert.isString(item_after.id)
    // delete item_after.id
    assert.deepEqual(array_before, __del_id(items_after))

    store.clearActions()
  });

  /*
  query:

    undefined - данные за текущий месяц;
    { date: {year} } - за год;
    { date: {year, month} } - за указанный месяц;
    { date: {$gte: {year, month}, $lt: {year, month}} } - за указанный период;
    { date: {$all: true} } - база данных целиком;

    { id: {$in: [id1, id2, ..., idN]} } - записи с этими id
  */

  it('get all transactions, transactions/GOTTEN action', () => {
    // create initial action
    // let initialAction = trns_actions.getTransactions({ date: {$gte: {year: 2016, month:1}, $lt: {year:2017, month:11} }}) // 4 items
    // let initialAction = trns_actions.getTransactions({ date: {year: 2016} })
    let initialAction = trns_actions.getTransactions({ date: { $all: true } })

    store.dispatch(initialAction);
    let data = store.getActions()
    gottenTransactions = data[1].payload
    assert.equal(gottenTransactions.length, mockData.length + 1)
    console.log('transactions length:', gottenTransactions.length);

    store.clearActions()
  });

  it('add array of transactions, transactions/ARRAY/ADDED action', () => {
    // create initial action
    // print('create ADD TRANSACTION')

    let state_before = store.getState()
    let trns_len_before = getTransactionsLength(state_before)

    let array_before = compose(__del_id, __copy)(mockData)
    let initialAction = trns_actions.addTransactions(array_before)

    store.dispatch(initialAction);
    let data = store.getActions()

    assert.equal(data[0].type, initialAction.type)
    assert.equal(data[1].type, STATE)

    let state_after = store.getState()
    let trns_len_after = getTransactionsLength(state_after)
    assert.equal(trns_len_before, trns_len_after - array_before.length)

    let responseAction = data[2]
    assert.equal(initialAction.nextType, responseAction.type)
    let items_after = responseAction.payload
    // assert.isString(item_after.id)
    // delete item_after.id
    assert.deepEqual(array_before, __del_id(items_after))

    store.clearActions()
  });


  it('get all transactions, transactions/GOTTEN action, check sort by date', () => {
    // create initial action
    // let initialAction = trns_actions.getTransactions({ date: {$gte: {year: 2016, month:1}, $lt: {year:2017, month:11} }}) // 4 items
    // let initialAction = trns_actions.getTransactions({ date: {year: 2016} })
    let initialAction = trns_actions.getTransactions({ date: { $all: true } })

    store.dispatch(initialAction);
    let data = store.getActions()
    gottenTransactions = data[1].payload
    assert.equal(gottenTransactions.length, mockData.length * 2 + 1)
    console.log('transactions length:', gottenTransactions.length);
    let sort = 'OK',
        prevDate = 0
    gottenTransactions.forEach(item => {
      let date = new Date(item.date)
      if (date < prevDate) {
        sort = 'fail'
      }
      prevDate = date
    })
    assert.equal(sort, 'OK')
    store.clearActions()
  });

  it('delete all transactions, transactions/DELETED action', () => {
    // create initial action
    let ids = gottenTransactions.map(item => item.id)
    let initialAction = trns_actions.delTransactions({ id: { $in: ids } })

    store.dispatch(initialAction)
    let state_after = store.getState()
    let trns_len_after = getTransactionsLength(state_after)
    assert.equal(trns_len_after, 0)

    store.clearActions()
  });


});

const getTransactionsLength = state => state[filename].transactions.length
