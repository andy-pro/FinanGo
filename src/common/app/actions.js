import { REHYDRATE } from 'redux-persist/constants';

import { getUserData, getUserData2 } from '../user/actions'
import * as dt from '../__lib/dateUtils'

export const appError = (error: Object) => ({
  type: 'APP_ERROR',
  payload: { error },
});

export const appOnline = (online: boolean) => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const appShowMenu = (menuShown: boolean) => ({
  type: 'APP_SHOW_MENU',
  payload: { menuShown },
});

// Called on componentDidMount aka only at the client (browser or native).
export const appStart = () => ({
  type: 'APP_START',
});

export const appStop = () => ({
  type: 'APP_STOP',
});

export const changeMonth = date => ({
  type: 'MONTH_CHANGED',
  payload: date
});

export const setMonthToNow = () => ({
  type: 'MONTH_CHANGED',
  payload: dt.getCurrentDate()
});

export const setTheme = theme => ({
  type: 'SET_THEME',
  payload: { theme },
});

export const changeCategoryView = () => ({
  type: 'CHANGE_CATEGORY_VIEW',
})

export const setCurrentBalance = balance => ({
  type: 'SET_CURRENT_BALANCE',
  payload: balance
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* start application after rehydrate data */
// const appStartedFinanGoEpic = action$ => action$.ofType(REHYDRATE).map(getUserData)
const appStartedFinanGoEpic = action$ => action$.ofType(REHYDRATE).switchMap(getUserData)

export const epics = [
  appStartedFinanGoEpic,
];
