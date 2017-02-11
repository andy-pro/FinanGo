import { REHYDRATE } from 'redux-persist/constants';

// import { getNewestUserData } from '../transactions/actions'

import { getUserData } from '../user/actions'
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

export const appStarted = () => ({
  type: 'APP_STARTED',
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

export const toggleBaseline = () => ({
  type: 'TOGGLE_BASELINE',
});

export const setTheme = (theme) => ({
  type: 'SET_THEME',
  payload: { theme },
});

const appStartEpic = (action$) =>
  action$.ofType(REHYDRATE)
    .map(appStarted);

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

const appStartedFinanGoEpic = action$ =>
  action$.ofType('APP_STARTED')
    // .switchMap(getNewestUserData)
    .switchMap(getUserData)

//
// const userLoadedEpic = action$ =>
//   action$.ofType('USER_LOADED')
//     .mergeMap(action => Observable.of({ type: 'GET_TRANSACTIONS', payload: mockData[1] }))

export const epics = [
  appStartEpic,
  // appStartedFirebaseEpic,
  appStartedFinanGoEpic,
  // userLoadedEpic,
];

/*
const appStartedFirebaseEpic = (action$, deps) => {
  const { firebase, firebaseAuth, getState } = deps;

  const appOnline$ = Observable.create((observer) => {
    const onValue = (snap) => {
      const online = snap.val();
      if (online === getState().app.online) return;
      observer.next(appOnline(online));
    };
    firebase.child('.info/connected').on('value', onValue);
    return () => {
      firebase.child('.info/connected').off('value', onValue);
    };
  });

  // firebase.google.com/docs/reference/js/firebase.auth.Auth#onAuthStateChanged
  const onAuth$ = Observable.create((observer) => {
    const unsubscribe = firebaseAuth().onAuthStateChanged((firebaseUser) => {
      observer.next(onAuth(firebaseUser));
    });
    return unsubscribe;
  });

  const signInAfterRedirect$ = Observable.create((observer) => {
    let unsubscribed = false;
    firebaseAuth().getRedirectResult()
      .then(({ user: firebaseUser }) => {
        if (unsubscribed || !firebaseUser) return;
        observer.next(signInDone(firebaseUser));
      })
      .catch((error) => {
        if (unsubscribed) return;
        observer.error(signInFail(error));
      });
    return () => {
      unsubscribed = true;
    };
  });

  const streams = [
    appOnline$,
    onAuth$,
  ];

  if (process.env.IS_BROWSER) {
    streams.push(signInAfterRedirect$);
  }

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable
      .merge(...streams)
      // takeUntil unsubscribes all merged streams on APP_STOP.
      .takeUntil(
        action$.filter((action: Action) => action.type === 'APP_STOP'),
      ),
    );
};
*/
