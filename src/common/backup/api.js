import { addTransactions, replaceTransactions } from '../transactions/actions'
import { categoryAction } from '../categories/actions'
import { appError } from '../app/actions'
import { pick } from '../__lib/utils'
import config from '../config'

export const __api_export = (payload, { source, period }) => {
  let data,
      header = { type: source }
  if (source === 'transactions') {
    data = pickTransactions(payload)
    if (period && period.month) {
      period = { year: period.year, month: ++period.month }
    }
    header.period = period
  } else {
    data = pickCategories(payload)
  }
  return addHeader(data, header)
}

const addHeader = (payload, header) => Object.assign(header, {
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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const __api_import = (data, mode) => {
  console.log('import data', data, config);
  // data check
  if (data) {
    let { type, period, appName, payload } = data
    if (appName === config.appName) {

      let opts = __api_notify('import.', type, payload)

      if (type === 'transactions') {
        if (!config.locally) {
          let { userId } = config
          payload.forEach(item => item.userId = userId)
        }
        if (mode === 'merge') {
          return addTransactions(payload, opts)
        } else {
          if (period.month) --period.month
          return replaceTransactions(payload, opts, { date: period })
        }
      }

      if (type === 'categories') {
        // TODO : merge mode
        return categoryAction(payload, 'replace', opts)
      }

    }
  }
  return appError(new Error('Invalid file format.'))
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const __api_notify = (header, type, data) => ({
  notify: {
    header: header + type,
    message: 'success',
    extra: ['count.' + type, data.length]
  },
})
