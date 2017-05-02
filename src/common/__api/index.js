import config from '../config'

let api

/* set necessary adapter */

switch (config.storage) {
  case 'local':
    api = require('./localdb')
    break
  case 'localfake':
    api = require('./fakedb')
    break
  case 'mongolab':
    api = require('./mongolab')
    break
  case 'mongodb':
    api = require('./mongodb')
}

module.exports = api
