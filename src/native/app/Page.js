// @flow
import Header from './Header';
import React from 'react';
import linksMessages from '../../common/app/linksMessages';
import { Alert, Container } from './components';
import { injectIntl, intlShape } from 'react-intl';
import { StyleSheet, View } from 'react-native';

// import { Match } from '../../common/app/components';
import Match from '@components/Match';
import RoundButton from '@components/RoundButton'
import theme from '@themes/initial'

const titles = {
  '/': linksMessages.home,
  '/este': linksMessages.este,
  '/intl': linksMessages.intl,
  '/offline': linksMessages.offline,
  '/signin': linksMessages.signIn,
  '/todos': linksMessages.todos,
  '/broken': linksMessages.broken,
  '/me': linksMessages.me,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
});

const Page = ({ component: Component, intl, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => (
      <View style={styles.container}>
        {titles[pattern] &&
          <Header title={intl.formatMessage(titles[pattern])} />
        }
        <Alert />
        <Component {...renderProps} />
        <RoundButton />
      </View>
    )}
  />
);

Page.propTypes = {
  component: React.PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  pattern: React.PropTypes.string.isRequired,
};

export default injectIntl(Page);
