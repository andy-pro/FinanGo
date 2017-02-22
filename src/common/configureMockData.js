
if (process.env.NODE_ENV === 'development') {

  module.exports = require('./_mockData')

}

if (process.env.NODE_ENV !== 'development') {

  module.exports = {}

}


// export default {}
