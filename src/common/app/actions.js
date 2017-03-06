import { REHYDRATE } from 'redux-persist/constants';

// import { getUserData } from '../user/actions'
import * as api from '../__api'
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

export const changeMonth = (date=dt.getCurrentDate()) => ({
  type: 'MONTH_CHANGED',
  payload: date
});

export const setTheme = theme => ({
  type: 'SET_THEME',
  payload: { theme },
});

export const changeCategoryView = () => ({
  type: 'CHANGE_CATEGORY_VIEW',
})

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* start application after rehydrate data */
// const appStartedFinanGoEpic = action$ => action$.ofType(REHYDRATE).map(getUserData)
const appStartedFinanGoEpic = action$ => {
/* store is:
  config: {appName, appVersion, locally, mongolab: {...}, storage, userId},
  getState(), getUid(), now(), storageEngine, uuid()
*/

  return  action$.ofType(REHYDRATE)
    // payload - is a data from REHYDRATE, need for restore from localdb to store
    .switchMap(({ payload }) => api.getUserData({
      type: 'USER_LOADED',
      payload
    }))
}

export const epics = [
  appStartedFinanGoEpic,
];
