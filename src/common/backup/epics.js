import { Observable } from 'rxjs'
import { dispatchError } from '../app/actions'

import { pick } from '../__lib/utils'

const exportEpic = (action$, { config, backup }) =>
  action$.ofType('db/EXPORT')
    .mergeMap(({ type, payload, opts: { exportName, source, period } }) => {
      let fn, header = { type: source }
      if (source === 'transactions') {
        fn = pickTransactions
        if (period && period.month) {
          period = { ...period, month: ++period.month }
        }
        header.period = period
      } else {
        fn = pickCategories
      }
      let data = fn(payload)
      data = addHeader(data, config, header)
      backup.download(stringify(data), exportName)
      return Observable.of({
        type: 'notify/' + type,
        opts: { notify : { header: 'export.' + source, message: 'success' } },
      })
    })

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const importEpic = (action$, { config, backup }) =>
  action$.ofType('db/IMPORT')
    .mergeMap( ({ opts: { importName, acceptor } }) =>
      backup.upload(importName)
        .map(acceptor)
        .catch(dispatchError)
    )
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export default [
  exportEpic,
  importEpic,
];

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const addHeader = (payload, config, header) => Object.assign(header, {
  appName: config.appName,
  date: new Date().toLocaleString(),
  storage: config.storage,
  payload,
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const trnsProps = ["title", "category", "cost", "amount", "date", "groupMaster"]

const pickTransactions = data =>
  data.map(item =>
    pick(item, item.groupId ? trnsProps.concat('groupId') : trnsProps)
  )

const pickCategories = data =>
  data.map(item => {
    let { title, slug, color, sub } = item
    let _item = { title, slug }
    if (color) _item.color = color
    if (sub && sub.length) _item.sub = pickCategories(sub)
    return _item
  })

const stringify = data => JSON.stringify(data, null, 2)
// const stringify = data => JSON.stringify(data)
