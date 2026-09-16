import MuiTextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system TextField — thin API wrapper around `@mui/material/TextField`.
 *
 * Visual styling is owned by `src/theme/overrides/muiTextField.js`, which is
 * currently registered on MUI's `MuiOutlinedInput` (not `MuiTextField`).
 * Outlined is the primary existing application pattern; this wrapper does not
 * force `variant="outlined"` or transform other MUI variants.
 *
 * Separate concerns (not this component):
 * - Select / SelectInput
 * - SearchComponent
 * - CustomInput (label / required / i18n) — a FormField may be extracted later
 * - Composite inputs (CustomInputIcon*, holiday/discount rate fields, etc.)
 *
 * All MUI TextField props pass through unchanged.
 */
const TextField = forwardRef(function TextField(props, ref) {
  return <MuiTextField ref={ref} {...props} />;
});

TextField.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  multiline: PropTypes.bool,
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fullWidth: PropTypes.bool,
  InputProps: PropTypes.object,
  inputProps: PropTypes.object,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default TextField;
