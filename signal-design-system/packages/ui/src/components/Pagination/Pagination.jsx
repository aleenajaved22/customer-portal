import TablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

/**
 * Design-system Pagination — thin wrapper around `@mui/material/TablePagination`.
 * Presentational only — page/count/onPageChange owned by callers.
 * Listing data-fetch stays outside DS.
 */
const Pagination = forwardRef(function Pagination(props, ref) {
  return <TablePagination ref={ref} component="div" {...props} />;
});

Pagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  rowsPerPageOptions: PropTypes.array,
  className: PropTypes.string,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.func]),
};

export default Pagination;
