import { Observable } from 'rxjs'
import { dispatchError } from '../app/actions'

import { __api_export, __api_import, __api_notify } from './api'

export const importData = opts => ({
  type: 'db/IMPORT',
  opts,
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const exportEpic = (action$, { config, backup }) =>
  action$.ofType('db/EXPORT')
    .mergeMap(({ type, payload, opts }) => {
      let data = __api_export(payload, opts)
      backup.download(stringify(data), opts.exportName + '.fgo')
      return Observable.of({
        type: 'notify/' + type,
        opts: __api_notify('export.', opts.source, payload),
      })
    })
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const importEpic = (action$, { backup }) =>
  action$.ofType('db/IMPORT')
    .mergeMap( ({ opts: { importName, mode } }) =>
      backup.upload(importName)
        .map(data => __api_import(data, mode))
        .catch(dispatchError)
    )
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const epics = [
  exportEpic,
  importEpic,
];


const stringify = data => JSON.stringify(data, null, 2)
// const stringify = data => JSON.stringify(data)
