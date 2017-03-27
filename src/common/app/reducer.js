import * as dt from '../__lib/dateUtils'

const initialState = {
  currentTheme: 'defaultTheme',
  currentBalance: 0,
  error: null,
  notify: null,
  menuShown: false,
  online: false,
  started: false,
  date: dt.getCurrentDate(),
  categoryMapView: true,
  delHandler: null,
  statsMode: 'table',
  fetching: true,

  currentLocale: null,
  defaultLocale: null,
  locales: null,
  messages: null,

};

const setLocale = (state, locale) => {
  state.messages.setLanguage(locale)
  return { ...state, currentLocale: locale };
}

const reducer = (state=initialState, action) => {

  // Because it's called from the server/frontend/createInitialState.
  if (!action) return state;

  let { type, payload } = action

  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  // TODO: Refactor it. We don't want sticky strings.
  if (type.endsWith('_FAIL')) {
    // $FlowFixMe
    state = { ...state, error: payload.error };
  }

  if (type.startsWith('notify/')) {
    return { ...state, notify: action.opts.notify };
  }

  switch (type) {

    case 'APP_ERROR':
      return { ...state, error: payload.error };

    case 'APP_SHOW_MENU':
      return { ...state, menuShown: payload.menuShown };

    case 'APP_ONLINE':
      return { ...state, online: payload.online };

    case 'APP_START':
      return { ...state, started: true };

    case 'MONTH_CHANGED':
      return { ...state, date: payload };

    case 'SET_THEME':
      return { ...state, currentTheme: payload.theme };

    case 'persist/REHYDRATE':
      if (payload.app && payload.app.currentLocale)
        return setLocale(state, payload.app.currentLocale)
      return state

    case 'SET_CURRENT_LOCALE':
      return setLocale(state, payload)

    case 'CHANGE_CATEGORY_VIEW':
      return { ...state, categoryMapView: !state.categoryMapView };

    case 'SET_BALANCE':
      return { ...state, currentBalance: payload }

    case 'SET_DEL_HANDLER':
      return { ...state, delHandler: payload }

    case 'CHANGE_STATS_MODE':
      return { ...state, statsMode: payload }

    case 'epic/transactions/GET':
    case 'epic/categories/GET':
      return { ...state, fetching: true }

    case 'user/LOADED':
    case 'transactions/GOTTEN':
    case 'db/EXPORT':
      return { ...state, fetching: false }

    default:
      return state;

  }
};

export default reducer;
