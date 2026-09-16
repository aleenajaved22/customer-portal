import MuiButton from '@mui/material/Button';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Button variants styled via `src/theme/overrides/muiButton.js`.
 * Visual styles remain in the MUI theme — this wrapper is an API surface only.
 */
export const BUTTON_VARIANTS = [
  'primary',
  'secondaryGrey',
  'tertiaryGrey',
  'onlyText',
  'destructive',
  'destructiveSecondary',
  'secondaryBlue',
];

/**
 * Thin design-system Button around MUI Button.
 * All MUI Button props pass through unchanged.
 */
const Button = forwardRef(function Button(props, ref) {
  return <MuiButton ref={ref} {...props} />;
});

Button.propTypes = {
  variant: PropTypes.oneOf(BUTTON_VARIANTS),
  disabled: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  href: PropTypes.string,
  component: PropTypes.elementType,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
  children: PropTypes.node,
};

export default Button;
