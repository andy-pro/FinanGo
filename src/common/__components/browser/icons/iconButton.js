import React, { Component } from 'react';

import { Button } from '../fela'
// import { View as Button } from '../fela'
import { buttonCSS } from '../../../__themes'

export default function createIconButtonComponent(Icon) {
  return class IconButton extends Component {

    render() {
      const { type, color='white', backgroundColor, onPress, children, title, ...props } = this.props;
      const style ={
        ...buttonCSS,
        backgroundColor,
        color,
        cursor: 'pointer',
        paddingLeft: 2,
        paddingRight: 2,
      }
      props.style = props.style || {}
      props.style.marginTop = -4
      props.size = props.size || 24
      if (children) {
        style.paddingRight = 6
        props.style.marginRight = 2
      }
      style.height = props.size + 2
      style.paddingTop = Math.round((style.height - 13) / 2.6)
      return (
        <Button style={style} onClick={onPress} type={type} title={title}>
          <Icon {...props} />
          {children}
        </Button>
      );
    }
  };
}
