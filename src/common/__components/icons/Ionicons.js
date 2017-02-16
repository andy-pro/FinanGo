import createIconSet from './createIconSet';

const glyphMap = {
  'ios-paper-plane-outline': require('./io/ios-paper-plane-outline').default,
  'ios-refresh-circle-outline': require('./io/ios-refresh-circle-outline').default,
  'ios-list-box-outline': require('./io/ios-list-outline').default,
  'ios-trash-outline': require('./io/ios-trash-outline').default,
  'ios-arrow-forward': require('./io/ios-arrow-forward').default,
  'ios-arrow-back': require('./io/ios-arrow-back').default,
  'ios-color-palette-outline': require('./io/android-color-palette').default,
  'ios-create-outline': require('./io/android-create').default,
  'ios-add-circle-outline': require('./io/android-add-circle').default,
  'ios-remove-circle-outline': require('./io/android-remove-circle').default,
  'ios-eye-outline': require('./io/ios-eye').default,
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
