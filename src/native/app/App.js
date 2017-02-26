// @flow
import React, { Component } from 'react';
// import type { State } from '../../common/types';
import Menu from './Menu';
import Page from './Page';
import SideMenu from 'react-native-side-menu';
// import start from '../../common/app/start';
import { Container } from './components';
import { Match, Redirect } from 'react-router';

// import { Platform, StatusBar } from 'react-native';
// {Platform.OS === 'ios' && // Because iOS StatusBar is an overlay.
//   <StatusBar hidden={appMenuShown} />
// }

import { appStart, appStop, appShowMenu } from '../../common/app/actions';

import { connect } from 'react-redux';

import messages from '../messages'

// Pages
// import HomePage from '../../common/home/HomePage';
import TransactionsPage from '../../common/transactions/TransactionsPage';
// import NewTransactionPage from '../../common/transactions/NewTransactionPage';
import CategoriesPage from '../../common/categories/CategoriesPage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';

// import TestPage from '../../common/demo/ListViewDemo';

// import OfflinePage from '../offline/OfflinePage';
// import TodosPage from '../todos/TodosPage';
// import NotFoundPage from '../notfound/NotFoundPage';

class App extends Component {
// const App = ({ appMenuShown, appShowMenu, appStarted }) => {
  // TODO: Add splash screen.

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
    if (!this.props.appStarted) return null;
    const { appMenuShown, appShowMenu, currentLocale } = this.props;
    messages.setLanguage(currentLocale);

    // console.log('*******************');
    // console.log('*    Start App    *');
    // console.log('*******************');

    return (
      <Container inverse>

        <SideMenu
          isOpen={appMenuShown}
          menu={<Menu />}
          onChange={appShowMenu}
        >
          <Page exactly pattern="/" component={TransactionsPage} />
          <Page pattern="/single" component={TransactionsPage} />
          <Page pattern="/group" component={TransactionsPage} />
          <Page pattern="/income" component={TransactionsPage} />
          <Page pattern="/categories" component={CategoriesPage} />
          <Page pattern="/settings" component={IntlPage} />
          <Page authorized pattern="/me" component={MePage} />
          {/* Miss does't work in React Native for some reason. */}
          {/* <Miss render={() => <Redirect to="/" />} /> */}
          {/* <Miss component={NotFoundPage} /> */}
          <Match
            pattern="/"
            render={({ location: { pathname } }) => {
              const urls = ['/', '/single', '/group', '/income', '/categories', '/settings', '/me'];
              if (urls.indexOf(pathname) !== -1) return null;
              return (
                <Redirect to="/" />
              );
            }}
          />
        </SideMenu>
      </Container>
    );
  };

}

export default connect(
  (state) => ({
    appMenuShown: state.app.menuShown,
    appStarted: state.app.started,
    // intl: state.intl,
    currentLocale: state.intl.currentLocale,
  }),
  { appStart, appStop, appShowMenu }
)(App);
