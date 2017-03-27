// @flow weak
import 'rxjs';
import { combineEpics } from 'redux-observable';

import { epics as appEpics } from '../app/actions';
import { epics as categoriesEpics } from '../categories/actions';
import { epics as transactionsEpics } from '../transactions/actions';
import { epics as backupEpics } from '../backup/actions'

const epics = [
  ...appEpics,
  ...categoriesEpics,
  ...transactionsEpics,
  ...backupEpics,
];

const configureEpics = deps => (action$, { dispatch, getState }) =>
  combineEpics(...epics)(action$, { ...deps, dispatch, getState });

export default configureEpics;
