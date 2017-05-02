import mongodb from 'mongodb'
import __config from '../../common/config'

let { MongoClient, ObjectId } = mongodb
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

MongoClient.connect(__config.mongodb.url, function(err, db) {

  if (err) return console.log('mongodb connection error', err)
  // db.close();
  console.log("Connected successfully to mongo server");
  db_users = db.collection('users')
  db_transactions = db.collection('transactions')

});

export default {

  message: (msg, client, wss) => {
    // console.log('ok, data is:', msg, ws, wss);
    // console.log('request', msg);

    let { cmd, userId, __requestId, query={}, data={} } = JSON.parse(msg)
    query.userId = userId
    denormalize(query)
    // find user filter (by ObjectId)
    let f_user = { _id: query.userId }
    // console.log('query', cmd, query);

    switch (cmd) {
      case '$init':
        db_users.findOne(f_user, (err, user) => {
          db_transactions.find(query).sort({date: 1}).toArray((err, transactions) => {
            user.transactions = transactions
            send(user);
          })
        });
        break;

      case '$get':
        db_transactions.find(query).sort({date: 1}).toArray((err, transactions) => {
          if (err) return error(err)
          // console.log('cmd: get', transactions);
          send(transactions);
        })
        break;

      case '$add':
        add(data)
        break;

      case '$del':
        db_transactions.deleteMany(query, (err, r) => {
          if (err) return error(err)
          // console.log(r);
          // send({ result: r.result })
          send({ removed: r.deletedCount })
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
        error(new Error('Invalid message'))
    }

    function error(err) {
      console.log('*** mongodb error ***');
      console.log(err.message);
      console.log('*** *** ***** *** ***');
    }

    function send(payload, type) {
      let data = JSON.stringify({
        __requestId,
        cmd,
        payload
      })
      // console.log('send stringified data', data);
      if (type) {
        let cast = JSON.stringify({ type, payload })
        wss.clients.forEach(c => c.send(c === client ? data : cast))
      } else client.send(data)
    }

    function add(data) {
      if (!check(data)) return error(new Error('Invalid data!'))
      let arr = Array.isArray(data)
      let op = arr ? 'insertMany' : 'insertOne'
      db_transactions[op](denormalize(data), (err, r) => {
        // console.log('insert res', arr, r);
        // send(arr ? { result: r.result } : r.ops[0])
        send(arr ? r.result : r.ops[0])
      })
    }

    function check(data) {
      try {
        function _check(s) {
          if (!s.userId) throw 'userId is absent!'
        }
        if (data instanceof Array) data.forEach(_check)
        else _check(data)
        return true
      } catch (e) {
        return false
      }
    }

  }

}
