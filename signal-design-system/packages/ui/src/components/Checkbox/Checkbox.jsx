import MuiCheckbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Checkbox — thin wrapper around `@mui/material/Checkbox`.
 * Visual styling: `src/theme/overrides/muiCheckbox.js`.
 * Product wrappers (CheckBoxLabel SVG composition, permission grid) stay outside DS.
 */
const Checkbox = forwardRef(function Checkbox(props, ref) {
  return <MuiCheckbox ref={ref} {...props} />;
});

Checkbox.propTypes = {
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Checkbox;
