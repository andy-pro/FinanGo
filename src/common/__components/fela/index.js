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

export const transformStyle = (theme, style) => {
  if (style instanceof Array) {
    style = Object.assign({}, ...style)
  }
  if (style.borderWidth) style.borderStyle = 'solid'
  if (style.borderBottomWidth) style.borderBottomStyle = 'solid'
  if (style.borderTopWidth) style.borderTopStyle = 'solid'
  if (style.borderLeftWidth) style.borderLeftStyle = 'solid'
  if (style.borderRightWidth) style.borderRightStyle = 'solid'

  transformDirection(style)
  // style.fontFamily = theme.text.fontFamily
  return style
}

const createExtendedRule = (rule) => (props) => rule(props.theme, props.style)

export const createStylizedComponent = (rule, tag, passProps) =>
  createComponent(
    createExtendedRule(rule),
    tag,
    passProps,
  );
