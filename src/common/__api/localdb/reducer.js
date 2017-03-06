import constants from './constants'

const initialState = {
  transactions: []
}

const reducer = (state=initialState, action) => {

  switch (action.type) {

    case constants.STATE:
      // console.log('db reducer!!!', JSON.stringify(action.payload));
      return { ...state, ...action.payload }

    default:
      return state;

  }

};

export default reducer;
