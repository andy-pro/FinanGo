'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createComponent;

var _react = require('react');

// function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length), len = arr.length; i < len; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
function _toConsumableArray(arr) { return Array.isArray(arr) ? arr.map(item => item) : Array.from(arr) }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*  weak */

function createComponent(rule) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var passThroughProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var FelaComponent = function FelaComponent(_ref, _ref2) {

    var renderer = _ref2.renderer,
        theme = _ref2.theme || {};

    var children = _ref.children,
        className = _ref.className,
        id = _ref.id,
        style = _ref.style || {},
        _ref$passThrough = _ref.passThrough,
        passThrough = _ref$passThrough === undefined ? [] : _ref$passThrough,
        ruleProps = _objectWithoutProperties(_ref, ['children', 'className', 'id', 'style', 'passThrough']);

    // style = {
    //   ...style,
    //   ...ruleProps
    // }

    // filter props to extract props to pass through
    var componentProps = passThroughProps.reduce(function (output, prop) {
      // console.log('QWERT', prop, ruleProps);
      switch (prop) {
        case 'editable':
          // output.disabled = !Boolean(ruleProps.editable);
          if (ruleProps.editable === false) output.disabled = true
          break;
        case 'onChangeText':
          output.onChange = ruleProps.onChangeText;
          break;
        case 'onPress':
          output.onClick = ruleProps.onPress;
          break;
        case '$ref':
          output.ref = ruleProps.$ref;
          break;
        case 'underlayColor':
          style[':hover'] = {
            backgroundColor: ruleProps.underlayColor,
            cursor: 'pointer'
          };
          // console.log('style', style);
          break;
        default:
          output[prop] = ruleProps[prop];
      }
      // console.log('props for ref', output.ref, ruleProps.ref);
      return output;
    }, {});

    componentProps.id = id;

    var cls = className ? className + ' ' : '';
    componentProps.className = cls + renderer.renderRule(rule, { theme, style });
    if (componentProps.placeholder) {
      // console.log('PROPS', componentProps);

    }
    return (0, _react.createElement)(type, componentProps, children);
  };

  FelaComponent.contextTypes = {
    renderer: _react.PropTypes.object,
    theme: _react.PropTypes.object
  };

  // use the rule name as display name to better debug with react inspector
  FelaComponent.displayName = rule.name && rule.name || 'FelaComponent';
  return FelaComponent;
}
module.exports = exports['default'];
