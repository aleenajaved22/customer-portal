/**
 * Signal Design System — Tokens public API
 *
 * Tokens are the canonical values for the light MUI theme (palette / type / breakpoints).
 * Theme files re-export a compatibility API; global.scss is still separate.
 */

import borders from './borders';
import breakpoints from './breakpoints';
import colors from './colors';
import radius from './radius';
import shadows from './shadows';
import spacing from './spacing';
import typography from './typography';

export {
  color as borderColor,
  overrideColor as borderOverrideColor,
  default as borders,
  style as borderStyle,
  width as borderWidth,
} from './borders';
export { default as breakpoints, values as breakpointValues } from './breakpoints';
export {
  legacy as colorLegacy,
  primitive as colorPrimitives,
  default as colors,
  semantic as colorSemantic,
} from './colors';
export { default as radius, radiusUsage } from './radius';
export { focusColor as shadowFocusColor, default as shadows } from './shadows';
export {
  default as spacing,
  component as spacingComponent,
  scale as spacingScale,
} from './spacing';
export {
  fontFamily,
  fontWeight,
  default as typography,
  variants as typographyVariants,
} from './typography';

const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
  borders,
};

export default tokens;
