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
}, { router }) =>
  <Match exactly={exactly} pattern={to}>
    {({ matched }) => (
      <Text
        onPress={() => {
          if (action) action()
          else router.transitionTo(to);
          if (onPress) onPress();
        }}
        style={[style.link, matched && style.linkActive]}
      >
        {children}
      </Text>
    )}
  </Match>

Link.contextTypes = {
  router: React.PropTypes.object,
};

export default Link;
