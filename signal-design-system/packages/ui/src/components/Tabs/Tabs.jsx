import MuiTabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Tabs — thin wrapper around `@mui/material/Tabs`.
 * No dedicated theme override today; product tab shells / ACL tabs stay outside DS.
 */
const Tabs = forwardRef(function Tabs(props, ref) {
  return <MuiTabs ref={ref} {...props} />;
});

Tabs.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  children: PropTypes.node,
  orientation: PropTypes.string,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Tabs;
