// @flow
import React, { Component } from 'react';
import { Redirect, Miss } from 'react-router';
import { connect } from 'react-redux';
import { ThemeProvider } from 'react-fela';
import Helmet from 'react-helmet';

import * as themes from './themes';
import Page from './Page';

import Menu from '../../common/__components/Menu';
import favicon from '../../common/app/favicon';
import { appStart, appStop } from '../../common/app/actions';
import showNotify from '../../common/__components/notify';

import { Box, Container } from './components';

// Pages
import TransactionsPage from '../../common/transactions/TransactionsPage';
import CategoriesPage from '../../common/categories/CategoriesPage';
import BackupPage from '../../common/backup/BackupPage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import NotFoundPage from '../notfound/NotFoundPage';

class App extends Component {

  componentDidMount() {
    // Must be called after the initial render to match server rendered HTML.
    this.props.appStart();
  }

  componentWillUnmount() {
    // App is rerended on hot reload, therefore we need a proper cleanup.
    this.props.appStop();
  }

  shouldComponentUpdate({ notify }, nextState) {
    if (notify !== this.props.notify) {
      showNotify(notify, this.props.messages)
      return false
    }
    return true
  }

  render() {
    const { theme, themeName, currentLocale } = this.props
    // console.log('%cApp render', 'color:blue;font-weight:bold', currentLocale)
    return (
      <ThemeProvider
        key={themeName} // Enforce rerender.
        theme={theme}
      >
        <Container>
          <Helmet
            htmlAttributes={{ lang: currentLocale }}
            meta={[
              // v4-alpha.getbootstrap.com/getting-started/introduction/#starter-template
              { charset: 'utf-8' },
              { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
              { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
              ...favicon.meta,
            ]}
            link={[
              ...favicon.link,
            ]}
          />
          <Menu />
          <Box marginLeft={6} padding={1} position='relative'>
            <Page pattern="/" exactly component={TransactionsPage} />
            <Page pattern="/single" component={TransactionsPage} />
            <Page pattern="/group" component={TransactionsPage} />
            <Page pattern="/income" component={TransactionsPage} />
            <Page pattern="/delete" component={TransactionsPage} />
            <Page pattern="/categories" component={CategoriesPage} />
            <Page pattern="/backup" component={BackupPage} />
            <Page pattern="/settings" component={IntlPage} />
            <Page authorized pattern="/me" component={MePage} />
            <Miss component={NotFoundPage} />
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

}

export default connect(
  ({ app }) => ({
    notify: app.notify,
    messages: app.messages,
    currentLocale: app.currentLocale,
    themeName: app.currentTheme,
    theme: themes[app.currentTheme] || themes.defaultTheme,
  }),
  { appStart, appStop }
)(App);
