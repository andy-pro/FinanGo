import config from '../config'

let localdb = require('./localdb')
let fakedb = require('./fakedb')
let mongodb = require('./mongodb')

let api

/* set necessary adapter */

switch (config.storage) {
  case 'local':
    api = localdb
    break;
  case 'localfake':
    api = fakedb
    break;
  case 'mongolab':
    api = mongodb
}

module.exports = api
