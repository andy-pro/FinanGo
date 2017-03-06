import React, { Component } from 'react';

import createIconButtonComponent from './iconButton';

const createIconSet = (glyphMap) => {

  class Icon extends Component {
    render() {
      const { name, ...props } = this.props;
      const Glyph = glyphMap[name];
      return (
        <Glyph {...props} />
      )
    }
  }

  Icon.Button = createIconButtonComponent(Icon);

  return Icon;
}

export default createIconSet
