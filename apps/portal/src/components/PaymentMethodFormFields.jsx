import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { TextField } from './design-system';

function PaymentField({ label, hint, children }) {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', minWidth: 0, maxWidth: '100%' }}>
      <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: theme.palette.textPrimary, mb: 0.5 }}>
        {label}
      </Typography>
      {hint ? (
        <Typography sx={{ fontSize: 12, lineHeight: '16px', color: theme.palette.textSecondary3, mb: 1 }}>
          {hint}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
}

const fieldSx = {
  width: '100%',
  maxWidth: '100%',
  minWidth: 0,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
};

const formStackSx = {
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  overflowX: 'hidden',
};

export function PaymentMethodFormFields({ methodId }) {
  switch (methodId) {
    case 'credit-card':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <PaymentField label="Card number" hint="Enter the 16-digit card number on the card">
            <TextField fullWidth size="small" placeholder="1234 5678 9012 3456" sx={fieldSx} />
          </PaymentField>
          <PaymentField label="CVV" hint="3 or 4 digits on the back of the card">
            <TextField fullWidth size="small" placeholder="123" sx={fieldSx} />
          </PaymentField>
          <PaymentField label="Expiry date" hint="Month and year on the card">
            <Stack direction="row" spacing={1} sx={{ width: '100%', minWidth: 0 }}>
              <TextField fullWidth size="small" placeholder="MM" sx={{ ...fieldSx, flex: 1 }} />
              <TextField fullWidth size="small" placeholder="YY" sx={{ ...fieldSx, flex: 1 }} />
            </Stack>
          </PaymentField>
          <PaymentField label="Name on card" hint="As printed on the card">
            <TextField fullWidth size="small" placeholder="Full name" sx={fieldSx} />
          </PaymentField>
        </Stack>
      );
    case 'ach':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <PaymentField label="Routing number" hint="9-digit bank routing number">
            <TextField fullWidth size="small" placeholder="021000021" sx={fieldSx} />
          </PaymentField>
          <PaymentField label="Account number" hint="Your checking or savings account number">
            <TextField fullWidth size="small" placeholder="Account number" sx={fieldSx} />
          </PaymentField>
          <PaymentField label="Account holder name" hint="Name on the bank account">
            <TextField fullWidth size="small" placeholder="Full name" sx={fieldSx} />
          </PaymentField>
        </Stack>
      );
    case 'paypal':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <PaymentField label="PayPal email" hint="Email linked to your PayPal account">
            <TextField fullWidth size="small" placeholder="you@example.com" sx={fieldSx} />
          </PaymentField>
          <PaymentField label="Password" hint="Your PayPal password">
            <TextField fullWidth size="small" type="password" placeholder="Password" sx={fieldSx} />
          </PaymentField>
        </Stack>
      );
    case 'zelle':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <PaymentField label="Zelle email or phone" hint="Registered with your bank for Zelle">
            <TextField fullWidth size="small" placeholder="Email or mobile number" sx={fieldSx} />
          </PaymentField>
          <PaymentField label="Account nickname" hint="Optional label for this payment">
            <TextField fullWidth size="small" placeholder="Business checking" sx={fieldSx} />
          </PaymentField>
        </Stack>
      );
    case 'venmo':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <PaymentField label="Venmo username" hint="@username for your Venmo account">
            <TextField fullWidth size="small" placeholder="@username" sx={fieldSx} />
          </PaymentField>
          <PaymentField label="Mobile number" hint="Phone linked to Venmo">
            <TextField fullWidth size="small" placeholder="(555) 123-4567" sx={fieldSx} />
          </PaymentField>
        </Stack>
      );
    default:
      return null;
  }
}
