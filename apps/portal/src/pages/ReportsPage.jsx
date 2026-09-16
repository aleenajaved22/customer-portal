import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useMemo, useState } from 'react';
import { PortalShell } from '../components/PortalShell';
import { ReportsToolbar } from '../components/ReportsToolbar';
import { EmptyState, ReportsTable } from '../components/design-system';
import { mockReports } from '../data/mockReports';

const ROWS_PER_PAGE = 8;

export function ReportsPage() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [site, setSite] = useState('');
  const [reportType, setReportType] = useState('');
  const [week, setWeek] = useState('');
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState('day');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredReports = useMemo(() => {
    let rows = [...mockReports];

    if (query.trim()) {
      const normalized = query.trim().toLowerCase();
      rows = rows.filter(
        (report) =>
          report.site.toLowerCase().includes(normalized) ||
          report.reportType.toLowerCase().includes(normalized) ||
          report.day.toLowerCase().includes(normalized) ||
          report.date.toLowerCase().includes(normalized),
      );
    }

    if (site) {
      rows = rows.filter((report) => report.site === site);
    }

    if (reportType) {
      rows = rows.filter((report) => report.reportType === reportType);
    }

    rows.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return rows;
  }, [query, site, reportType, sortField, sortDirection]);

  const pagedReports = filteredReports.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE);
  const total = filteredReports.length;
  const from = total === 0 ? 0 : page * ROWS_PER_PAGE + 1;
  const to = Math.min((page + 1) * ROWS_PER_PAGE, total);
  const canPrev = page > 0;
  const canNext = (page + 1) * ROWS_PER_PAGE < total;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <PortalShell activeNav="reports">
      <Stack spacing={2.5}>
        <ReportsToolbar
          query={query}
          onQueryChange={setQuery}
          site={site}
          onSiteChange={setSite}
          reportType={reportType}
          onReportTypeChange={setReportType}
          week={week}
          onWeekChange={setWeek}
        />

        <Box sx={{ pt: 0.5 }}>
          {pagedReports.length === 0 ? (
            <EmptyState
              title="No reports found"
              description="Try adjusting your search or filters."
            />
          ) : (
            <>
              <ReportsTable
                reports={pagedReports}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />

              <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1.25} sx={{ pt: 2 }}>
                <Typography variant="body2" sx={{ color: theme.palette.textSecondary2, fontSize: 14 }}>
                  {from}-{to} of {total}
                </Typography>
                <IconButton
                  size="small"
                  disabled={!canPrev}
                  onClick={() => setPage((p) => p - 1)}
                  sx={{
                    border: `1px solid ${theme.palette.borderSubtle2}`,
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    color: theme.palette.textSecondary2,
                    '&.Mui-disabled': { opacity: 0.4 },
                  }}
                >
                  <ChevronLeftIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <IconButton
                  size="small"
                  disabled={!canNext}
                  onClick={() => setPage((p) => p + 1)}
                  sx={{
                    border: `1px solid ${theme.palette.borderSubtle2}`,
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    color: theme.palette.textSecondary2,
                    '&.Mui-disabled': { opacity: 0.4 },
                  }}
                >
                  <ChevronRightIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Stack>
            </>
          )}
        </Box>
      </Stack>
    </PortalShell>
  );
}
