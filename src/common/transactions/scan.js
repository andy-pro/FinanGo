const scan = (data, groupMode) => {

  let group,
      prevItem,
      newDay,
      len = data.length,
      rowDayIds,
      length = 0,
      balance = 0

// let q=performance.now()

  const dataBlob = {}
  const sectionIds = []
  const rowIds = []

  data.forEach((_item, i) => {

    let { date, ...item } = _item,
        dt = new Date(date),
        time = dt.toLocaleTimeString(),
        // day of the month
        day = dt.getDate()

    if (day !== newDay) {

      /* New Day - New Section init */

      if (prevItem) prevItem.last = 1

      newDay = day
      dataBlob[newDay] = {
        day: dt.toDateString(),
        date,
        rows: length++,
        summary: 0,
        resume: [],
        amount: 0,
      }
      sectionIds.push(newDay)
      rowDayIds = []
      rowIds.push(rowDayIds)

    }

    let _id = `${newDay}:${item.id}`
    rowDayIds.push(_id)
    dataBlob[_id] = item
    let blob = dataBlob[newDay]
    let cost = parseFloat(item.cost)

    if (cost) {
      blob.summary += cost
      balance += cost
      blob.amount++
    }

    if (item.groupMaster) {

      group = item
      group.groupCost = 0
      group.amount = 0
      group.time = time
      blob.resume.push(group.title)

    } else {

      if (group) {

        if (group.groupId === item.groupId) {

          if (cost) group.groupCost += cost
          group.amount++

        } else {

          group = null
          item.groupId = 0
          item.time = time

        }

      } else {

        if (!groupMode) {
          item.groupId = 0
          item.time = time
        }

      }

    }

    if (i === len - 1) item.last = 1

    prevItem = item

  })

  return { dataBlob, sectionIds, rowIds, length, balance }

  // let a = { dataBlob, sectionIds, rowIds }
  // console.log('time', performance.now()-q, JSON.stringify(a.dataBlob));
  // return a

  // return dataBlob
}

export default scan
