import MuiTooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Tooltip — thin wrapper around `@mui/material/Tooltip`.
 * Visual styling: `src/theme/overrides/muiTooltip.js`.
 */
const Tooltip = forwardRef(function Tooltip(props, ref) {
  return <MuiTooltip ref={ref} {...props} />;
});

Tooltip.propTypes = {
  title: PropTypes.node,
  children: PropTypes.element,
  placement: PropTypes.string,
  arrow: PropTypes.bool,
  className: PropTypes.string,
};

export default Tooltip;
