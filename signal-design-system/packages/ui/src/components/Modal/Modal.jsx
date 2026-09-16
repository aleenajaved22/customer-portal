import MuiModal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Modal — thin wrapper around `@mui/material/Modal`.
 * Unstyled portal shell. Prefer Dialog for titled confirmations.
 * Product modals / SweetAlert stay outside DS.
 */
const Modal = forwardRef(function Modal(props, ref) {
  return <MuiModal ref={ref} {...props} />;
});

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Modal;
