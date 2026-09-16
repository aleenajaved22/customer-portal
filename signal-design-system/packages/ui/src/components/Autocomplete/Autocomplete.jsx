import MuiAutocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Autocomplete — thin wrapper around `@mui/material/Autocomplete`.
 * Product searchable selectors (maps, filters, CustomDropDown) stay outside DS.
 */
const Autocomplete = forwardRef(function Autocomplete(props, ref) {
  return <MuiAutocomplete ref={ref} {...props} />;
});

Autocomplete.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  renderInput: PropTypes.func,
  multiple: PropTypes.bool,
  freeSolo: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Autocomplete;
