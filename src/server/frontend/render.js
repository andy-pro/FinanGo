// @flow
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { createServerRenderContext, ServerRouter } from 'react-router';
import { Provider as Redux } from 'react-redux';
import { Provider as Fela } from 'react-fela';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

import Html from './Html';
import App from '../../browser/app/App';
import ServerFetchProvider from './ServerFetchProvider';
import configureFela from '../../common/__config/fela';
import configureStore from '../../common/__config/store';
import createInitialState from './createInitialState';
import config from '../config';

const settleAllWithTimeout = promises => Promise
  .all(promises.map(p => p.reflect()))
  // $FlowFixMe
  .each((inspection) => {
    if (inspection.isFulfilled()) return;
    console.log('Server fetch failed:', inspection.reason());
  })
  .timeout(15000) // Do not block rendering forever.
  .catch((error) => {
    // $FlowFixMe
    if (error instanceof Promise.TimeoutError) {
      console.log('Server fetch timeouted:', error);
      return;
    }
    throw error;
  });

// createInitialState loads files, so it must be called once.
const initialState = createInitialState();

const getHost = req =>
  `${req.headers['x-forwarded-proto'] || req.protocol}://${req.headers.host}`;

const getLocale = (req, app) => process.env.IS_SERVERLESS
  ? app.defaultLocale
  : req.acceptsLanguages(app.locales) || app.defaultLocale;

const createStore = req => {
  let { app } = initialState,
      currentLocale = getLocale(req, app);
  app.messages.setLanguage(currentLocale);
  return configureStore({
    initialState: {
      ...initialState,
      app: {
        ...app,
        currentLocale,
        host: getHost(req),
      }
    },
  });
}

const renderBody = (store, context, location, fetchPromises) => {
  const felaRenderer = configureFela();
  const html = renderToString(
    <Redux store={store}>
      <Fela renderer={felaRenderer}>
        <ServerFetchProvider promises={fetchPromises}>
          <ServerRouter context={context} location={location}>
            <App />
          </ServerRouter>
        </ServerFetchProvider>
      </Fela>
    </Redux>,
  );
  const helmet = Helmet.rewind();
  const css = felaRenderer.renderToString();
  return { html, helmet, css };
};

const renderScripts = (state, appJsFilename) =>
  // github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  // TODO: Switch to CSP, https://github.com/este/este/pull/731
  ` <script>
      window.__INITIAL_STATE__ = ${serialize(state)};
    </script>
    <script src="${appJsFilename}"></script>
  `;

const renderHtml = (state, body) => {
  const {
    styles: { app: appCssFilename },
    javascript: { app: appJsFilename },
  } = global.webpackIsomorphicTools.assets();
  if (!config.isProduction) {
    global.webpackIsomorphicTools.refresh();
  }

  // remove messages from state
  delete state.app.messages

  const scripts = renderScripts(state, appJsFilename);
  return '<!DOCTYPE html>' + renderToStaticMarkup(
    <Html
      appCssFilename={appCssFilename}
      bodyCss={body.css}
      bodyHtml={`<div id="app">${body.html}</div>${scripts}`}
      googleAnalyticsId={config.googleAnalyticsId}
      helmet={body.helmet}
      isProduction={config.isProduction}
    />,
  );
};

// react-router.now.sh/ServerRouter
const render = async (req, res, next) => {
  try {
    const context = createServerRenderContext();
    const store = createStore(req);
    const fetchPromises = [];

    let body = renderBody(store, context, req.url, fetchPromises);
    const result = context.getResult();

    if (result.redirect) {
      res.redirect(301, result.redirect.pathname + result.redirect.search);
      return;
    }

    if (result.missed) {
      body = renderBody(store, context, req.url);
      const html = renderHtml(store.getState(), body);
      res.status(404).send(html);
      return;
    }

    if (!process.env.IS_SERVERLESS && fetchPromises.length > 0) {
      await settleAllWithTimeout(fetchPromises);
      body = renderBody(store, context, req.url);
    }

    const html = renderHtml(store.getState(), body);
    res.status(200).send(html);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default render;
