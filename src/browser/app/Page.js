// @flow
import Header from './Header';
import React from 'react';
import titles from '../../common/app/menuTitles';
import { View, Text, Match } from '../../common/components';

export default Page = ({ component: Component, pattern, ...props }) => (
  <Match
    {...props}
    pattern={pattern}
    render={renderProps => ( // renderProps: isExact, location, params, pathname, pattern
      <View>
        {titles[pattern] &&
          <Header title={titles[pattern]} />
        }
        <Component {...renderProps} />
      </View>
    )}
  />
);
