const initialState = {
  currentLocale: null,
  defaultLocale: null,
  initialNow: null,
  locales: null,
  messages: null,
};

const reducer = (state = initialState, action) => {
  // Because it's called from the createInitialState.
  if (!action) return state;

  switch (action.type) {

    case 'SET_CURRENT_LOCALE': {
      return { ...state, currentLocale: action.payload.locale };
    }

    default:
      return state;

  }
};

export default reducer;
