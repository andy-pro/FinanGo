// @flow
import React from 'react';
import Header from './Header';
import { View, Text, Match } from '../../common/__components';

export default Page = ({ component: Component, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => ( // renderProps: isExact, location, params, pathname, pattern
      <View>
        <Header pattern={pattern} />
        <Component {...renderProps} />
      </View>
    )}
  />
);
