import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { FilterSelect } from './FilterSelect';
import { Button, Search } from './design-system';
import { invoiceSiteFilterOptions, invoiceStatusFilterOptions } from '../data/mockInvoices';

const SEARCH_PLACEHOLDER = 'Search by invoice no.';

export function InvoicesToolbar({
  query,
  onQueryChange,
  site,
  onSiteChange,
  status,
  onStatusChange,
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
        spacing={{ xs: 2, md: 1 }}
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
              fontSize: 14,
              fontWeight: 500,
            },
            // Theme ships the placeholder at 16px/400 #cccccc (1.61:1 on white) from a
            // selector of equal specificity, so match it with a more specific one:
            // filter type scale, and grey.500 for WCAG AA (5.37:1).
            '& .MuiOutlinedInput-root .MuiInputBase-input::placeholder': {
              fontSize: 14,
              fontWeight: 500,
              lineHeight: '20px',
              color: '#6a6a70',
              opacity: 1,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.borderSubtle2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ fontSize: 18, color: theme.palette.textSecondary2 }} />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={0.5} flexWrap="wrap" alignItems="center">
          <FilterSelect label="Sites" value={site} onChange={onSiteChange} options={invoiceSiteFilterOptions} />
          <FilterSelect
            label="Status"
            value={status}
            onChange={onStatusChange}
            options={invoiceStatusFilterOptions}
          />
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
