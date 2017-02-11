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

export const createStylizedComponent = (rule, tag, passProps) =>
  createComponent(
    createExtendedRule(rule),
    tag,
    passProps,
  );
