import MuiTab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Tab — thin wrapper around `@mui/material/Tab`.
 */
const Tab = forwardRef(function Tab(props, ref) {
  return <MuiTab ref={ref} {...props} />;
});

Tab.propTypes = {
  label: PropTypes.node,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Tab;
