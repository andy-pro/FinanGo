// @flow
import React from 'react';
import theme from '../themes/initial';
import { Image, Text, TouchableOpacity } from 'react-native';
import { checkbox as style } from '../../../common/__themes'

const Checkbox = ({ checked, onPress, label }) => {
  const image = checked
    ? require('./img/CheckboxChecked.png')
    : require('./img/Checkbox.png');

  return (
    <TouchableOpacity
      activeOpacity={theme.activeOpacity}
      onPress={onPress}
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
