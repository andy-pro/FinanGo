const scan = (data, editModeGroupId) => {

  let group,
      prevItem,
      newDate,
      summary = 0,
      len = data.length

  data.forEach((item, i) => {

    let cost = 0

    let dt = new Date(item.date)

    if (item.groupMaster) {

      group = item
      group.cost = 0
      group.amount = 0
      group.time = dt.toLocaleTimeString()

    } else {

      cost = parseFloat(item.cost)

      if (group) {

        if (group.groupId === item.groupId) {

          group.cost += cost
          group.amount++

        } else {

          group = null
          item.groupId = 0
          item.time = dt.toLocaleTimeString()

        }

      } else {

        if (!editModeGroupId) {
          item.groupId = 0
          item.time = dt.toLocaleTimeString()
        }

      }

    }


    let date = dt.getDate()

    if (date !== newDate) {
      newDate = date
      date = dt.toDateString()

      if (summary && prevItem) {
        prevItem.summary = summary
      }
      summary = cost

    } else {

      date = null
      summary += cost

    }

    if (i === len - 1) {
      item.summary = summary
    }

    item.newDate = date

    prevItem = item

  })

  return data
}

export default scan
