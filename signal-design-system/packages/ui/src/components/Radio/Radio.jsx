import MuiRadio from '@mui/material/Radio';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Radio — thin wrapper around `@mui/material/Radio`.
 * Visual styling: `src/theme/overrides/muiRadio.js`.
 * RadioGroup / CustomRadioGroup compositions stay outside core DS for now.
 */
const Radio = forwardRef(function Radio(props, ref) {
  return <MuiRadio ref={ref} {...props} />;
});

Radio.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Radio;
