// @flow
import React, { Component } from 'react';
// import { Match, Redirect } from 'react-router';
import { connect } from 'react-redux';
// import SideMenu from 'react-native-side-menu';
import SideMenu from 'react-native-drawer';

import Page from './Page';
import { Container } from './components';
import Menu from '../../common/__components/Menu';

// import { Platform, StatusBar } from 'react-native';
// {Platform.OS === 'ios' && // Because iOS StatusBar is an overlay.
//   <StatusBar hidden={appMenuShown} />
// }

import { appStart, appStop, appShowMenu } from '../../common/app/actions';
import showNotify from '../../common/__components/notify';

// Pages
import TransactionsPage from '../../common/transactions/TransactionsPage';
import CategoriesPage from '../../common/categories/CategoriesPage';
import BackupPage from '../backup/BackupPage';
import IntlPage from '../intl/IntlPage';
import MePage from '../me/MePage';

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
    if (!this.props.appStarted) return null;
    const { appMenuShown, appShowMenu } = this.props;

    // console.log('*******************');
    // console.log('*    Start App    *');
    // console.log('*******************');

    return (
      <Container inverse>

        <SideMenu
          open={appMenuShown}
          content={<Menu />}
          openDrawerOffset={0.3}
          onOpen={() => appShowMenu(true)}
          onClose={() => appShowMenu(false)}
          tapToClose
        >
          <Page exactly pattern="/" component={TransactionsPage} />
          <Page pattern="/single" component={TransactionsPage} />
          <Page pattern="/group" component={TransactionsPage} />
          <Page pattern="/income" component={TransactionsPage} />
          <Page pattern="/delete" component={TransactionsPage} />
          <Page pattern="/categories" component={CategoriesPage} />
          <Page pattern="/backup" component={BackupPage} />
          <Page pattern="/settings" component={IntlPage} />
          <Page authorized pattern="/me" component={MePage} />
        </SideMenu>
      </Container>
    );
  };

}

export default connect(
  ({ app }) => ({
    notify: app.notify,
    messages: app.messages,
    appMenuShown: app.menuShown,
    appStarted: app.started,
    // currentLocale: app.currentLocale,
  }),
  { appStart, appStop, appShowMenu }
)(App);
