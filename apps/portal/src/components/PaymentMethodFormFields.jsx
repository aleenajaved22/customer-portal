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
  '& .MuiFormControl-root': {
    width: '100%',
    minWidth: 0,
  },
  '& .MuiOutlinedInput-root': {
    minWidth: 0,
    maxWidth: '100%',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
};

const fieldPlaceholderSx = {
  ...fieldSx,
  '& .MuiOutlinedInput-input::placeholder': {
    fontSize: 13,
    opacity: 1,
  },
};

const formStackSx = {
  width: '100%',
  minWidth: 0,
  maxWidth: '100%',
  overflowX: 'hidden',
};

const twoColumnRowSx = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(148px, 240px)',
  columnGap: 1,
  width: '100%',
  minWidth: 0,
  alignItems: 'start',
  '& > *': { minWidth: 0 },
};

export function PaymentMethodFormFields({ methodId, values = {}, onChange }) {
  const set = (field) => (event) => onChange?.(field, event.target.value);

  switch (methodId) {
    case 'credit-card':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <Box sx={twoColumnRowSx}>
            <PaymentField label="Card number">
              <TextField
                fullWidth
                size="small"
                placeholder="Enter 16-digit card number"
                value={values.cardNumber ?? ''}
                onChange={set('cardNumber')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
            <PaymentField label="CVV">
              <TextField
                fullWidth
                size="small"
                placeholder="Enter CVV"
                value={values.cvv ?? ''}
                onChange={set('cvv')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
          </Box>
          <Box sx={twoColumnRowSx}>
            <PaymentField label="Name on card">
              <TextField
                fullWidth
                size="small"
                placeholder="Full name"
                value={values.nameOnCard ?? ''}
                onChange={set('nameOnCard')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
            <PaymentField label="Expiry date">
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                  columnGap: 1,
                  width: '100%',
                  minWidth: 0,
                  maxWidth: '100%',
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="MM"
                  inputProps={{ maxLength: 2, inputMode: 'numeric', 'aria-label': 'Expiry month' }}
                  value={values.expiryMonth ?? ''}
                  onChange={set('expiryMonth')}
                  sx={{
                    ...fieldPlaceholderSx,
                    minWidth: 0,
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  placeholder="YY"
                  inputProps={{ maxLength: 2, inputMode: 'numeric', 'aria-label': 'Expiry year' }}
                  value={values.expiryYear ?? ''}
                  onChange={set('expiryYear')}
                  sx={{
                    ...fieldPlaceholderSx,
                    minWidth: 0,
                  }}
                />
              </Box>
            </PaymentField>
          </Box>
        </Stack>
      );
    case 'ach':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <Box sx={twoColumnRowSx}>
            <PaymentField label="Account number">
              <TextField
                fullWidth
                size="small"
                placeholder="Enter account number"
                value={values.accountNumber ?? ''}
                onChange={set('accountNumber')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
            <PaymentField label="Routing number">
              <TextField
                fullWidth
                size="small"
                placeholder="9 digits"
                inputProps={{ maxLength: 9, inputMode: 'numeric' }}
                value={values.routingNumber ?? ''}
                onChange={set('routingNumber')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
          </Box>
          <Box sx={twoColumnRowSx}>
            <PaymentField label="Account holder name">
              <TextField
                fullWidth
                size="small"
                placeholder="Full name"
                value={values.accountHolderName ?? ''}
                onChange={set('accountHolderName')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
            <Box aria-hidden sx={{ minWidth: 0 }} />
          </Box>
        </Stack>
      );
    case 'paypal':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <Box sx={twoColumnRowSx}>
            <PaymentField label="PayPal email">
              <TextField
                fullWidth
                size="small"
                placeholder="Enter PayPal email"
                value={values.email ?? ''}
                onChange={set('email')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
            <PaymentField label="Password">
              <TextField
                fullWidth
                size="small"
                type="password"
                placeholder="Enter password"
                value={values.password ?? ''}
                onChange={set('password')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
          </Box>
        </Stack>
      );
    case 'zelle':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <Box sx={twoColumnRowSx}>
            <PaymentField label="Zelle email or phone">
              <TextField
                fullWidth
                size="small"
                placeholder="Email or mobile number"
                value={values.contact ?? ''}
                onChange={set('contact')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
            <PaymentField label="Account nickname">
              <TextField
                fullWidth
                size="small"
                placeholder="Optional nickname"
                value={values.nickname ?? ''}
                onChange={set('nickname')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
          </Box>
        </Stack>
      );
    case 'venmo':
      return (
        <Stack spacing={2.5} sx={formStackSx}>
          <Box sx={twoColumnRowSx}>
            <PaymentField label="Venmo username">
              <TextField
                fullWidth
                size="small"
                placeholder="@username"
                value={values.username ?? ''}
                onChange={set('username')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
            <PaymentField label="Mobile number">
              <TextField
                fullWidth
                size="small"
                placeholder="(555) 123-4567"
                inputProps={{ inputMode: 'tel' }}
                value={values.phone ?? ''}
                onChange={set('phone')}
                sx={fieldPlaceholderSx}
              />
            </PaymentField>
          </Box>
        </Stack>
      );
    default:
      return null;
  }
}
