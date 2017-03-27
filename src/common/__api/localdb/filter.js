import {
  unshiftItem,
  pushItem,
  updateItemById,
  deleteItemsByIds,
} from '../../__lib/utils';

const Filter = (collection, { date, id }, $op, order=1) => {

    let r = [],
        raw

    if (date) {

      let { $all, $gte, $lt } = date
      if (!$all) {
        $gte = new Date(date.$gte)
        $lt =  new Date(date.$lt)
      }

      switch ($op) {
        case '$pick':
          let s
          collection.forEach(item => {
            // for debug
            // if (item.rawDate) console.log('!!! RAW DATE !!!');
            // for debug
            s = $all
            raw = new Date(item.date)
            if (!s) s = raw >= $gte && raw < $lt
            if (s) r.push(Object.assign({}, item, { rawDate: raw }))
          })

          r.sort((a, b) => (a.rawDate - b.rawDate)*order)
          // r.sort((a, b) => (new Date(a.date) - new Date(b.date))*order)

          break
        case '$omit':
          if (!$all) {
            r = collection.filter(item => {
              raw = new Date(item.date)
              return (raw < $gte || raw >= $lt)
            })
          }
          // console.log('length after $omit', r.length, $all, $gte, $lt);
          break
          // collection.forEach(item => {
          //   raw = new Date(item.date)
          //   if (raw < $gte || raw >= $lt)
          //     r.push(Object.assign({}, item, { rawDate: raw }))
          // })
          // break
      }

    } else

    if (id && id.$in) {

      switch ($op) {
        case '$omit':
          r = deleteItemsByIds(collection, id.$in)
        break
      }

    }

    return r

}

export default Filter
