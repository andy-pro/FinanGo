// @flow
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { checkbox as style } from '../../__themes'

const Checkbox = ({ checked, onPress, label, disabled }) => {
  const image = checked
    ? require('../img/CheckboxChecked.png')
    : require('../img/Checkbox.png');

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={disabled ? null : onPress}
      style={style.input}
    >
      <Image source={image} />
      <Text style={style.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
