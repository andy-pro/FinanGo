// @flow
import React from 'react';
import Header from './Header';

import { Alert } from './components';
import { View, Match } from '../../common/__components';
import Popup from '../../common/__components/Popup';
import RoundButton from '../../common/__components/native/RoundButton';
import { mainCSS } from '../../common/__themes'

const Page = ({ component: Component, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => (
      <View style={mainCSS.root}>
        <Header pattern={pattern} />
        <Alert />
        <Component {...renderProps} />
        {pattern === '/' && <RoundButton to='/single' />}
        <Popup />
      </View>
    )}
  />
);

export default Page;
