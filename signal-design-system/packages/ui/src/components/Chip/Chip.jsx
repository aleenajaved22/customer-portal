import MuiChip from '@mui/material/Chip';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Chip — thin wrapper around `@mui/material/Chip`.
 * Visual styling: `src/theme/overrides/muiChip.js`.
 * Preserves semantic status colors (success/warning on-subtle). Product status mappers stay outside DS.
 */
const Chip = forwardRef(function Chip(props, ref) {
  return <MuiChip ref={ref} {...props} />;
});

Chip.propTypes = {
  label: PropTypes.node,
  color: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Chip;
