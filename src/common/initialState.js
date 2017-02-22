/* eslint-disable quotes, quote-props, comma-dangle, max-len */
const initialState = {
  "config": {
    "appName": "FinanGo",
    // "storage": "local",
    "storage": "localfake",
    // "storage": "mongodb",
    // "storage": "mongolab",
    "mongolab": {
      "apiKey": "apiKey=i4YcHo-NCAiwpVEdLLVkPzNZdo-bzsJD",
      "databaseURL": "https://api.mlab.com/api/1/databases/shop/collections/"
    },
    "firebase": {
      "apiKey": "AIzaSyDZRAOrDErAaC-TCKbr4cMzaohsPR4sWgU",
      "authDomain": "este.firebaseapp.com",
      "databaseURL": "https://este.firebaseio.com",
      "storageBucket": "project-808488257248094054.appspot.com"
    },
    "user": {
      // andy pro
      "id" : "5856ffa4da7d1f056c935686",
      // faddey
      // "id" : "58a33d33793e920948fb163c",
    },
    "sentryUrl": "https://f297cec9c9654088b8ccf1ea9136c458@app.getsentry.com/77415"
  },
  "device": {
    "host": "",
    "isReactNative": false,
    "platform": ""
  },
  "intl": {
    "currentLocale": "en",
    "defaultLocale": "en",
    "initialNow": null,
    "locales": [
      "en",
      "ru",
      "ua",
    ],
  }
};

let { storage } = initialState.config
initialState.config.locally = storage === 'local' || storage === 'localfake'

export default initialState
