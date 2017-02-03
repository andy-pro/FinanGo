import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs'

import api from '../api'
import { jsonHeaders } from '../api/headers'

// /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// export const refreshTransactions = userId => ({
//   type: 'REFRESH_TRANSACTIONS_EPIC',
//   // type: 'REFRESH_MOCK_TRANSACTIONS',
//   userId
// })

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const getTransactions = userId => ({
  // type: 'GET_TRANSACTIONS_EPIC',
  type: 'GET_TRANSACTIONS',
  userId
})

const getTransactionsEpic = action$ =>
  action$.ofType('GET_TRANSACTIONS_EPIC').switchMap((action) =>
    ajax({ url: api.getTransactionsURL(action.userId) })
      .map(result => _response('GET_TRANSACTIONS', result)))

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const addTransaction = transaction => ({
  type: 'ADD_TRANSACTION_EPIC',
  transaction
})

const addTransactionEpic = action$ =>
  action$.ofType('ADD_TRANSACTION_EPIC').mergeMap(action =>
    ajax(_add(action.transaction))
      .map(result => _response('TRANSACTION_ADDED', result)))

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const delTransaction2 = id => ({
  type: 'DEL_TRANSACTION_EPIC',
  id
})

const delTransactionEpic2 = action$ =>
  action$.ofType('DEL_TRANSACTION_EPIC').mergeMap(action =>
    ajax(_delete(action.id))
      .map(result => _response('TRANSACTION_DELETED', result)))

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// type-modifier UNI - for epic and regular reducer
export const delTransaction = id => ({
  type: 'WILL_DEL_TRANSACTION_UNI',
  id
})

export const undoDelTransaction = id => ({
  type: 'UNDO_DEL_TRANSACTION_UNI',
  id
})

// const preDelTransactionEpic = action$ =>
//   action$.ofType('WILL_DEL_TRANSACTION_UNI')
//     .flatMap(action =>
//       Observable.timer(3000)
//         .mapTo({ type: 'DEL_TRANSACTION_UNI', id: action.id })
//         .takeUntil(action$.ofType('UNDO_DEL_TRANSACTION_UNI'))
//         // .race(
//         //   action$.ofType('UNDO_DEL_TRANSACTION_UNI').take(1)
//         // )
//   )

  const preDelTransactionEpic = action$ => action$.ofType('WILL_DEL_TRANSACTION_UNI')
    .mergeMap(action => Observable.of({ type: 'DEL_TRANSACTION_UNI', id: action.id })
      .delay(3000)
      .takeUntil(action$.ofType('UNDO_DEL_TRANSACTION_UNI').filter(({id}) => id === action.id))
    )

// const preDelTransactionEpic = action$ =>
//   action$.ofType('WILL_DEL_TRANSACTION_UNI')
//     .flatMap( action =>
//       Observable.of({
//         type: 'DEL_TRANSACTION_UNI',
//         id: action.id
//       })
//       .delay(3000)
//       // .map(fetchUserFulfilled)
//       .takeUntil(action$.ofType('UNDO_DEL_TRANSACTION_UNI'))
//     )

const delTransactionEpic = action$ =>
  action$.ofType('DEL_TRANSACTION_UNI').mergeMap(action =>
    ajax(_delete(action.id))
      .map(result => _response('TRANSACTION_DELETED', result)))

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/






/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [
  getTransactionsEpic,
  addTransactionEpic,
  preDelTransactionEpic,
  delTransactionEpic,
];

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const _response = (type, result) => ({
  type,
  payload: api.normalize(result.response)
})

const _add = item => ({
  url: api.addTransactionURL(item),
  method: 'POST',
  headers: jsonHeaders,
  body: api.denormalize(item)
})

const _delete = id => ({
  url: api.delTransactionURL(id),
  method: 'DELETE'
})
