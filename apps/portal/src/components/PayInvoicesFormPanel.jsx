import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { PaymentMethodFormFields } from './PaymentMethodFormFields';
import { PaymentMethodTypePicker } from './PaymentMethodTypePicker';

/**
 * Payment method tiles + fields only (no per-method “{label} details” section title).
 */
export function PayInvoicesFormPanel({ methods, selectedId, onSelect, formValues, onFieldChange, formFooter }) {
  const theme = useTheme();

  return (
    <>
      <Typography sx={{ fontSize: 16, fontWeight: 600, color: theme.palette.textPrimary, mb: 2.5 }}>
        Pay invoices
      </Typography>

      <Typography sx={{ fontSize: 13, fontWeight: 500, color: theme.palette.textSecondary3, mb: 1 }}>
        Payment method
      </Typography>
      <PaymentMethodTypePicker methods={methods} selectedId={selectedId} onSelect={onSelect} />

      <Divider sx={{ mb: 2.5, borderColor: theme.palette.borderSubtle1 }} />

      <Box sx={{ flex: 1, minWidth: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        <PaymentMethodFormFields methodId={selectedId} values={formValues} onChange={onFieldChange} />
      </Box>

      {formFooter}

      <Typography
        sx={{
          fontSize: 10,
          lineHeight: '14px',
          color: theme.palette.textSecondary3,
          textAlign: 'center',
          mt: 1.5,
        }}
      >
        Your payment is safe and secure
      </Typography>
    </>
  );
}
