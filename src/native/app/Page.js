// @flow
import React from 'react';
import Header from './Header';

import { Alert } from './components';
import { View, Match } from '../../common/__components';
import RoundButton from '../../common/__components/RoundButton';
import { mainStyles } from '../../common/__themes'

const Page = ({ component: Component, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => (
      <View style={mainStyles.root}>
        <Header pattern={pattern} />
        <Alert />
        <Component {...renderProps} />
        {pattern === '/' && <RoundButton to='/single' />}
      </View>
    )}
  />
);

export default Page;
