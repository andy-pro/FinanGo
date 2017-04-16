// @flow
import React from 'react';
import Header from './Header';
import { View, Text, Match } from '../../common/__components';
// import { Popup } from '../../common/__components/Popup';
import { mainCSS } from '../../common/__themes'

export default Page = ({ component: Component, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => ( // renderProps: isExact, location, params, pathname, pattern
      <View style={mainCSS.root}>
        <Header pattern={pattern} />
        <Component {...renderProps} />
      </View>
    )}
  />
);
