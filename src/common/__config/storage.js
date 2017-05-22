// @flow weak
import { createTransform } from 'redux-persist';
import { pick } from '../__lib/utils';

import configureLocalDB from './localdb';

import config from '../config'

// TODO: Add redux-persist-migrate.

const paths = [
  ['app', ['currentTheme', 'categoryMapView', 'currentLocale']],
  // ['intl', ['currentLocale']],
];

if (config.storage === 'local') {
  paths.push(
    // ['categories'],
    ['user'],
    [configureLocalDB.filename]
  )
}

const transforms = [];
const whitelist = [];
// console.log(paths);
// Paths always override the initialState, because upcoming service workers.
// Paths are explicit, because upcoming migration.
paths.forEach(([feature, props]) => {
  whitelist.push(feature);
  if (!props) return;
  const inOut = state => pick(state, props);
  transforms.push(createTransform(inOut, inOut, { whitelist: [feature] }));
});

const configureStorage = (appName, storage) => ({
  debounce: 100,
  keyPrefix: `${appName}:`,
  storage,
  transforms,
  whitelist,
});

export default configureStorage;
