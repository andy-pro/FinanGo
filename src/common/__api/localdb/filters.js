import * as dt from '../../__lib/dateUtils'

export default {

  filterByDate: (transactions, date) => {
    date = date || dt.getCurrentDate()
    let $gte = new Date(dt.startMonthToISO(date)),
        $lt =  new Date(dt.endMonthToISO(date)),
        r = []

    transactions.forEach(item => {
      date = new Date(item.date)
      if (date >= $gte && date < $lt) {
        r.push(Object.assign({}, item))
      }
    })
    return r
  },

}
