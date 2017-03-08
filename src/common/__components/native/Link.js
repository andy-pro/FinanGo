// @flow weak
import React from 'react';
import { Match } from 'react-router';
import { Text } from 'react-native';

const Link = ({
  children,
  exactly,
  onPress,
  to,
  action,
  style,
}, { router }) => (
  action ?
    <Text
      onPress={() => {
        action();
        if (onPress) onPress();
      }}
      style={style.link}
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
          style={[style.link, matched && style.linkActive]}
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
