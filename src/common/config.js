const config = {

  "storage": "local",
  // "storage": "localfake",
  // "storage": "mongolab",

  // "populate": true,

  "mongolab": {
    "apiKey": "apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD",
    "databaseURL": "https://api.mlab.com/api/1/databases/shop/collections/"
  },

  "userId": "5856ffa4da7d1f056c935686", // andy pro
  // "userId" : "58a33d33793e920948fb163c", // faddey

}

config.locally = config.storage === 'local' || config.storage === 'localfake'

export default config
