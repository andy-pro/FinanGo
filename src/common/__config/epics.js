// @flow weak
import 'rxjs';
import { combineEpics } from 'redux-observable';

import { epics as appEpics } from '../app/actions';
import { epics as categoriesEpics } from '../categories/actions';
import { epics as transactionsEpics } from '../transactions/actions';
import backupEpics from '../backup/epics'

const epics = [
  ...appEpics,
  ...categoriesEpics,
  ...transactionsEpics,
  ...backupEpics,
];

const configureEpics = (deps: Object) => (action$, { getState }) =>
  combineEpics(...epics)(action$, { ...deps, getState });

export default configureEpics;
