import MuiDialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Dialog — thin wrapper around `@mui/material/Dialog`.
 * ConfirmationDialog / SweetAlertModal / product modals stay outside core DS.
 */
const Dialog = forwardRef(function Dialog(props, ref) {
  return <MuiDialog ref={ref} {...props} />;
});

Dialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Dialog;
