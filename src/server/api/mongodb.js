import mongodb from 'mongodb'
import __config from '../config'

// const mongodb = require('mongodb');
// const __config  = require('../../common/config');

const { MongoClient, ObjectId } = mongodb
let db_users, db_transactions

const rules = [
  ['userId', item => item.userId = ObjectId(item.userId)],
  ['id', item => {
    if (item.id.$in) {
      item._id = {$in: item.id.$in.map(id => ObjectId(id))}
      delete item.id
    }
  }],
  ['date', item => {
    let { date } = item
    if (typeof date === 'object') {
      if (date.$gte) item.date.$gte = new Date(date.$gte)
      if (date.$lt) item.date.$lt = new Date(date.$lt)
      if (date.$all) delete item.date
    } else item.date = new Date(date)
  }]
]

const denormalize = data => {
  const object_convert = item => {
    rules.forEach(rule => {
      if (item[rule[0]]) rule[1](item)
    })
  }
  if (data instanceof Array) data.forEach(object_convert)
  else object_convert(data)
  return data
}
// console.log('mongodb.url', __config.mongodb.url);
MongoClient.connect(__config.mongodb.url, function(err, db) {

  if (err) return console.log('mongodb connection error', err)
  // db.close();
  console.log("Connected successfully to mongo server");
  db_users = db.collection('users')
  db_transactions = db.collection('transactions')

});

module.exports = {

  message: (msg, client, wss) => {
    // console.log('ok, data is:', msg, ws, wss);
    // console.log('request', client);
    try {
      var { cmd, userId, __requestId, query={}, data={} } = JSON.parse(msg);
      // console.log('request', cmd, msg);
      if (!(cmd && cmd.startsWith('$') && userId && userId.length === 24 && __requestId > 0)) {
        return error();
      }
      var raw_query = JSON.stringify(query);
      query.userId = userId;
      client.__userId = userId;
      denormalize(query);
      // find user filter (by ObjectId)
      var f_user = { _id: query.userId };
      // console.log('query', cmd, query);
    } catch (err) {
      return error(err);
    }

    switch (cmd) {
      case '$init':
        db_users.findOne(f_user, (err, user) => {
          if (err) return error(err)
          if (!(user && user._id)) return error('Invalid user')
          // console.log('init req', user._id, typeof user._id, query)          
          getTransactions(query, user)
        });
        break;

      case '$get':
        return getTransactions(query);

      case '$add':
        return add(data);

      case '$del':
        db_transactions.deleteMany(query, (err, r) => {
          if (err) return error(err)
          // console.log('=== delete query', query);
          // send({ result: r.result })
          send({ removed: r.deletedCount }, 'transactions/DELETED', { query: { query: JSON.parse(raw_query) } })
        })
        break;

      case '$replace':
        db_transactions.deleteMany(query, (err, r) => {
          if (err) return error(err)
          // console.log('replace result', r);
          if (r.result.ok && r.deletedCount >= 0) {
            add(data)
          } else error(new Error('Deleting transactions: error'))
        })
        break;

      case '$getCategory':
        db_users.findOne(f_user, (err, r) => {
          if (err) return error(err)
          send(r.value.categories);
        });
        break;

      case '$category':
        let opts =  { projection: {categories: 1}, returnOriginal: false }
        db_users.findOneAndUpdate(f_user, data, opts, (err, r) => {
          if (err) return error(err)
          send(r.value.categories);
        });
        break;

      default:
        error()
    }

    function error(err) {
      if (!err) err = 'Invalid message'
      if (typeof err === 'string') err = new Error(err)
      console.log('*** mongodb error ***');
      console.error(err.message);
      console.log('*** *** ***** *** ***');
    }

    function getTransactions(query, carrier) {
      db_transactions.find(query).sort({date: 1}).toArray((err, transactions) => {
        if (err) return error(err)
        // console.log('cmd: get', transactions);
        if (carrier) carrier.transactions = transactions
        else carrier = transactions
        send(carrier);
      })
    }

    function send(payload, type, extra) {
      // console.log('~~~~ current ws client', client, 'client ~~~~~~~~~~')
      try {
        let data = JSON.stringify({
          __requestId,
          cmd,
          payload
        })
        const _send = (_c, _d) => {
          // if (_c.readyState !== 1) throw new Error('Client is not connected')
          if (_c.readyState === 1) _c.send(_d)
        }
        // console.log('send stringified data', data);
        if (type) {
          let cast
          wss.clients.forEach(c => {
            if (c === client) _send(c, data)
            else {
              if (c.__userId === userId) {
                if (cast === undefined) {
                  cast = JSON.stringify(Object.assign({type, payload}, extra))
                }
                // console.log('=== cast', cast)
                _send(c, cast)
              }
            }
          })
        } else _send(client, data)
      } catch(err) {
        error(err)
      }
    }

    function add(data) {
      if (!check(data)) return error(new Error('Invalid data!'))
      let arr = Array.isArray(data)
      let op = arr ? 'insertMany' : 'insertOne'
      db_transactions[op](denormalize(data), (err, r) => {
        // console.log('insert res', arr, r);
        // send(arr ? { result: r.result } : r.ops[0])
        if (arr) send(r.result)
        else send(r.ops[0], 'transactions/ADDED')
      })
    }

    function check(data) {
      var _data = Array.isArray(data) ? data : [data]
      // console.log('data', _data)
      for (var i = 0; i < _data.length; i++) {
        var id = _data[i].userId
        if (!id || id !== userId ) return false
      }
      return true
    }

  }

}
