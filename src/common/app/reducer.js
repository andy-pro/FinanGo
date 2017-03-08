// @flow
import type { Action, AppState } from '../types';
import * as dt from '../__lib/dateUtils'

const initialState = {
  // baselineShown: false,
  currentTheme: 'defaultTheme',
  currentBalance: 0,
  error: null,
  menuShown: false,
  online: false,
  started: false,
  date: dt.getCurrentDate(),
  categoryMapView: true,
  delHandler: null,
  statsMode: 'table',
};

const reducer = (
  state: AppState = initialState,
  action: Action,
): AppState => {
  // Map all app errors into state.app.error.
  // In React Native, we show errors in one nicely animated unobtrusive alert.
  // In the browser, we prefer local error messages rendering.
  // TODO: Refactor it. We don't want sticky strings.
  if (action.type.endsWith('_FAIL')) {
    // $FlowFixMe
    state = { ...state, error: action.payload.error };
  }

  switch (action.type) {

    case 'APP_ERROR':
      return { ...state, error: action.payload.error };

    case 'APP_SHOW_MENU':
      return { ...state, menuShown: action.payload.menuShown };

    case 'APP_ONLINE':
      return { ...state, online: action.payload.online };

    case 'APP_START':
      return { ...state, started: true };

    case 'MONTH_CHANGED':
      return { ...state, date: action.payload };

    case 'SET_THEME':
      return { ...state, currentTheme: action.payload.theme };

    case 'CHANGE_CATEGORY_VIEW':
      return { ...state, categoryMapView: !state.categoryMapView };

    case 'SET_BALANCE':
      return { ...state, currentBalance: action.payload }

    case 'SET_DEL_HANDLER':
      return { ...state, delHandler: action.payload }

    case 'CHANGE_STATS_MODE':
      return { ...state, statsMode: action.payload }

    default:
      return state;

  }
};

export default reducer;
