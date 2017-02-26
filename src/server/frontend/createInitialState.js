// @flow
import config from '../config';
import deviceReducer from '../../common/device/reducer';
import intlReducer from '../../common/intl/reducer';

const {
  appName,
  appVersion,
  storage,
  locally,
  mongolab,
  userId,
  defaultLocale,
  locales,
} = config;

const createInitialState = () => ({
  config: {
    appName,
    appVersion,
    storage,
    locally,
    mongolab,
    userId,
  },
  device: deviceReducer(),
  intl: {
    ...intlReducer(),
    currentLocale: defaultLocale,
    defaultLocale,
    locales,
  },
});

export default createInitialState;
