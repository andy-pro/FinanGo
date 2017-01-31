// @flow weak
import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { epics as authEpics } from './auth/actions';
import { epics as usersEpics } from './users/actions';
import { epics as transactionsEpics } from './transactions/actions';

const epics = [
  ...appEpics,
  ...authEpics,
  ...usersEpics,
  ...transactionsEpics,
];

const configureEpics = (deps: Object) => (action$, { getState }) =>
  combineEpics(...epics)(action$, { ...deps, getState });

export default configureEpics;
