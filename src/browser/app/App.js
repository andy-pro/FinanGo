// @flow
import React, { Component } from 'react';
import * as themes from './themes';
import Page from './Page';
// import Header from './Header';
// import Footer from './Footer';
import Menu from './Menu';
import Helmet from 'react-helmet';
import favicon from '../../common/app/favicon';
// import start from '../../common/app/start';
// import { Match } from '../../common/__components';
import { Redirect, Miss } from 'react-router';

import { appStart, appStop } from '../../common/app/actions';

import { connect } from 'react-redux';

import messages from '../messages'

import {
  // Baseline,
  Box,
  Container,
  ThemeProvider,
} from './components';

// Pages
import TransactionsPage from '../../common/transactions/TransactionsPage';
import CategoriesPage from '../../common/categories/CategoriesPage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import NotFoundPage from '../notfound/NotFoundPage';

// const App = ({ currentLocale, theme, themeName }) => (
class App extends Component {

  // static contextTypes = {
  //   router: React.PropTypes.object, // Redux store.
  // }

  componentDidMount() {
    // Must be called after the initial render to match server rendered HTML.
    this.props.appStart();
  }

  componentWillUnmount() {
    // App is rerended on hot reload, therefore we need a proper cleanup.
    this.props.appStop();
  }

  render() {
    const { currentLocale, theme, themeName } = this.props
    messages.setLanguage(currentLocale);
    // console.log('%cApp render', 'color:blue;font-weight:bold', 'locale:', currentLocale, this.props)
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
          <Box marginLeft={6} padding={1}>
            <Page pattern="/" exactly component={TransactionsPage} />
            <Page pattern="/single" component={TransactionsPage} />
            <Page pattern="/group" component={TransactionsPage} />
            <Page pattern="/income" component={TransactionsPage} />
            <Page pattern="/categories" component={CategoriesPage} />
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
  (state) => ({
    currentLocale: state.intl.currentLocale,
    themeName: state.app.currentTheme,
    theme: themes[state.app.currentTheme] || themes.defaultTheme,
  }),
  { appStart, appStop }
)(App);
