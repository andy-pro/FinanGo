
// import type { Theme } from './types';
// import openColor from './openColor';
import typography from './typography';

// www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/
// Taken from from Bootstrap 4.
export const nativeFontFamily = [
  '-apple-system',
  'system-ui',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(', ');

const theme = {
  typography: typography({
    fontSize: 16,
    fontSizeScale: 'step5', // perfect fourth, modularscale.com
    lineHeight: 24,
  }),
  colors: {
    // primary: openColor.blue6,
    primary: '#228ae6',
    // success: openColor.green5,
    // warning: openColor.orange6,
    // danger: openColor.red6,
    // lightdanger: openColor.red3,
    // black: openColor.gray8,
    black: '#343a40',
    // white: openColor.white,
    white: '#fff',
    // gray: openColor.gray5,
    gray: '#adb5bd',
    // open: openColor,
    // green: openColor.green7,
    // silver: openColor.gray4,
    silver: '#ced4da',
  },
  border: {
    radius: 2,
    width: 1,
  },
  states: {
    active: {
      darken: 0.2,
    },
    disabled: {
      cursor: 'default',
      opacity: 0.5,
    },
  },
  container: {
    maxWidths: {
      small: 540,
      medium: 600,
      big: 680,
      bigger: 768,
    },
  },
  menu: {
    width: 7
  },
  text: {
    bold: 600,
    fontFamily: nativeFontFamily,
  },
  block: {
    marginBottom: 1,
    maxWidth: 21,
  },
  heading: {
    fontFamily: nativeFontFamily,
    marginBottom: 1,
  },
  paragraph: {
    marginBottom: 1,
  },
};

export default theme;
