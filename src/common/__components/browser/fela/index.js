import createComponent from './createComponent'

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

  if (style.borderWidth) style.borderStyle = 'solid'
  if (style.borderBottomWidth) style.borderBottomStyle = 'solid'
  if (style.borderTopWidth) style.borderTopStyle = 'solid'
  if (style.borderLeftWidth) style.borderLeftStyle = 'solid'
  if (style.borderRightWidth) style.borderRightStyle = 'solid'

  transformDirection(style)
  // style.fontFamily = theme.text.fontFamily
  // console.log('result style', JSON.stringify(style));
  return style
}

const createExtendedRule = (rule) => (props) => rule(props.theme, props.style)

const createStylizedComponent = (rule, tag, passProps) =>
  createComponent(
    createExtendedRule(rule),
    tag,
    passProps,
  );

// export { transformStyle, createStylizedComponent }

export const Text = createStylizedComponent(
  transformStyle,
  'span',
  ['data-path', 'onPress']
)

export const View = createStylizedComponent(
  transformStyle,
  'div',
  ['data-path', 'onKeyDown', 'onPress']
)

export const Form = createStylizedComponent(
  transformStyle,
  'form',
  ['onSubmit', 'onKeyDown']
)

export const Button = createStylizedComponent(
  transformStyle,
  'button',
  ['onClick', 'title']
)

export const TextInput = createStylizedComponent(
  transformStyle,
  'input',
  // ['placeholder', {$cmd: 'assign', $set: ['onChange', 'onChangeText']}, 'value', 'autoFocus', 'onFocus', 'onBlur']
  ['required', 'placeholder', 'onChangeText', 'value', 'autoFocus', 'onFocus', 'onBlur', '$ref', 'editable', 'type', 'step']
)

export const TouchableHighlight = createStylizedComponent(
  transformStyle,
  'div',
  // [{$cmd: 'transform', $set: ['backgroundColor', 'underlayColor']}]
  ['underlayColor', 'onPress', '$ref']
)

export const TouchableOpacity = TouchableHighlight

export const ScrollView = createStylizedComponent(
  transformStyle,
  'div'
  // ['data-path', 'onKeyDown', 'onPress']
)

export const Image = createStylizedComponent(
  transformStyle,
  'img',
  ['source']
)

export const Input = createStylizedComponent(
  transformStyle,
  'input',
  ['type', 'value', 'checked', 'onChange', 'disabled']
)
