/* eslint-disable quotes, quote-props, comma-dangle, max-len */
const initialState = {
  "app": {
    "currentLocale": "en",
    "defaultLocale": "en",
    "locales": [ "en", "ru", "ua" ],
  },
  "config": {
    "appName": "FinanGo",
    "storage": "local",
    // "storage": "localfake",
    // "storage": "mongodb",
    // "storage": "mongolab",
    "mongolab": {
      "apiKey": "apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD",
      "databaseURL": "https://api.mlab.com/api/1/databases/shop/collections/"
    },
    "user": {
      "id" : "5856ffa4da7d1f056c935686", // andy pro
      // "id" : "58a33d33793e920948fb163c", // faddey
    },
    "users": {
      "5856ffa4da7d1f056c935686": {
        "id" : "5856ffa4da7d1f056c935686",
        "firstName" : "Андрей",
        "lastName" : "Проценко",
        "displayName": "Andy Pro",
        "photoURL": "https://avatars.githubusercontent.com/u/12512653?v=3",
        "currency": "₴"
      },
      "58a33d33793e920948fb163c": {
        "id" : "58a33d33793e920948fb163c",
        "firstName" : "Ярослав",
        "lastName" : "Проценко",
        "displayName": "Faddey",
        "photoURL": "https://avatars.githubusercontent.com/u/12512653?v=3",
        "currency": "₴"
      },
    },
  },
  "device": {
    "host": "",
    "isReactNative": false,
    "platform": ""
  },
};

let { storage } = initialState.config
initialState.config.locally = storage === 'local' || storage === 'localfake'

export default initialState
