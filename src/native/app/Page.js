// @flow
import Header from './Header';
import React from 'react';
import messages from '../messages';
import titles from '../../common/app/menuTitles';
// import { Alert, Container, RoundButton } from './components';
import { Alert, RoundButton } from './components';
// import { injectIntl, intlShape } from 'react-intl';
import { StyleSheet, View } from 'react-native';

// import { Match } from '../../common/app/components';
// import Match from '@components/Match';
import { Match } from '../../common/components';
import theme from './themes/initial'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
});

const Page = ({ component: Component, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => (
      <View style={styles.container}>
        {titles[pattern] &&
          <Header title={messages[titles[pattern]]} />
        }
        <Alert />
        <Component {...renderProps} />
        {pattern === '/' && <RoundButton to='/single' />}
      </View>
    )}
  />
);

export default Page;
