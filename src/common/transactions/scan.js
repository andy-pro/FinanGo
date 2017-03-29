const scan = (data, groupMode) => {

  let group,
      prevItem,
      newDay = 32,
      len = data.length,
      rowDayIds,
      length = 0,
      balance = 0

// let q=performance.now()

  const dataBlob = {}
  const sectionIds = []
  const rowIds = []

  // data.forEach((item, i) => {

  for (let i = len - 1; i >= 0; i--) {

    let item = data[i]
    // let { ...item } = _item

    // delete item.shown

    let date, dt, time, day

    try {
      date = item.date
      dt = item.rawDate || new Date(date)
      // dt = new Date(date)
      time = dt.toLocaleTimeString()
      day = dt.getDate() // day of the month
      // console.log('day', day, 'index:', i, 'title:', item.title);
      if (day > newDay) {
        throw new RangeError('invalid date')
      }
    } catch (e) {
      console.error(e, 'the damaged transaction, index:', i, 'data:', JSON.stringify(item))
      continue
    }

    // if (day !== newDay) {
    if (day < newDay) {

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

    // let _id = `${newDay}:${item.id}`
    let _id = item.id
    rowDayIds.push(_id)
    dataBlob[_id] = item
    let blob = dataBlob[newDay]
    let cost = parseFloat(item.cost)

    if (cost) {
      blob.summary += cost
      balance += cost
      blob.amount++
    }

    if (item.shown) blob.shown = true

    delete item.delFlag

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

    if (!i) item.last = 1

    prevItem = item

  }

  // console.log('result of scan:', JSON.stringify(sectionIds, null ,2));

  // console.log('Scan time', performance.now()-q);
  return { dataBlob, sectionIds, rowIds, length, balance }

  // let a = { dataBlob, sectionIds, rowIds }
  // console.log('time', performance.now()-q, JSON.stringify(a.dataBlob));
  // return a

  // return dataBlob
}

export default scan
