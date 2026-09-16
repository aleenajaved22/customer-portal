import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Checkbox } from './Checkbox';
import { ContractChip } from './ContractChip';
import { InvoiceStatusChip } from './InvoiceStatusChip';
import { InvoiceViewIconButton } from '../InvoiceViewIconButton';

export function InvoicesTable({
  invoices,
  sortField,
  sortDirection,
  onSort,
  selectedIds = [],
  onToggleRow,
  onToggleAll,
  onViewInvoice,
}) {
  const theme = useTheme();
  const cellPaddingX = '24px';
  const bodyCellPy = 2;
  const checkboxColumnWidth = 64;
  const siteColumnWidth = 194;
  const actionsColumnWidth = 72;
  const tableMinWidth = 1100;
  const isInvoiceSelectable = (invoice) => invoice.status !== 'Paid';
  const selectableInvoices = invoices.filter(isInvoiceSelectable);
  const allSelected =
    selectableInvoices.length > 0 &&
    selectableInvoices.every((invoice) => selectedIds.includes(invoice.id));
  const someSelected =
    selectableInvoices.some((invoice) => selectedIds.includes(invoice.id)) && !allSelected;

  const headerCellSx = {
    fontWeight: 500,
    fontSize: 13,
    color: theme.palette.textSecondary3,
    borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
    py: 1.25,
    px: cellPaddingX,
    backgroundColor: theme.palette.surfaceWhite,
  };

  const sortLabelSx = {
    color: `${theme.palette.textSecondary3} !important`,
    '& .MuiTableSortLabel-icon': {
      color: `${theme.palette.textSecondary3} !important`,
      opacity: 1,
      fontSize: 16,
    },
  };

  const checkboxHeaderCellSx = {
    ...headerCellSx,
    pl: cellPaddingX,
    pr: cellPaddingX,
    width: checkboxColumnWidth,
    minWidth: checkboxColumnWidth,
    maxWidth: checkboxColumnWidth,
    boxSizing: 'border-box',
  };

  const checkboxBodyCellSx = {
    pl: cellPaddingX,
    pr: cellPaddingX,
    py: bodyCellPy,
    width: checkboxColumnWidth,
    minWidth: checkboxColumnWidth,
    maxWidth: checkboxColumnWidth,
    boxSizing: 'border-box',
    borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
  };

  const checkboxSx = {
    p: 0,
    width: 16,
    height: 16,
    '& .MuiSvgIcon-root': {
      fontSize: 16,
    },
    '&.Mui-disabled': {
      color: theme.palette.action.disabled,
    },
  };

  const primaryCellTextSx = {
    color: theme.palette.textPrimary,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1.43,
    m: 0,
  };

  const secondaryCellTextSx = {
    color: theme.palette.textSecondary2,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 1.43,
    m: 0,
  };

  const stickyEdgeShadow = '4px 0 8px -4px rgba(16, 24, 40, 0.08)';

  const stickyCheckboxHeaderSx = {
    ...checkboxHeaderCellSx,
    position: 'sticky',
    left: 0,
    zIndex: 3,
  };

  const stickyCheckboxBodySx = {
    ...checkboxBodyCellSx,
    position: 'sticky',
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.surfaceWhite,
    'tbody tr:hover &': {
      backgroundColor: theme.palette.surfaceGreySubtle,
    },
  };

  const stickySiteHeaderSx = {
    ...headerCellSx,
    position: 'sticky',
    left: checkboxColumnWidth,
    zIndex: 3,
    width: siteColumnWidth,
    minWidth: siteColumnWidth,
    maxWidth: siteColumnWidth,
    boxSizing: 'border-box',
    boxShadow: stickyEdgeShadow,
  };

  const stickySiteBodySx = {
    position: 'sticky',
    left: checkboxColumnWidth,
    zIndex: 2,
    width: siteColumnWidth,
    minWidth: siteColumnWidth,
    maxWidth: siteColumnWidth,
    boxSizing: 'border-box',
    px: cellPaddingX,
    py: bodyCellPy,
    borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
    backgroundColor: theme.palette.surfaceWhite,
    boxShadow: stickyEdgeShadow,
    'tbody tr:hover &': {
      backgroundColor: theme.palette.surfaceGreySubtle,
    },
  };

  const stickyRightEdgeShadow = '-4px 0 8px -4px rgba(16, 24, 40, 0.08)';

  const stickyActionsHeaderSx = {
    ...headerCellSx,
    position: 'sticky',
    right: 0,
    zIndex: 4,
    width: actionsColumnWidth,
    minWidth: actionsColumnWidth,
    maxWidth: actionsColumnWidth,
    boxSizing: 'border-box',
    px: 1.5,
    boxShadow: stickyRightEdgeShadow,
  };

  const stickyActionsBodySx = {
    position: 'sticky',
    right: 0,
    zIndex: 2,
    width: actionsColumnWidth,
    minWidth: actionsColumnWidth,
    maxWidth: actionsColumnWidth,
    boxSizing: 'border-box',
    px: 1.5,
    py: bodyCellPy,
    textAlign: 'center',
    verticalAlign: 'middle',
    borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
    backgroundColor: theme.palette.surfaceWhite,
    boxShadow: stickyRightEdgeShadow,
    'tbody tr:hover &': {
      backgroundColor: theme.palette.surfaceGreySubtle,
    },
  };

  return (
    <TableContainer sx={{ overflowX: 'auto', maxWidth: '100%' }}>
      <Table sx={{ tableLayout: 'fixed', width: '100%', minWidth: tableMinWidth }}>
        <colgroup>
          <col style={{ width: checkboxColumnWidth }} />
          <col style={{ width: siteColumnWidth }} />
          <col style={{ width: 182 }} />
          <col style={{ width: '22%' }} />
          <col style={{ width: '13%' }} />
          <col style={{ width: '11%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: actionsColumnWidth }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell sx={stickyCheckboxHeaderSx}>
              <Checkbox
                size="small"
                disableRipple
                checked={allSelected}
                indeterminate={someSelected}
                disabled={selectableInvoices.length === 0}
                onChange={(event) => onToggleAll?.(event.target.checked)}
                inputProps={{ 'aria-label': 'Select all invoices' }}
                sx={checkboxSx}
              />
            </TableCell>
            <TableCell sx={stickySiteHeaderSx} sortDirection={sortField === 'site' ? sortDirection : false}>
              <TableSortLabel
                active={sortField === 'site'}
                direction={sortField === 'site' ? sortDirection : 'desc'}
                onClick={() => onSort('site')}
                sx={sortLabelSx}
              >
                Site Name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headerCellSx, width: 182 }} sortDirection={sortField === 'invoiceNumber' ? sortDirection : false}>
              <TableSortLabel
                active={sortField === 'invoiceNumber'}
                direction={sortField === 'invoiceNumber' ? sortDirection : 'desc'}
                onClick={() => onSort('invoiceNumber')}
                sx={sortLabelSx}
              >
                Invoice Number
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headerCellSx, width: '22%' }} sortDirection={sortField === 'contract' ? sortDirection : false}>
              <TableSortLabel
                active={sortField === 'contract'}
                direction={sortField === 'contract' ? sortDirection : 'desc'}
                onClick={() => onSort('contract')}
                sx={sortLabelSx}
              >
                Contract
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headerCellSx, width: '13%' }} sortDirection={sortField === 'amount' ? sortDirection : false}>
              <TableSortLabel
                active={sortField === 'amount'}
                direction={sortField === 'amount' ? sortDirection : 'desc'}
                onClick={() => onSort('amount')}
                sx={sortLabelSx}
              >
                Amount
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headerCellSx, width: '11%' }} sortDirection={sortField === 'status' ? sortDirection : false}>
              <TableSortLabel
                active={sortField === 'status'}
                direction={sortField === 'status' ? sortDirection : 'desc'}
                onClick={() => onSort('status')}
                sx={sortLabelSx}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headerCellSx, width: '20%' }} sortDirection={sortField === 'dueDate' ? sortDirection : false}>
              <TableSortLabel
                active={sortField === 'dueDate'}
                direction={sortField === 'dueDate' ? sortDirection : 'desc'}
                onClick={() => onSort('dueDate')}
                sx={sortLabelSx}
              >
                Due Date
              </TableSortLabel>
            </TableCell>
            <TableCell sx={stickyActionsHeaderSx} aria-label="Actions" />
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.id}
              onClick={() => {
                if (invoice.status === 'Pending' || invoice.status === 'Overdue') {
                  onViewInvoice?.(invoice);
                }
              }}
              sx={{
                transition: 'background-color 0.15s ease',
                cursor: invoice.status === 'Pending' || invoice.status === 'Overdue' ? 'pointer' : 'default',
                '&:hover': {
                  backgroundColor: theme.palette.surfaceGreySubtle,
                },
                '&:hover td': {
                  backgroundColor: theme.palette.surfaceGreySubtle,
                },
                '& td': {
                  borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
                  py: bodyCellPy,
                },
                '& td:not(:first-of-type):not(:nth-of-type(2)):not(:last-of-type)': {
                  px: cellPaddingX,
                },
                '&:last-child td': { borderBottom: 0 },
                ...(invoice.status === 'Pending' || invoice.status === 'Overdue'
                  ? {
                      '& .invoice-row-action-arrow': {
                        opacity: 0,
                        transition: 'opacity 0.15s ease',
                      },
                      '&:hover .invoice-row-action-arrow': {
                        opacity: 1,
                      },
                    }
                  : {}),
              }}
            >
              <TableCell sx={stickyCheckboxBodySx} onClick={(event) => event.stopPropagation()}>
                <Checkbox
                  size="small"
                  disableRipple
                  checked={selectedIds.includes(invoice.id)}
                  disabled={!isInvoiceSelectable(invoice)}
                  onChange={() => onToggleRow?.(invoice.id)}
                  inputProps={{
                    'aria-label': `Select invoice ${invoice.invoiceNumber}`,
                  }}
                  sx={checkboxSx}
                />
              </TableCell>
              <TableCell sx={stickySiteBodySx}>
                <Typography variant="body2" sx={primaryCellTextSx}>
                  {invoice.site}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={secondaryCellTextSx}>
                  {invoice.invoiceNumber}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: 'middle' }}>
                <ContractChip label={invoice.contract} />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={secondaryCellTextSx}>
                  {invoice.amount}
                </Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: 'middle' }}>
                <InvoiceStatusChip status={invoice.status} />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    ...secondaryCellTextSx,
                    ...(invoice.status === 'Overdue'
                      ? { color: theme.palette.error.main, fontWeight: 500 }
                      : {}),
                  }}
                >
                  {invoice.dueDate}
                </Typography>
              </TableCell>
              <TableCell
                sx={stickyActionsBodySx}
                onClick={(event) => {
                  if (invoice.status === 'Paid') {
                    event.stopPropagation();
                  }
                }}
              >
                {invoice.status === 'Paid' ? (
                  <InvoiceViewIconButton
                    label={`View invoice ${invoice.invoiceNumber}`}
                    onClick={() => onViewInvoice?.(invoice)}
                  />
                ) : invoice.status === 'Pending' || invoice.status === 'Overdue' ? (
                  <Box
                    className="invoice-row-action-arrow"
                    aria-hidden
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      color: theme.palette.success.main,
                    }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 20 }} />
                  </Box>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
