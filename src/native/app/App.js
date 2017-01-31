// @flow
import type { State } from '../../common/types';
import Menu from './Menu';
import Page from './Page';
import React from 'react';
import SideMenu from 'react-native-side-menu';
import start from '../../common/app/start';
import { Container } from './components';
import { Match, Redirect } from 'react-router';
import { Platform, StatusBar } from 'react-native';
import { appShowMenu } from '../../common/app/actions';
import { compose } from 'ramda';
import { connect } from 'react-redux';

// Pages
import HomePage from '../../common/home/HomePage';
import NewTransactionPage from '../../common/transactions/NewTransactionPage';
import AddGroupPage from '../transactions/AddGroupPage';
import EstePage from '../este/EstePage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';
import OfflinePage from '../offline/OfflinePage';
import SignInPage from '../auth/SignInPage';
import TodosPage from '../todos/TodosPage';
import NotFoundPage from '../notfound/NotFoundPage';

const App = ({ appMenuShown, appShowMenu, appStarted }) => {
  // TODO: Add splash screen.
  if (!appStarted) return null;
  return (
    <Container inverse>
      {Platform.OS === 'ios' && // Because iOS StatusBar is an overlay.
        <StatusBar hidden={appMenuShown} />
      }
      <SideMenu
        isOpen={appMenuShown}
        menu={<Menu />}
        onChange={appShowMenu}
      >
        <Page exactly pattern="/" component={HomePage} />
        <Page pattern="/single" component={NewTransactionPage} />
        <Page pattern="/group" component={AddGroupPage} />
        <Page pattern="/este" component={EstePage} />
        <Page pattern="/intl" component={IntlPage} />
        <Page pattern="/offline" component={OfflinePage} />
        <Page pattern="/signin" component={SignInPage} />
        <Page pattern="/todos" component={TodosPage} />
        <Page pattern="/broken" component={NotFoundPage} />
        <Page authorized pattern="/me" component={MePage} />
        {/* Miss does't work in React Native for some reason. */}
        {/* <Miss render={() => <Redirect to="/" />} /> */}
        {/* <Miss component={NotFoundPage} /> */}
        <Match
          pattern="/"
          render={({ location: { pathname } }) => {
            const urls = ['/', '/single', '/group', '/este', '/intl', '/offline', '/signin', '/todos', '/broken', '/me'];
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

App.propTypes = {
  appMenuShown: React.PropTypes.bool.isRequired,
  appShowMenu: React.PropTypes.func.isRequired,
  appStarted: React.PropTypes.bool.isRequired,
};

export default compose(
  start,
  connect(
    (state: State) => ({
      appMenuShown: state.app.menuShown,
      appStarted: state.app.started,
    }),
    { appShowMenu },
  ),
)(App);
