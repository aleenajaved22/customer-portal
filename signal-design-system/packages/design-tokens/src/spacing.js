/**
 * Signal Design System — Spacing tokens
 *
 * NO formal 4px/8px grid. Do not enforce one.
 * Values are observed from theme overrides + shared common UI.
 */

/**
 * High-frequency single-axis spacing values (px) observed in the app.
 * Missing steps are not intentional design holes — do not “fill in” a grid.
 */
export const scale = {
  0: 0,
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
};

/**
 * Component-specific composite spacing — preserve exactly.
 */
export const component = {
  buttonPadding: '8px 14px',
  inputPadding: '10px 14px',
  chipPadding: '4px 8px',
  chipGap: '4px',
  inputLabelGap: '2px',
  tooltipPadding: '8px 12px',
  tooltipPopperPadding: '10px',
  tooltipMargin: '20px',
  tableCellPadding: '12px 24px',
  switchControlPadding: 2,
  /** global.scss button size variants — legacy SCSS utilities. */
  scssButtonPadding: '8px 14px',
  scssButtonPaddingMd: '10px 16px',
  scssButtonPaddingLg: '10px 18px',
  scssButtonPaddingXl: '12px 20px',
  scssButtonPaddingXxl: '16px 28px',
  dialogPadding: '24px',
  helperTextMarginTop: '6px',
};

/**
 * MUI runtime default for theme.spacing() — not a Signal-authored scale.
 */
export const muiDefaultUnit = 8;

const spacing = {
  scale,
  component,
  muiDefaultUnit,
};

export default spacing;
