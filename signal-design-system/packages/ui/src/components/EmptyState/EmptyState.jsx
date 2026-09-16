import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { semantic } from '@signal/design-tokens/colors';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Design-system EmptyState — presentational empty/no-data panel.
 *
 * Unifies the NoDataFound / panel empty pattern. Table-cell colspan empties
 * (NoRecordFound) and product-specific empties stay outside DS.
 *
 * No default i18n copy or bundled icons — callers pass `title`, `description`, `icon`.
 */
function EmptyState({ title, description, icon, className, sx, children }) {
  return (
    <Box className={className} sx={{ textAlign: 'center', p: 5, ...sx }}>
      {icon}
      {title ? (
        <Typography
          component="h3"
          sx={{ fontSize: 22, fontWeight: 700, mt: icon ? 3.75 : 0, mb: 2 }}
        >
          {title}
        </Typography>
      ) : null}
      {description ? (
        <Typography sx={{ fontSize: 14, fontWeight: 400, color: semantic.text.secondary2 }}>
          {description}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
}

EmptyState.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  icon: PropTypes.node,
  className: PropTypes.string,
  sx: PropTypes.object,
  children: PropTypes.node,
};

export default EmptyState;
