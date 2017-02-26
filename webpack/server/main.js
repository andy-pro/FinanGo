import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import makeWebpackConfig from '../makeConfig';
import constants from '../constants';
import express from 'express';

const app = express();

const webpackConfig = makeWebpackConfig({ isDevelopment: true });
const compiler = webpack(webpackConfig);

app.use(webpackDev(compiler, {
  headers: {'Access-Control-Allow-Origin': '*'},
  noInfo: true, // Display no info to console (only warnings and errors)
  publicPath: webpackConfig.output.publicPath,
  // stats: {
  //   // see https://webpack.github.io/docs/node.js-api.html
  //   colors: true,
  //   cached: false
  //   // modules: false
  //   // chunks: false
  // },
  // stats: 'verbose', // output all the information webpack has
}));

app.use(webpackHot(compiler));

app.listen(constants.HOT_RELOAD_PORT);
