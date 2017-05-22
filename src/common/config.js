const config = {

  // "userId": "5856ffa4da7d1f056c935686", // andy pro
  // "userId" : "58a33d33793e920948fb163c", // faddey
  "userId" : "58580962da7d1f056c935688", // fedya zadov

  "storage": "local",
  // "storage": "localfake",
  // "storage": "mongolab",
  // "storage": "mongodb",

  // "agent": true,

  // "populate": true,

  // "mongolab": {
  //   "apiKey": "apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD",
  //   "databaseURL": "https://api.mlab.com/api/1/databases/shop/collections/"
  // },

  "appName": "FinanGo",

}

if (config.agent) {
  config.mongolab = {
    apiKey: '',
    databaseURL: 'api/'
    // databaseURL: 'https://finan-go.herokuapp.com/api/'
  }
}

config.locally = config.storage === 'local' || config.storage === 'localfake'

export default config
