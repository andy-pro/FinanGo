// @flow
import React, { Component } from 'react';
import * as themes from './themes';
import Page from './Page';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import Helmet from 'react-helmet';
import favicon from '../../common/app/favicon';
// import start from '../../common/app/start';
import Match from '../../common/components/Match';
import { Redirect, Miss } from 'react-router';

import { appStart, appStop } from '../../common/app/actions';
// import { compose } from 'ramda';
import { connect } from 'react-redux';

import messages from '../messages'

import {
  Baseline,
  Box,
  Container,
  ThemeProvider,
} from './components';

// Pages
import HomePage from '../../common/home/HomePage';
import NewTransactionPage from '../../common/transactions/NewTransactionPage';

import AddGroupPage from '../../common/transactions/AddGroupPage';
import FieldsPage from '../fields/FieldsPage';
import EstePage from '../este/EstePage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import NotFoundPage from '../notfound/NotFoundPage';
import OfflinePage from '../offline/OfflinePage';
// import SignInPage from '../auth/SignInPage';
import TodosPage from '../todos/TodosPage';

// const App = ({ currentLocale, theme, themeName }) => (
class App extends Component {

  componentDidMount() {
    const { appStart } = this.props;
    // Must be called after the initial render to match server rendered HTML.
    appStart();
  }

  componentWillUnmount() {
    const { appStop } = this.props;
    // App is rerended on hot reload, therefore we need a proper cleanup.
    appStop();
  }

  render() {
    const { currentLocale, theme, themeName } = this.props
    messages.setLanguage(currentLocale);
    console.log('%cApp render', 'color:blue;font-weight:bold', 'locale:', currentLocale)
    return (
      <ThemeProvider
        key={themeName} // Enforce rerender.
        theme={theme}
      >
        <Baseline lineHeight={theme.typography.lineHeight}>
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
            <Menu width={theme.menu.width}/>
            <Box marginLeft={theme.menu.width} padding={1}>
              <Page exactly pattern="/" component={HomePage} />
              <Page pattern="/single" component={NewTransactionPage} />
              <Page pattern="/group" component={NewTransactionPage} />
              <Page pattern="/income" component={NewTransactionPage} />
              <Match pattern="/este" component={EstePage} />
              <Match pattern="/todos" component={TodosPage} />
              <Match pattern="/fields" component={FieldsPage} />
              <Match pattern="/intl" component={IntlPage} />
              <Match pattern="/offline" component={OfflinePage} />
              <Match authorized pattern="/me" component={MePage} />
              <Miss component={NotFoundPage} />
            </Box>
            <Footer />
          </Container>
        </Baseline>
      </ThemeProvider>
    );
  }

}

export default connect(
  (state) => ({
    currentLocale: state.intl.currentLocale,
    themeName: state.app.currentTheme,
    theme: themes[state.app.currentTheme] || themes.defaultTheme,
  }),
  { appStart, appStop }
)(App);
