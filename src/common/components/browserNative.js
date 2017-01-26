import React, { Component } from 'react'

import createComponent from '../lib/react-native-fela/createComponent'

// import { Image } from 'react-native'

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
  // transform style for Component
  if (style.flex) {
    style.display = 'flex'
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

const View = createStylizedComponent(
  transformStyle,
  'div',
  ['onKeyDown']
)

const Text = createStylizedComponent(transformStyle, 'span')

const TextInput = createStylizedComponent(
  transformStyle,
  'input',
  // ['placeholder', {$cmd: 'assign', $set: ['onChange', 'onChangeText']}, 'value', 'autoFocus', 'onFocus', 'onBlur']
  ['placeholder', 'onChangeText', 'value', 'autoFocus', 'onFocus', 'onBlur', '$ref']
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
    return (
      <div>
        {this.props.dataSource.map((item, index) => {
          return (
            <div key={index}>
              {this.props.renderRow(item)}
            </div>
          )
        })}
      </div>
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
  View,
  Text,
  ListView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableHighlight
}
