import React, { Component } from 'react'

import Match from './Match'
import DatePicker from './DatePicker'
import Checkbox from './Checkbox'
import Icon from './icons/Ionicons';
// import AutosuggestForm from './AutosuggestForm';

import { createStylizedComponent, transformStyle } from './fela'

const Form = createStylizedComponent(
  transformStyle,
  'form',
  ['onSubmit', 'onKeyDown']
)

const View = createStylizedComponent(
  transformStyle,
  'div',
  ['data-path', 'onKeyDown', 'onPress']
)

const Text = createStylizedComponent(
  transformStyle,
  'span',
  ['data-path', 'onPress']
)

const Button = createStylizedComponent(
  transformStyle,
  'button',
  ['onClick']
)

const TextInput = createStylizedComponent(
  transformStyle,
  'input',
  // ['placeholder', {$cmd: 'assign', $set: ['onChange', 'onChangeText']}, 'value', 'autoFocus', 'onFocus', 'onBlur']
  ['required', 'placeholder', 'onChangeText', 'value', 'autoFocus', 'onFocus', 'onBlur', '$ref', 'editable', 'type', 'step']
)

const TouchableHighlight = createStylizedComponent(
  transformStyle,
  'div',
  // [{$cmd: 'transform', $set: ['backgroundColor', 'underlayColor']}]
  ['underlayColor', 'onPress', '$ref']
)

class ListView extends Component {

  static DataSource = function({rowHasChanged}) {
    this.rowHasChanged = rowHasChanged
    // console.log(rowHasChanged);
    // this.rows = []
    // this.cloneWithRows = (data) => data.map(item => item)
    this.cloneWithRows = data => data
  }

  render() {
    const {style, onKeyDown} = this.props
    return (
      <View style={style}>
        {this.props.dataSource.map((item, index) => {
          return (
            <div key={item.id || index}>
              {this.props.renderRow(item, index, index)}
            </div>
          )
        })}
      </View>
    )
  }

}

// const StyleSheet = {
//   create: styles => styles
// }

const ScrollView = createStylizedComponent(
  transformStyle,
  'div'
  // ['data-path', 'onKeyDown', 'onPress']
)

const Alert = {
  alert: (hdr, msg, btns) => {
    if (!btns) {
      if (msg) {
        hdr = hdr + '\n' + msg
      }
      alert(hdr)
    }
  }
}


export {
  Form,
  View,
  Text,
  Button,
  ListView,
  // StyleSheet,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Icon,
  Match,
  DatePicker,
  Checkbox,
  Alert,
  // AutosuggestForm,
}
