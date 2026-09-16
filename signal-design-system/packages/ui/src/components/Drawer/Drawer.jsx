import MuiDrawer from '@mui/material/Drawer';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Drawer — thin wrapper around `@mui/material/Drawer`.
 * Generic shell only. Feature drawers (deal, task, filters) stay in the product layer.
 */
const Drawer = forwardRef(function Drawer(props, ref) {
  return <MuiDrawer ref={ref} {...props} />;
});

Drawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  anchor: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Drawer;
