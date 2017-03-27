import colors from 'colors'

import * as dt from '../src/common/__lib/dateUtils'
import { Query } from '../src/common/transactions/utils'

const assert = require('chai').assert;

var print = function() {
  arguments[0] = arguments[0].bold.bgYellow;
  console.log.apply(console, arguments);
}

describe('date utils test', function() {

  let _date = new Date(),
      _month = _date.getMonth(),
      _year = _date.getFullYear(),
      date

  it('current month & year', () => {
    date = dt.getCurrentDate()
    print('current month & year:', date);
    assert.equal(date.month, _month)
    assert.equal(date.year, _year)
  })

  it('month decrement', () => {
    date = {
      month: 2,
      year: 2000,
    }
    date = dt.monthBack(date)
    assert.equal(date.month, 1)
    assert.equal(date.year, 2000)
  })

  it('month decrement', () => {
    date = dt.monthBack(date)
    assert.equal(date.month, 0)
    assert.equal(date.year, 2000)
  })

  it('month decrement', () => {
    date = dt.monthBack(date)
    assert.equal(date.month, 11)
    assert.equal(date.year, 1999)
  })

  it('month increment', () => {
    date = dt.monthForward(date)
    assert.equal(date.month, 0)
    assert.equal(date.year, 2000)
  })

  it('month increment', () => {
    date = dt.monthForward(date)
    assert.equal(date.month, 1)
    assert.equal(date.year, 2000)
  })

  it('month increment restricted by current date', () => {
    date = dt.getCurrentDate()
    let current = Object.assign({}, date)
    date = dt.monthForward(date)
    assert.deepEqual(date, current)
  })

})

describe('Query Transformer test', function() {

  let _date = new Date(),
      currentYear = _date.getFullYear(),
      currentMonth = _date.getMonth(),
      query,
      date,
      begin,
      end

  it('no parameters - current month', () => {
    query = Query()
    begin = new Date(currentYear, currentMonth)
    end = dt.monthForward({year: currentYear, month: currentMonth}, false)
    end = new Date(end.year, end.month)
    assert.equal(query.date.$gte.toISOString(), begin.toISOString())
    assert.equal(query.date.$lt.toISOString(), end.toISOString())
  })

  it('current year', () => {
    query = Query({date: {year: currentYear}})
    begin = new Date(currentYear, 0)
    end = new Date(currentYear + 1, 0)
    assert.equal(query.date.$gte.toISOString(), begin.toISOString())
    assert.equal(query.date.$lt.toISOString(), end.toISOString())
  })

  it('specified month', () => {
    query = Query({date: {year: 1972, month: 10}})
    begin = new Date(1972, 10)
    end = new Date(1972, 11)
    assert.equal(query.date.$gte.toISOString(), begin.toISOString())
    assert.equal(query.date.$lt.toISOString(), end.toISOString())
  })

  it('whole database', () => {
    query = Query({date: {$all: true}})
    assert.deepEqual(query, {date: {$all: true}})
  })

  it('set of id', () => {
    query = Query({id: {$in: ['qaz12wsx', 'wsx3edc4', 'edc34rfv']}})
    assert.deepEqual(query, {id: {$in: ['qaz12wsx', 'wsx3edc4', 'edc34rfv']}})
  })

})
