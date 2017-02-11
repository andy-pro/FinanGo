import React, { Component } from 'react';

import { createStylizedComponent, transformStyle } from './fela'

const FelaCheckbox = createStylizedComponent(
  transformStyle,
  'input',
  ['type', 'value', 'checked', 'onChange', 'disabled']
)

const Checkbox = ({ checked, onPress, style, label, disabled }) => {
  return (
    <div>
      <label style={style.label}>
        <FelaCheckbox
          style={style.input}
          type="checkbox"
          value={label}
          checked={checked}
          onChange={onPress}
          disabled={disabled}
        />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
