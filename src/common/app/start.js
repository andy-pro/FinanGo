// @flow
import type { State } from '../../common/types';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { appStart, appStop } from './actions';
import { getTransactions } from './../transactions/actions';

const start = (WrappedComponent: Function) => {
  class Start extends React.Component {

    static propTypes = {
      intl: React.PropTypes.object.isRequired,
      appStart: React.PropTypes.func.isRequired,
      appStop: React.PropTypes.func.isRequired,
    };

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

    shouldComponentUpdate(nextProps, nextState) {
      // console.log('nextProps', nextProps);
      const viewer = nextProps.viewer
      if (viewer && !this.props.viewer) {
        console.log('GET_TRANSACTIONS, USER_ID:', viewer.id);
        this.props.getTransactions(viewer.id)
        return false
      }
      return true
    }

    render() {
      const { intl, ...props } = this.props;
      const { currentLocale, defaultLocale, initialNow, messages } = intl;
      console.log('%cRender app', 'color:#480;font-weight:bold;');
      return (
        <IntlProvider
          defaultLocale={defaultLocale}
          initialNow={initialNow}
          key={currentLocale} // github.com/yahoo/react-intl/issues/234#issuecomment-163366518
          locale={currentLocale}
          messages={messages[currentLocale]}
        >
          <WrappedComponent {...props} />
        </IntlProvider>
      );
    }

  }

  return connect(
    (state: State) => ({
      intl: state.intl,
      viewer: state.users.viewer,
    }),
    { appStart, appStop, getTransactions },
  )(Start);
};


export default start;
