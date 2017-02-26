import constants from './constants'

const initialState = {
  transactions: []
}

const reducer = ( state = initialState, action ) => {

  switch (action.type) {

    case constants.STATE:
      return { ...state, ...action.payload }

    default:
      return state;

  }

};

export default reducer;
