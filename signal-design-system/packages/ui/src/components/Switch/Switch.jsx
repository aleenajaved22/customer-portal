import MuiSwitch from '@mui/material/Switch';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Switch — thin wrapper around `@mui/material/Switch`.
 * Visual styling: `src/theme/overrides/muiSwitch.js`.
 */
const Switch = forwardRef(function Switch(props, ref) {
  return <MuiSwitch ref={ref} {...props} />;
});

Switch.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Switch;
