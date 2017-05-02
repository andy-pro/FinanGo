import { Observable } from 'rxjs';
import * as utils from './utils'
import __config from '../../config'

// const norm = r => normalize(r.response)
// const norm = r => normalize(r)
let { normalize } = utils

var socket,
    url,
    dispatch,
    __requestId,
    __resolve

export const init = opts => {
  // console.log('url', url);
  url = opts.url
  dispatch = opts.dispatch
  connect()
}

const connect = () => {
  if (socket) socket.close();
  // var time_start = performance.now();
  socket = new WebSocket(url);

  socket.onmessage = e => {
    let data = JSON.parse(e.data)
    // console.log('qaz', data, __requestId);
    let i = __requestId
    if (typeof i === 'object') i = __requestId.__id__
    if (__requestId && data.__requestId == i && __resolve) {
      __resolve(data.payload)
      clearTimeout(__requestId)
      __requestId = undefined
    } else dispatch({
      type: data.type,
      payload: normalize(data.payload)
    })
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
  let e = Observable.fromPromise(new Promise((resolve, reject) => {
    __resolve = resolve
    __requestId = setTimeout(() => {
      reject(new Error("WebSocket timeout!"));
    }, 5000);

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

  if (typeof __requestId === 'object') { // for node.js env
    __requestId.__id__ = Date.now()
    data.__requestId = __requestId.__id__
  } else data.__requestId = __requestId
  data.userId = __config.userId
  // console.log('stringify data', data);
  send_or_reconnect(data)
  return e
}

const send_or_reconnect = msg => {
  const send = () => socket.send(JSON.stringify(msg))
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
