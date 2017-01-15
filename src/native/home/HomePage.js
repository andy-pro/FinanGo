// @flow
import React from 'react';
import { CenteredContainer, Text } from '../app/components';
import { Platform, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

const HomePage = () => (
  <CenteredContainer>
    <Image source={require('./Bananavarieties.jpg')} style={{width: 193, height: 110}}/>
    <Text style={styles.text}>
      {Platform.select({
        android: `
          Finango App
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
  </CenteredContainer>
);

export default HomePage;
