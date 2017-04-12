// import config from '../config'; // server & common config
import initialState from '../../common/initialState'
import appReducer from '../../common/app/reducer';
import messages from '../../browser/messages'

// const {
//   appName,
//   appVersion,
//   storage,
//   locally,
//   mongolab,
//   userId,
// } = config;

const { defaultLocale, locales } = initialState.app

const createInitialState = () => ({
  app: {
    ...appReducer(),
    currentLocale: defaultLocale,
    defaultLocale,
    locales,
    messages,
  },
  // config: {
  //   appName,
  //   appVersion,
  //   storage,
  //   locally,
  //   mongolab,
  //   userId,
  // },
});

export default createInitialState;
