import React, { Component } from 'react'

import create from './createComponent'

export const Text = create(
  'span',
  ['data-path', 'onPress']
)

export const View = create(
  'div',
  ['data-path', 'onKeyDown', 'onPress']
)

export const Form = create(
  'form',
  ['onSubmit', 'onKeyDown']
)

export const Button = create(
  'button',
  ['onClick', 'title']
)

export const TextInput = create(
  'input',
  // ['placeholder', {$cmd: 'assign', $set: ['onChange', 'onChangeText']}, 'value', 'autoFocus', 'onFocus', 'onBlur']
  ['required', 'placeholder', 'onChangeText', 'value', 'autoFocus', 'onFocus', 'onBlur', '$ref', 'editable', 'type', 'step']
)

// export const FileInput = props => <TextInput {...props} type='file' />
export const FileInput = create(
  'input',
  ['onChangeText', '$ref', {type: 'file'}]
)


export const TouchableHighlight = create(
  'div',
  // [{$cmd: 'transform', $set: ['backgroundColor', 'underlayColor']}]
  ['underlayColor', 'onPress', '$ref']
)

export const TouchableOpacity = TouchableHighlight

export const ScrollView = create(
  'div'
  // ['data-path', 'onKeyDown', 'onPress']
)

export const Image = create(
  'img',
  ['source']
)

const Select = create(
  'select',
  ['onValueChange', 'enabled']
)

const Option = create(
  'option',
  ['value']
)

export class Picker extends Component {

  static Item = ({label, value}) =>
    <Option value={value}>
      {label}
    </Option>

  render() {
    let { children, ...props } = this.props
    return (
      <Select { ...props }>
        {children}
      </Select>
    )
  }

}
