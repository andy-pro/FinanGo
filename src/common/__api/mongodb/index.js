import { Observable } from 'rxjs';
import shortid from 'js-shortid'

import * as utils from './utils'
import __config from '../../config'

// const norm = r => normalize(r.response)
// const norm = r => normalize(r)
let { normalize } = utils

var socket,
    url,
    // dispatch,
    store,
    reqs
    // __requestId,
    // __resolve

export const init = opts => {
  // console.log('url', url);
  url = opts.url
  // dispatch = opts.dispatch
  store = opts.store
  connect()
}

const connect = () => {
  if (socket) socket.close();
  // var time_start = performance.now();
  reqs = [];
  socket = new WebSocket(url);


  // socket.onmessage = e => {
  //   let data = JSON.parse(e.data)
  //   console.log('onmessage', data, __requestId);
  //   let i = __requestId
  //   if (typeof i === 'object') i = __requestId.__id__
  //   if (data.__requestId) {
  //     if (__requestId && data.__requestId == i && __resolve) {
  //       __resolve(data.payload)
  //       clearTimeout(req)
  //       __requestId = undefined
  //     }
  //   } else store.dispatch({
  //     type: data.type,
  //     payload: normalize(data.payload),
  //     query: data.query,
  //     store,
  //   })
  // }

  socket.onmessage = e => {
    let data = JSON.parse(e.data)
    console.log('onmessage:', data, 'reqs len:', reqs.length);

    if (data.__requestId) {
      let idx = reqs.findIndex(item => {
        let { id } = item
        if (typeof id === 'object') id = id.__id__
        return data.__requestId === id
      })
      if (idx >= 0) {
        let req = reqs[idx]
        req.resolve(data.payload)
        clearTimeout(req.id)
        reqs.splice(idx, 1)
      }
      console.log('reqs len after:', reqs.length);

    } else if (data.type) {
      store.dispatch({
        type: data.type,
        payload: normalize(data.payload),
        query: data.query,
        store,
      })
    }
  }

  socket.onclose = () => console.info('socket closed!')
  // this.socket.onerror = err => {
  //   console.error(new Date().toLocaleString() + ', socket error!')
  // }
  //       this.close = this.socket.close
  //       this.socket.onopen = e => {
  //         console.log(performance.now() - time_start)
  //       }
}



const __api = data => {
  // console.log('setup data.cmd', data.cmd);
  // let e = Observable.fromEvent(socket, 'message')
  let id, 
      sur    // surveillance
  let e = Observable.fromPromise(new Promise((resolve, reject) => {
    __resolve = resolve
    id = setTimeout(() => {
      reject(new Error("WebSocket timeout! data.cmd: " + data.cmd));
    }, 5000);
    // __requestId = id
    sur = { id, resolve, reject }
  }))
    .map(r => {
      // console.log('observable data.cmd', data.cmd, r);
      switch (data.cmd) {
        case '$init':
          var { categories=[], transactions=[], ...user } = r
          return {
            user: normalize(user),
            transactions: normalize(transactions),
            categories,
          }
        case '$get':
        case '$add':
          return normalize(r)
        case '$del':
        case '$replace':
        case '$category':
          return r
      }
      throw new Error('Invalid command')
    })

  // if (typeof __requestId === 'object') { // for node.js env
  //   __requestId.__id__ = Date.now()
  //   data.__requestId = __requestId.__id__
  // } else data.__requestId = __requestId
  if (typeof id === 'object') { // for node.js env
    id.__id__ = shortid.gen()
    data.__requestId = id.__id__
  } else data.__requestId = id

  data.userId = __config.userId
  // console.log('stringify data', data);
  send_or_reconnect(data, sur)
  return e
}

const send_or_reconnect = (msg, sur) => {
  const send = () => {
    reqs.push(sur)
    socket.send(JSON.stringify(msg))
  }
  if (socket && socket.readyState === WebSocket.OPEN) {
    send()
  } else {
    let to = setTimeout(() => consol.error('socket connecting timeout!'), 5000)
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      console.log('WebSocket reconnect!');
      connect()
    }
    socket.onopen = () => {
      clearTimeout(to)
      send()
      socket.onopen = null
    }
  }
}

export const apiTransactions = query => __api({
  cmd: query.cmd,
  query: query.query,
  data: query.data,
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const apiCategories = (payload, cmd) => __api(
  cmd === 'get' ?
  { cmd: '$getCategories' }
  :
  { cmd: '$category', data: utils[cmd+'Category'](payload) }
)
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


/*

var st = performance.now()
var dd = 10000
for (var i = 0; i < dd; i++) {
  var q = Date.now()
}
console.log(performance.now() - st);
st = performance.now()
for (var i = 0; i < dd; i++) {
  var q = new Date().valueOf()
}
console.log(performance.now() - st);

*/
