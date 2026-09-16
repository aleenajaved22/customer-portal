import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { FilterSelect } from './FilterSelect';
import { Button, Search } from './design-system';
import { invoiceSiteFilterOptions } from '../data/mockInvoices';

const SEARCH_PLACEHOLDER = 'Search by invoice no.';

export function InvoicesToolbar({
  query,
  onQueryChange,
  site,
  onSiteChange,
  showPayNow = false,
  onPayNow,
}) {
  const theme = useTheme();
  const searchWidthCh = Math.max(SEARCH_PLACEHOLDER.length, query.length);

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2.5}
      alignItems={{ xs: 'stretch', md: 'center' }}
      justifyContent="space-between"
      sx={{ width: '100%' }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2.5}
        alignItems={{ xs: 'stretch', md: 'center' }}
      >
        <Search
          placeholder="Search by invoice no."
          variant="outlined"
          size="small"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          sx={{
            width: {
              xs: '100%',
              md: `calc(${searchWidthCh}ch + 2.75rem)`,
            },
            flexShrink: 0,
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              backgroundColor: theme.palette.surfaceWhite,
              height: 36,
            },
            '& .MuiOutlinedInput-input': {
              minWidth: `${searchWidthCh}ch`,
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
          <FilterSelect label="Sites" value={site} onChange={onSiteChange} options={invoiceSiteFilterOptions} />
        </Stack>
      </Stack>

      {showPayNow ? (
        <Button
          variant="primary"
          onClick={onPayNow}
          sx={{
            alignSelf: { xs: 'flex-start', md: 'center' },
            minWidth: 105,
          }}
        >
          Pay Now
        </Button>
      ) : null}
    </Stack>
  );
}
