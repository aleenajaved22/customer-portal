import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Dialog } from './design-system';

const popIn = keyframes`
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const ringPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(45, 165, 81, 0.45); }
  70% { box-shadow: 0 0 0 16px rgba(45, 165, 81, 0); }
  100% { box-shadow: 0 0 0 0 rgba(45, 165, 81, 0); }
`;

export function PaymentSuccessAnimation({ open, amountLabel, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          px: 4,
          py: 4,
          textAlign: 'center',
          minWidth: 320,
        },
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          mx: 'auto',
          mb: 2,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EFF8EF',
          animation: `${popIn} 0.45s ease-out, ${ringPulse} 1.2s ease-out 0.2s`,
        }}
      >
        <CheckCircleOutlineIcon sx={{ fontSize: 44, color: '#2DA551' }} />
      </Box>
      <Typography sx={{ fontSize: 20, fontWeight: 600, mb: 0.75 }}>Payment successful</Typography>
      <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 2 }}>
        {amountLabel ? `${amountLabel} has been processed.` : 'Your payment has been processed.'}
      </Typography>
      <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>Thank you — a receipt was sent to your email.</Typography>
    </Dialog>
  );
}
