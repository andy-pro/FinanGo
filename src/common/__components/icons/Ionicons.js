import createIconSet from './createIconSet';

const glyphMap = {
  'ios-paper-plane-outline': require('./io/ios-paper-plane-outline').default,
  'ios-refresh-circle-outline': require('./io/ios-refresh-circle-outline').default,
  'ios-list-outline': require('./io/ios-list-outline').default,
  'ios-trash-outline': require('./io/ios-trash-outline').default,
  'ios-arrow-forward': require('./io/ios-arrow-forward').default,
  'ios-arrow-back': require('./io/ios-arrow-back').default,
  'android-color-palette': require('./io/android-color-palette').default,
  'android-create': require('./io/android-create').default,
  'android-add-circle': require('./io/android-add-circle').default,
  'android-remove-circle': require('./io/android-remove-circle').default,
}

export default createIconSet(glyphMap);

// ios-paper-plane
// ios-paper-plane-outline
// ios-send
// ios-send-outline
// md-add-circle
// md-add-circle
// md-close-circle
// md-paper-plane
// md-send
// md-trash
// ios-trash
// ios-trash-outline
// md-refresh-circle
// ios-refresh-circle-outline
