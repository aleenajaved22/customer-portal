import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import bannerCloseIcon from '../assets/invoice-stats/banner-close.svg';
import { Button } from './design-system';

/** Compact banner control sizing — shared so both actions read as one pair. */
const compactButtonSx = {
  minWidth: 'auto',
  height: 28,
  px: '10px',
  fontSize: 13,
  fontWeight: 500,
  lineHeight: '18px',
  borderRadius: '6px',
};

export function InvoicePaymentBanner({ count, viewInvoicesLabel = 'View Invoices', onViewInvoices, onPayNow, onDismiss }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: { xs: 2, md: '32px' },
        py: '8px',
        backgroundColor: theme.palette.surfaceGreySubtle,
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: '20px',
          color: theme.palette.textPrimary,
        }}
      >
        There are{' '}
        <Box component="span" sx={{ fontWeight: 700, letterSpacing: '0.25px' }}>
          {count}
        </Box>{' '}
        invoices awaiting your payment
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Button variant="onlyText" onClick={onViewInvoices} sx={compactButtonSx}>
          {viewInvoicesLabel}
        </Button>
        <Button variant="primary" onClick={onPayNow} sx={compactButtonSx}>
          Pay Now
        </Button>
        <IconButton
          onClick={onDismiss}
          aria-label="Dismiss notification"
          sx={{ width: 20, height: 20, p: 0 }}
        >
          <Box component="img" src={bannerCloseIcon} alt="" sx={{ width: 20, height: 20 }} />
        </IconButton>
      </Stack>
    </Box>
  );
}
