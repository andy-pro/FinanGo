import { createComponent } from 'react-fela'

export default function(stylize, tag, passProps) {

  const componentStyle = (theme) => {
    console.log('componentStyle', theme, passProps, this);
    return stylize(theme)
  };

  // console.log('this', this);

  var renderer = createComponent(
    componentStyle,
    tag,
    // passProps
  )

  return renderer(passProps)

}


// const styled = <Props>(
//   rule: BrowserStyle | (theme: Theme, props: Props) => BrowserStyle,
//   type?: string | Function,
//   passProps?: Array<string>,
// ): Styled<Props> => {
//   const extendedRule = createExtendedRule(rule);
//   const componentRule = (props) => {
//     const { style, maps } = extendedRule(props);
//     // For debugging or post processing.
//     return maps.reduce((style, map) => map(style), style);
//   };
//   const Component = createComponent(
//     componentRule,
//     getPlatformType(type),
//     passProps,
//   );
//   Component.rule = extendedRule;
//   return Component;
// };
//
// export default styled;
