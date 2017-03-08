import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { colors } from '../../__themes'

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 40,
    right: 36,
    borderRadius: 35,
    backgroundColor: colors.header,
    width: 70,
    height: 70,
    opacity: 0.7,
    paddingTop: 5,
    zIndex: 2
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
    textShadowColor: 'black'
  }
});

const RoundButton = ({ to }, { router }) => {
  return (
    <TouchableHighlight
      onPress={
        () => { router.transitionTo(to) }
      }
      underlayColor='#084'
      style={styles.button}>
      <Text style={styles.text}>+</Text>
    </TouchableHighlight>
  )
}

RoundButton.contextTypes = {
  router: React.PropTypes.object,
};

export default RoundButton
