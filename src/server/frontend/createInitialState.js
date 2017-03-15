// @flow
import config from '../config';
import deviceReducer from '../../common/device/reducer';
import appReducer from '../../common/app/reducer';
import messages from '../../browser/messages'

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
  app: {
    ...appReducer(),
    currentLocale: defaultLocale,
    defaultLocale,
    locales,
    messages,
  },
  config: {
    appName,
    appVersion,
    storage,
    locally,
    mongolab,
    userId,
  },
  device: deviceReducer(),
});

export default createInitialState;
