import MuiSelect from '@mui/material/Select';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Select — thin wrapper around `@mui/material/Select`.
 * Visual styling: `src/theme/overrides/muiSelect.js` (Select-specific focus #3F99FF / error #f04438).
 *
 * Not included: CustomDropDown, SelectInput searchable composition, country selectors.
 */
const Select = forwardRef(function Select(props, ref) {
  return <MuiSelect ref={ref} {...props} />;
});

Select.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  multiple: PropTypes.bool,
  displayEmpty: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Select;
