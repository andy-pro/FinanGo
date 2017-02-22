import React, { Component } from 'react';

import { Input } from './fela'

const Checkbox = ({ checked, onPress, style, label, disabled }) => {
  return (
    <div>
      <label style={style.label}>
        <Input
          style={style.input}
          type="checkbox"
          value={label}
          checked={checked}
          onChange={e => onPress(e.target.checked)}
          disabled={disabled}
        />
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
