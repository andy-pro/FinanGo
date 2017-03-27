// @flow
// www.andrewsouthpaw.com/2015/02/08/environment-variables/
import nconf from 'nconf';

// Use less-terrible separator character, stackoverflow.com/questions/25017495
nconf.env('__');

// For local development, we can override defaults easily.
nconf.overrides(require('../common/config').default)

// Remember, never put secrets in the source code. Use environment variables for
// production or config.json for development instead.
nconf.defaults({
  // appName: require('../../package.json').name,
  // Use appVersion defined in gulp env task or Heroku dyno metadata.
  appVersion: process.env.appVersion || process.env.HEROKU_SLUG_COMMIT,
  googleAnalyticsId: 'UA-XXXXXXX-X',
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  // Enable hot reload on remote device. Note it prevents offline testing,
  // because it depends on ip.address(), which doesn't work with disabled wifi.
  // How do we access a website running on localhost from mobile browser?
  // stackoverflow.com/questions/3132105
  remoteHotReload: true,
});

export default nconf.get();
