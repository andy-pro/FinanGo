
if (process.env.NODE_ENV === 'development') {

  module.exports = require('../__data/mockDataFull')

}

if (process.env.NODE_ENV !== 'development') {

  module.exports = {}

}


// export default {}
