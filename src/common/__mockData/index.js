
if (process.env.NODE_ENV === 'development') {

  module.exports = {
    categories: require('./categories').default,
    transactions: require('./transactionsFull').default
  }

}

if (process.env.NODE_ENV !== 'development') {

  module.exports = {}

}
