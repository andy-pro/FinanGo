import React, { PropTypes, isValidElement, createElement } from 'react';
import { Text } from 'react-native';
import { FormattedMessage } from 'react-intl';

const intlMessage = props => (
  <FormattedMessage {...props}>
    {(...nodes) => {
      const newNodes = nodes.map((node) => {
        if (!isValidElement(node)) {
          return (<Text style={props.style}>{node}</Text>);
        }
        return node;
      });
      return createElement(Text, {style: props.style}, ...newNodes);
    }}
  </FormattedMessage>
);

intlMessage.propTypes = {
  style: PropTypes.any,
};

export default intlMessage;
