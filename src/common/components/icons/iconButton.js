import React, { Component } from 'react';

import { Button } from '../index'
import { defaultTheme as theme } from '../../app/themes'

export default function createIconButtonComponent(Icon) {
  return class IconButton extends Component {

    render() {
      let {color='white'} = this.props
      const { type, backgroundColor, onPress, children, ...props } = this.props;
      const style ={
        ...theme.button,
        backgroundColor,
        color,
      }
      props.style = props.style || {}
      // props.style.marginRight = 0
      props.style.marginTop = -4
      props.size = 24
      return (
        <Button style={style} onClick={onPress} type={type}>
          <Icon {...props} />
          {children}
        </Button>
      );
    }
  };
}
