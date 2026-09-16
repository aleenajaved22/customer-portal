import InputAdornment from '@mui/material/InputAdornment';
import MuiTextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Search — presentational search field (MUI TextField).
 *
 * No debounce, routing, or API. Callers own those behaviors.
 * Visual field chrome comes from MuiOutlinedInput theme overrides.
 */
const Search = forwardRef(function Search(
  { startAdornment, InputProps, type = 'search', ...rest },
  ref,
) {
  const mergedInputProps = {
    ...InputProps,
    ...(startAdornment
      ? {
          startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
        }
      : {}),
  };

  return <MuiTextField ref={ref} type={type} {...rest} InputProps={mergedInputProps} />;
});

Search.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  name: PropTypes.string,
  startAdornment: PropTypes.node,
  InputProps: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Search;
