// @flow
import React from 'react';
import Header from './Header';
import { View, Text, Match } from '../../common/__components';

import { mainStyles } from '../../common/__themes'

export default Page = ({ component: Component, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => ( // renderProps: isExact, location, params, pathname, pattern
      <View style={mainStyles.root}>
        <Header pattern={pattern} />
        <Component {...renderProps} />
      </View>
    )}
  />
);
