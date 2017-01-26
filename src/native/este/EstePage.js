// @flow
import React from 'react';
import { CenteredContainer } from '../app/components';
import { Platform, StyleSheet, Image } from 'react-native';
import { View, Text } from './../../common/components'

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

const EstePage = () => (
  <View>
    <Text style={styles.text}>
      {Platform.select({
        android: `
          Finango App based on Este.js
          Double tap R on your keyboard to reload
          Shake or press menu button for dev menu
        `,
        ios: `
          Este App
          Press CMD+R to reload
          Press CMD+D for debug menu
        `,
      })}
    </Text>
    <Image source={require('./Bananavarieties.jpg')} style={{width: 193, height: 110}} />
  </View>
);

export default EstePage;
