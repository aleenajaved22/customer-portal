/**
 * Signal Design System — Border radius tokens
 *
 * Default control radius = 8px.
 * 4px, 12px, and pill/full remain role-specific — do not force everything to 8px.
 */

export const radius = {
  none: 0,
  /** Checkbox — role-specific. */
  xs: '4px',
  /** Occasional table chrome — role-specific. */
  sm: '6px',
  /**
   * Default control radius — buttons, inputs, select, tooltip, skeleton rectangular, dropdowns.
   */
  md: '8px',
  /** Alias of md — preferred name for “default control radius”. */
  default: '8px',
  /** Progress bar, scrollbar thumb — role-specific. */
  lg: '10px',
  /** Confirmation dialog — role-specific. */
  xl: '12px',
  /** Switch track / chip-like pills — role-specific. */
  pill: 100,
  /** Skeleton rounded — role-specific. */
  pillMax: '1000px',
  /** Circular skeleton / avatars — role-specific. */
  full: '50%',
};

/** Reference: where each radius appears in shared theme / common UI. */
export const radiusUsage = {
  xs: ['src/theme/overrides/muiCheckbox.js'],
  sm: ['src/app/components/common/table/table.styles.js'],
  md: [
    'src/theme/overrides/muiButton.js',
    'src/theme/overrides/muiTextField.js',
    'src/theme/overrides/muiSelect.js',
    'src/theme/overrides/muiTooltip.js',
    'src/theme/overrides/muiSkeleton.js',
    'src/app/components/common/customDropDown/',
    'src/global.scss (.btn-primary, .filterbtnsection)',
  ],
  default: ['same as md'],
  lg: [
    'src/theme/overrides/muiProgressBar.js',
    'src/theme/overrides/muiTextField.js (scrollbar thumb)',
    'src/app/components/common/table/table.styles.js',
  ],
  xl: ['src/app/components/common/confirmationDialog/confirmationDialog.js'],
  pill: ['src/theme/overrides/muiSwitch.js', 'src/app/components/common/customDropDown/'],
  pillMax: ['src/theme/overrides/muiSkeleton.js (rounded)'],
  full: ['src/theme/overrides/muiSkeleton.js (circular)'],
};

export default radius;
