// @flow
import Header from './Header';
import React from 'react';
import titles from '../../common/app/menuTitles';
import { Alert, Container, RoundButton } from './components';
import { injectIntl, intlShape } from 'react-intl';
import { StyleSheet, View } from 'react-native';

// import { Match } from '../../common/app/components';
import Match from '@components/Match';
import theme from '@themes/initial'

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
        {pattern === '/' && <RoundButton to='/single' />}
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
