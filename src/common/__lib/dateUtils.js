export const fmtDate = date => (date.month + 1) + '/' + date.year

// export { fmtDate }

export const getCurrentDate = () => {
  let dt = new Date()
  return {
    month: dt.getMonth(),
    year: dt.getFullYear(),
  }
}

export const getTimeId = () => {
  let dt = new Date()
  return {
    dt,
    id: dt.valueOf(),
    iso: dt.toISOString()
  }
}

const monthForward = (date, restrict=true) => {
  let { month, year } = date
  let dt = new Date()
  dt = dt.getMonth() + dt.getFullYear() * 12
  if (restrict && (month + year * 12) === dt) return date
  if (++month > 11) {
    month = 0
    ++year
  }
  return { month, year }
}

const monthBack = date => {
  let { month, year } = date
  if (--month < 0) {
    month = 11
    --year
  }
  return { month, year }
}


const endMonthToISO = (date) =>
  startMonthToISO(monthForward(date, false))

const startMonthToISO = (date) =>
  new Date(date.year, date.month).toISOString()

export { monthForward, monthBack, startMonthToISO, endMonthToISO }
