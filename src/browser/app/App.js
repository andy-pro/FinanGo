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
// import { compose } from 'ramda';
import { connect } from 'react-redux';

import messages from '../messages'

import {
  // Baseline,
  Box,
  Container,
  ThemeProvider,
} from './components';

// Pages
// import HomePage from '../../common/home/HomePage';
import TransactionsPage from '../../common/transactions/TransactionsPage';

// import AddGroupPage from '../../common/transactions/AddGroupPage';
import CategoriesPage from '../../common/categories/CategoriesPage';
import TodosPage from '../todos/TodosPage';
import FieldsPage from '../fields/FieldsPage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import NotFoundPage from '../notfound/NotFoundPage';
import OfflinePage from '../offline/OfflinePage';
// import SignInPage from '../auth/SignInPage';

// const App = ({ currentLocale, theme, themeName }) => (
class App extends Component {

  // static contextTypes = {
  //   router: React.PropTypes.object, // Redux store.
  // }

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
            <Page pattern="/todos" component={TodosPage} />
            <Page pattern="/fields" component={FieldsPage} />
            <Page pattern="/settings" component={IntlPage} />
            <Page pattern="/offline" component={OfflinePage} />
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
