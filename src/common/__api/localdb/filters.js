import * as dt from '../../__lib/dateUtils'

export default {

  filterByDate: (transactions, _date) => {
    _date = _date || dt.getCurrentDate()
    let $gte = new Date(dt.startMonthToISO(_date)),
        $lt =  new Date(dt.endMonthToISO(_date))

    // return transactions.filter(({ date }) => {
    //   date = new Date(date)
    //   return date >= $gte && date < $lt
    // })

    let r = []
    transactions.forEach(item => {
      date = new Date(item.date)
      if (date >= $gte && date < $lt) {
        r.push(Object.assign({}, item))
      }
    })
    return r
  },

}
