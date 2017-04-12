// import React from 'react';
import React, { Component, PropTypes, Children } from 'react'

// import { Animated, StyleSheet, View, Text } from 'react-native';
import { View, Text } from './';

// import { connect } from 'react-redux';

// const styles = StyleSheet.create({
const styles_native = {
  container: {
    height: 100,
    left: 20,
    overflow: 'hidden',
    position: 'absolute',
    // right: 20,
    minWidth: 150,
    zIndex: 1,
    top:150
  },
  alert: {
    borderBottomWidth: 1,
    // bottom: 0,
    // left: 0,
    // position: 'absolute',
    // right: 0,
    backgroundColor: '#ccc',
  },
  message: {
    color: '#333',
    fontWeight: 'bold',
    margin: 10,
    // textAlign: 'center',
  },
}

const styles = {
  root: {
    flex: 1,
    position: 'relative',
  },
  container: {
    height: 100,
    left: 20,
    overflow: 'hidden',
    position: 'absolute',
    // right: 20,
    minWidth: 150,
    zIndex: 1,
    top:150
  },
  alert: {
    borderBottomWidth: 1,
    // bottom: 0,
    // left: 0,
    // position: 'absolute',
    // right: 0,
    backgroundColor: '#ccc',
  },
  message: {
    color: '#333',
    fontWeight: 'bold',
    margin: 10,
    // textAlign: 'center',
  },
}

class Popup extends Component {
  getChildContext() {
    return {
      popup: {
        // triggerAutosuggestMenu: this.triggerAutosuggestMenu,
        color: 'white',
        onKeyDown: this.onKeyDown,
        // onTargetBlur: this.onTargetBlur,
        // renderSimple: this.renderSimple,
        // renderHighlight: this.renderHighlight,
      }
    }
  }

  onKeyDown(e) {
    console.log('hello from popup context');
  }

  render() {
    console.log('render popup');
    return (
      <View style={styles.root}>

        { Children.only(this.props.children) }

        <View style={styles.container}>
          <View style={styles.alert}>
            <Text style={styles.message}>
              QUQUQUQUQU-SYAKA!!!
            </Text>
          </View>
        </View>

      </View>
    );
  }

}

Popup.childContextTypes = {
  popup: PropTypes.object
}

export default Popup
