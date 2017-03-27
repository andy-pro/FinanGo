import { Observable } from 'rxjs'
import { createEpicMiddleware, ActionsObservable } from 'redux-observable';
import configureMockStore from 'redux-mock-store';

import { __copy } from './utils'

import config from '../src/common/config'

const assert = require('chai').assert;

config.storage = 'local'
config.locally = true

const ctgs_actions = require('../src/common/categories/actions')
const configureEpics = require('../src/common/__config/epics').default

const rootEpic = configureEpics();
const epicMiddleware = createEpicMiddleware(rootEpic);

const mockStore = configureMockStore([
  epicMiddleware
])

// config.userId = "5856ffa4da7d1f056c935686" // andy pro
// config.userId = "58a33d33793e920948fb163c" // faddey
config.userId = "58580962da7d1f056c935688" // fedya zadov

describe('FinanGo epics test, localdb storage, categories', () => {

  let store, state, initialAction, responseAction, category
  let reducer = require('../src/common/categories/reducer').default

  store = mockStore();

  it('add category, categories/UPDATED action', () => {

    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    category = {
      data: { title: "Продукты", slug: "Produkty" },
      path: "categories"
    }
    initialAction = ctgs_actions.categoryAction(category, 'add')
    store.dispatch(initialAction)
    responseAction = store.getActions()[1]
    state = reducer(state, responseAction)

    assert.equal(responseAction.type, 'categories/UPDATED')
    assert.equal(state.length, 1)

    store.clearActions()

    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    category = {
      data: { "title": "Бытовая химия", "slug": "Bytovaya-himiya" },
      path: "categories"
    }
    initialAction = ctgs_actions.categoryAction(category, 'add')
    store.dispatch(initialAction)
    responseAction = store.getActions()[1]
    state = reducer(state, responseAction)

    assert.equal(state.length, 2)
    assert.equal(state[0].slug, 'Produkty')
    assert.equal(state[1].title, 'Бытовая химия')

    store.clearActions()

    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    category = {
      data: { "title": "Молочное", "slug": "Molochnoe", },
      path: "categories.0.sub"
    }
    initialAction = ctgs_actions.categoryAction(category, 'add')
    store.dispatch(initialAction)
    responseAction = store.getActions()[1]
    state = reducer(state, responseAction)

    assert.equal(state.length, 2)
    assert.equal(state[0].sub.length, 1)

    store.clearActions()

    // console.log('categories state:', JSON.stringify(state));

    // console.log('mock store: state:', JSON.stringify(store.getState()));

  });

  it('rename category, categories/UPDATED action', () => {

    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    assert.equal(state[0].title, 'Продукты')
    category = {
      data: { "title": "Коммунальные", "slug" : "Kommunalnye" },
      path: "categories.0"
    }
    initialAction = ctgs_actions.categoryAction(category, 'update')
    store.dispatch(initialAction)
    responseAction = store.getActions()[1]
    state = reducer(state, responseAction)

    assert.equal(responseAction.type, 'categories/UPDATED')
    assert.equal(state.length, 2)
    assert.equal(state[0].sub.length, 1)
    assert.equal(state[0].title, 'Коммунальные')

    store.clearActions()

    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    assert.equal(state[0].sub[0].slug, 'Molochnoe')
    category = {
      data: { "title": "Кисломолочное", "slug": "Kislomolochnoe", },
      path: "categories.0.sub.0"
    }
    initialAction = ctgs_actions.categoryAction(category, 'update')
    store.dispatch(initialAction)
    responseAction = store.getActions()[1]
    state = reducer(state, responseAction)

    assert.equal(state[0].sub[0].slug, 'Kislomolochnoe')

    store.clearActions()

    // console.log('categories state:', JSON.stringify(state));

  });

  it('delete category, categories/UPDATED action', () => {

    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    category = {
      parentPath: "categories.0.sub",
      index: 0
    }
    initialAction = ctgs_actions.categoryAction(category, 'del')
    store.dispatch(initialAction)
    responseAction = store.getActions()[1]
    state = reducer(state, responseAction)

    assert.equal(responseAction.type, 'categories/UPDATED')
    assert.equal(state.length, 2)
    assert.equal(state[0].sub.length, 0)

    store.clearActions()

    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    category = {
      parentPath: "categories",
      index: 0
    }
    initialAction = ctgs_actions.categoryAction(category, 'del')
    store.dispatch(initialAction)
    responseAction = store.getActions()[1]
    state = reducer(state, responseAction)

    assert.equal(state.length, 1)
    assert.deepEqual(state, [{ "title": "Бытовая химия", "slug": "Bytovaya-himiya" }])

    store.clearActions()

    // console.log('categories state:', JSON.stringify(state));

  });

  it('replace category, categories/UPDATED action', () => {

    /*~~~~~~~~~~~~ sub test ~~~~~~~~~~~~~*/
    category = [
      { "title": "Кефир", "slug": "Kefir" },
      { "title": "Ряженка", "slug": "Ryazhenka" },
      { "title": "Йогурт", "slug": "Jogurt" },
      { "title": "Закваска", "slug": "Zakvaska" }
    ]
    initialAction = ctgs_actions.categoryAction(__copy(category), 'replace')
    store.dispatch(initialAction)
    responseAction = store.getActions()[1]
    state = reducer(state, responseAction)

    assert.deepEqual(state, category)

    store.clearActions()

    // console.log('categories state:', JSON.stringify(state));

  });


});
