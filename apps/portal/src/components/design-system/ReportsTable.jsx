import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { NewSiteBadge } from './NewSiteBadge';
import { ReportTypeChip } from './ReportTypeChip';

export function ReportsTable({ reports, sortField, sortDirection, onSort }) {
  const theme = useTheme();

  const cellPaddingX = '24px';

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

  return (
    <TableContainer>
      <Table sx={{ tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...headerCellSx, width: '34%' }}>Site</TableCell>
            <TableCell sx={{ ...headerCellSx, width: '22%' }}>Report Type</TableCell>
            <TableCell sx={{ ...headerCellSx, width: '22%' }} sortDirection={sortField === 'day' ? sortDirection : false}>
              <TableSortLabel
                active={sortField === 'day'}
                direction={sortField === 'day' ? sortDirection : 'desc'}
                onClick={() => onSort('day')}
                sx={sortLabelSx}
              >
                Day
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ ...headerCellSx, width: '22%' }} sortDirection={sortField === 'date' ? sortDirection : false}>
              <TableSortLabel
                active={sortField === 'date'}
                direction={sortField === 'date' ? sortDirection : 'desc'}
                onClick={() => onSort('date')}
                sx={sortLabelSx}
              >
                Date
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow
              key={report.id}
              sx={{
                '& td': {
                  borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
                  py: 2,
                  px: cellPaddingX,
                },
                '&:last-child td': { borderBottom: 0 },
              }}
            >
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2" sx={{ color: theme.palette.textPrimary, fontWeight: 500, fontSize: 14 }}>
                    {report.site}
                  </Typography>
                  {report.isNew ? <NewSiteBadge /> : null}
                </Stack>
              </TableCell>
              <TableCell>
                <ReportTypeChip type={report.reportType} />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: theme.palette.textSecondary2, fontSize: 14 }}>
                  {report.day}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: theme.palette.textSecondary2, fontSize: 14 }}>
                  {report.date}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
