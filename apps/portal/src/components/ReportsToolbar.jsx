import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { FilterSelect } from './FilterSelect';
import { Search, TextField } from './design-system';
import {
  reportTypeFilterOptions,
  siteFilterOptions,
  weekFilterOptions,
} from '../data/mockReports';

export function ReportsToolbar({
  query,
  onQueryChange,
  site,
  onSiteChange,
  reportType,
  onReportTypeChange,
  week,
  onWeekChange,
}) {
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      spacing={2}
      alignItems={{ xs: 'stretch', lg: 'center' }}
      justifyContent="space-between"
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} alignItems={{ xs: 'stretch', md: 'center' }}>
        <Search
          placeholder="Search"
          variant="outlined"
          size="small"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          sx={{
            width: { xs: '100%', md: 200 },
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: theme.palette.surfaceWhite,
              height: 36,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.borderSubtle2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: theme.palette.textSecondary3 }} />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={2.5} flexWrap="wrap" alignItems="center">
          <FilterSelect label="Sites" value={site} onChange={onSiteChange} options={siteFilterOptions} />
          <FilterSelect
            label="Report Type"
            value={reportType}
            onChange={onReportTypeChange}
            options={reportTypeFilterOptions}
          />
          <FilterSelect label="This Week" value={week} onChange={onWeekChange} options={weekFilterOptions} />
        </Stack>
      </Stack>

      <TextField
        variant="outlined"
        size="small"
        value="01/14/2024 - 01/18/2024"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <CalendarTodayOutlinedIcon sx={{ fontSize: 18, color: theme.palette.textSecondary3 }} />
            </InputAdornment>
          ),
        }}
        sx={{
          width: { xs: '100%', lg: 260 },
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: theme.palette.surfaceWhite,
            height: 36,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.borderSubtle2,
          },
          '& .MuiOutlinedInput-input': {
            fontSize: 14,
            color: theme.palette.textPrimary,
          },
        }}
      />
    </Stack>
  );
}
