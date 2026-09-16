/**
 * Signal Design System — Typography tokens
 *
 * CANONICAL type scale for the design system and light MUI theme.
 * Consumed by src/theme/typography.js.
 *
 * SCSS element headings / $display-* are LEGACY — documented only; not deleted in-app.
 */

/** Font family from src/global.scss. */
export const fontFamily = {
  sans: "'Inter', 'sans-serif'",
  inter: 'Inter',
  interFile: 'src/assets/fonts/Inter-VariableFont.ttf',
};

export const fontWeight = {
  regular: 400,
  medium: 500,
  bold: 700,
};

/**
 * Canonical design-system type scale (MUI theme variants).
 * Exact values from src/theme/typography.js.
 */
export const variants = {
  h1: {
    color: '#000',
    fontWeight: 700,
    fontSize: '24px',
    letterSpacing: 'normal',
    lineHeight: '32px',
  },
  h2: {
    color: '#000',
    fontWeight: 700,
    fontSize: '22px',
    letterSpacing: 'normal',
    lineHeight: '30px',
  },
  h3: {
    color: '#000',
    fontWeight: 700,
    fontSize: '20px',
    letterSpacing: 'normal',
    lineHeight: '28px',
  },
  h4: {
    color: '#000',
    fontWeight: 700,
    fontSize: '16px',
    letterSpacing: 'normal',
    lineHeight: '24px',
  },
  h5: {
    color: '#000',
    fontWeight: 700,
    fontSize: '14px',
    letterSpacing: 'normal',
    lineHeight: '20px',
  },
  h6: {
    color: '#000',
    fontWeight: 700,
    fontSize: '12px',
    letterSpacing: 'normal',
    lineHeight: '18px',
  },
  subtitle1: {
    color: '#000',
    fontWeight: 500,
    fontSize: '16px',
    letterSpacing: 'normal',
    lineHeight: '24px',
  },
  subtitle2: {
    color: '#000',
    fontWeight: 500,
    fontSize: '14px',
    letterSpacing: 'normal',
    lineHeight: '20px',
  },
  subtitle3: {
    color: '#000',
    fontWeight: 500,
    fontSize: '12px',
    letterSpacing: 'normal',
    lineHeight: '18px',
  },
  subtitle4: {
    color: '#000',
    fontWeight: 500,
    fontSize: '10px',
    letterSpacing: 'normal',
    lineHeight: '12px',
  },
  body1: {
    color: '#000',
    fontWeight: 400,
    fontSize: '16px',
    letterSpacing: 'normal',
    lineHeight: '24px',
  },
  body2: {
    color: '#000',
    fontWeight: 400,
    fontSize: '14px',
    letterSpacing: 'normal',
    lineHeight: '20px',
  },
  body3: {
    color: '#000',
    fontWeight: 400,
    fontSize: '12px',
    letterSpacing: 'normal',
    lineHeight: '18px',
  },
  button: {
    color: '#000',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: 'normal',
    lineHeight: '20px',
    textTransform: 'none',
  },
  caption: {
    color: '#000',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '18px',
    letterSpacing: 'normal',
  },
  info: {
    color: '#000',
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: 'normal',
    lineHeight: '20px',
  },
  overline: {
    color: '#000',
    fontSize: '10px',
    fontWeight: 400,
    letterSpacing: 'normal',
    lineHeight: '14px',
    textTransform: 'normal',
  },
};

/**
 * LEGACY — global.scss `$display-*` / title / label size variables.
 * Not part of the canonical MUI scale. Kept for documentation only.
 */
export const scssSizeVariables = {
  displayLg: '57px',
  displayMd: '45px',
  displaySm: '36px',
  titleLg: '32px',
  titleMd: '16px',
  titleSm: '14px',
  labelLg: '14px',
  labelMd: '12px',
  base: '16px',
};

/**
 * LEGACY — global.scss element selectors `h1` / `h2` / `h3`.
 * Differ from MUI variants (sizes and h3 weight). Do not use as DS canonical.
 * In-app SCSS rules are intentionally left untouched.
 */
export const scssElementHeadings = {
  h1: {
    color: '#000000',
    fontFamily: 'Inter',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '40px',
  },
  h2: {
    fontFamily: 'Inter',
    fontSize: '28px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '36px',
  },
  h3: {
    color: '#000000',
    fontFamily: 'Inter',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '32px',
  },
};

const typography = {
  fontFamily,
  fontWeight,
  variants,
  scssSizeVariables,
  scssElementHeadings,
};

export default typography;
