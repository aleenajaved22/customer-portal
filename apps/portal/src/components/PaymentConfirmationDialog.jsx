import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { Button, Dialog } from './design-system';
import { getPaymentMethodType } from '../data/paymentMethodCategories';
import { PAYMENT_METHOD_TYPES } from './payment-method-logos';

export function PaymentConfirmationDialog({ open, onClose, onConfirm, paymentMethod, totalLabel, invoiceCount }) {
  const theme = useTheme();
  const type = paymentMethod ? getPaymentMethodType(paymentMethod.typeId, PAYMENT_METHOD_TYPES) : null;
  const Logo = type?.Logo;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 3,
          width: '100%',
          maxWidth: 440,
        },
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>Confirm payment</Typography>
      <Typography sx={{ fontSize: 14, color: theme.palette.textSecondary2, mb: 2.5 }}>
        You are about to pay {totalLabel} for {invoiceCount} invoice{invoiceCount === 1 ? '' : 's'} using:
      </Typography>

      {paymentMethod ? (
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            p: 1.5,
            borderRadius: '12px',
            border: `1px solid ${theme.palette.borderSubtle1}`,
            backgroundColor: theme.palette.surfaceGreySubtle,
            mb: 3,
          }}
        >
          {Logo ? (
            <Logo />
          ) : null}
          <Stack spacing={0.25}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{paymentMethod.label}</Typography>
            <Typography sx={{ fontSize: 12, color: theme.palette.textSecondary3 }}>{paymentMethod.subtitle}</Typography>
          </Stack>
        </Stack>
      ) : null}

      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <Button variant="tertiaryGrey" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm payment
        </Button>
      </Stack>
    </Dialog>
  );
}
