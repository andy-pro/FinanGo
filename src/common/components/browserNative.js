import React, { Component } from 'react'

import createComponent from './fela/createComponent'

const directionMapping = {
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
};

const transformDirection = (style) => {
  for(let prop in directionMapping) {
    let val = style[prop]
    if (val) {
      delete style[prop]
      style[directionMapping[prop][0]] = val
      style[directionMapping[prop][1]] = val
    }
  }
}

const transformStyle = (theme, style) => {
  if (style instanceof Array) {
    // console.log('style is Array', JSON.stringify(style));
    // style = style.reduce((item, src) => ({...src, ...item}), {})
    style = {...style[0], ...style[1]}
    // console.log('after style is Array', JSON.stringify(style));
  }
  // transform style for Component
  // style.display = 'flex'
  // if (!style.flexDirection) {
  //   // style.flexDirection = 'column'
  // }
  // if (style.flex) {
  //   style.display = 'flex'
  // }
  if (style.borderWidth) {
    style.borderStyle = 'solid'
  }
  if (style.borderBottomWidth) {
    style.borderBottomStyle = 'solid'
  }
  transformDirection(style)
  // style.fontFamily = theme.text.fontFamily
  return style
}

const createExtendedRule = (rule) => (props) => rule(props.theme, props.style)

const createStylizedComponent = (rule, tag, passProps) =>
  createComponent(
    createExtendedRule(rule),
    tag,
    passProps,
  );

const Form = createStylizedComponent(
  transformStyle,
  'form',
  ['onSubmit', 'onKeyDown']
)

const View = createStylizedComponent(
  transformStyle,
  'div',
  ['onKeyDown']
)

const Text = createStylizedComponent(transformStyle, 'span')

const Button = createStylizedComponent(
  transformStyle,
  'button',
  ['onClick']
)

const TextInput = createStylizedComponent(
  transformStyle,
  'input',
  // ['placeholder', {$cmd: 'assign', $set: ['onChange', 'onChangeText']}, 'value', 'autoFocus', 'onFocus', 'onBlur']
  ['required', 'placeholder', 'onChangeText', 'value', 'autoFocus', 'onFocus', 'onBlur', '$ref']
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
              {this.props.renderRow(item)}
            </div>
          )
        })}
      </View>
    )
  }

}

const StyleSheet = {
  create: styles => styles
}

const ScrollView = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export {
  Form,
  View,
  Text,
  Button,
  ListView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableHighlight,
}
