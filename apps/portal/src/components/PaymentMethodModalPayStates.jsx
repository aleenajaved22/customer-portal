import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { keyframes, useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

const popIn = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  65% { transform: scale(1.06); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const ringPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(45, 165, 81, 0.5); }
  70% { box-shadow: 0 0 0 18px rgba(45, 165, 81, 0); }
  100% { box-shadow: 0 0 0 0 rgba(45, 165, 81, 0); }
`;

const checkDraw = keyframes`
  0% { transform: scale(0.6) rotate(-12deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
`;

export function PaymentMethodModalProcessing({ message = 'Processing payment…' }) {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ flex: 1, minHeight: 360, py: 4 }}
    >
      <CircularProgress size={36} sx={{ color: theme.palette.primary.main }} />
      <Typography sx={{ fontSize: 15, fontWeight: 600, color: theme.palette.textPrimary }}>{message}</Typography>
      <Typography sx={{ fontSize: 13, color: theme.palette.textSecondary3, textAlign: 'center', maxWidth: 280 }}>
        Securing your payment. Please wait a moment.
      </Typography>
    </Stack>
  );
}

export function PaymentMethodModalSuccess({ amountLabel }) {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ flex: 1, minHeight: 360, py: 4, px: 2, textAlign: 'center' }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.surfaceSuccessSubtle,
          animation: `${popIn} 0.5s ease-out, ${ringPulse} 1.4s ease-out 0.15s`,
        }}
      >
        <CheckIcon
          sx={{
            fontSize: 44,
            color: theme.palette.primary.main,
            animation: `${checkDraw} 0.35s ease-out 0.25s both`,
          }}
        />
      </Box>
      <Typography sx={{ fontSize: 22, fontWeight: 700, color: theme.palette.textPrimary }}>Payment successful</Typography>
      <Typography sx={{ fontSize: 14, color: theme.palette.textSecondary2 }}>
        {amountLabel ? `${amountLabel} has been processed.` : 'Your payment has been processed.'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: theme.palette.textSecondary3 }}>Thank you — a receipt was sent to your email.</Typography>
    </Stack>
  );
}
