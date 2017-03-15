// @flow
import React from 'react';
import Header from '../app/Header'
import { Link } from '../app/components';
import { View } from '../../common/__components'
import { mainCSS } from '../../common/__themes'

const NotFoundPage = () => (
  <View style={mainCSS.root}>
    <Header pattern='/notfound' />
    <Link exactly to="/">
      back to home
    </Link>
  </View>
);

export default NotFoundPage
