// @flow
import React from 'react';
import { CenteredContainer, Text } from '../app/components';
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});

const EstePage = () => (
  <CenteredContainer>
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
  </CenteredContainer>
);

export default EstePage;
