// @flow weak
import React from 'react';
import { Match } from 'react-router';
import { Text } from './';

const Link = ({
  activeStyle,
  children,
  exactly,
  onPress,
  style,
  to,
  action,
}, { router }) => (
  action ?
    <Text
      onPress={() => {
        action();
        if (onPress) onPress();
      }}
      style={style}
    >
      {children}
    </Text>
  :
    <Match exactly={exactly} pattern={to}>
      {({ matched }) => (
        <Text
          onPress={() => {
            router.transitionTo(to);
            if (!onPress) return;
            onPress();
          }}
          style={[style, matched && activeStyle]}
        >
          {children}
        </Text>
      )}
    </Match>
);

Link.contextTypes = {
  router: React.PropTypes.object,
};

export default Link;
