const scan = (data, groupMode) => {

  let group,
      prevItem,
      newDate,
      // summary = 0,
      len = data.length,
      __rowIds

  const dataBlob = {}
  const sectionIds = []
  const rowIds = []

  // const setSummary = item => {
  //   let summary = dataBlob[newDate].summary
  //   if (summary) item.summary = summary
  // }

  data.forEach((item, i) => {

    let dt = new Date(item.date),
        time = dt.toLocaleTimeString(),
        date = dt.getDate()

    if (date !== newDate) {

      // if (prevItem) setSummary(prevItem)
      if (prevItem) prevItem.last = 1

      newDate = date
      dataBlob[newDate] = {
        date: dt.toDateString(),
        rows: [],
        summary: 0,
        resume: [],
        amount: 0,
      }
      sectionIds.push(newDate)
      __rowIds = []
      rowIds.push(__rowIds)

    }

    // dataBlob[newDate].rows.push(item.id)
    // addItem(item)

    let rowId = `${newDate}:${item.id}`
    __rowIds.push(rowId)

    let blob = dataBlob[newDate]

    blob.rows.push(rowId)
    dataBlob[rowId] = item

    // if (sectionIds.length > 1) {
    //   item.hidden = 1
    // }

    let cost = parseFloat(item.cost)
    if (cost) {
      blob.summary += cost
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

    // if (i === len - 1) setSummary(item)
    if (i === len - 1) item.last = 1

    prevItem = item

  })

  // console.log(dataBlob);

  // console.log(dataBlob, sectionIds, rowIds);


  return { dataBlob, sectionIds, rowIds }

  // return dataBlob
}

export default scan
