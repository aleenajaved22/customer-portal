import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { FiltergoWordmark } from './FiltergoWordmark';
import { PAYMENT_METHOD_TYPES } from './payment-method-logos';
import { Button, Dialog } from './design-system';
import { PaymentMethodFormFields } from './PaymentMethodFormFields';

const DEFAULT_DETAILS = {
  'credit-card': {
    last4: '3456',
    nameOnCard: 'Josh Franklin',
    expiryMonth: '09',
    expiryYear: '28',
    reference: '009001706623',
    accountCode: '45700',
  },
  ach: { accountLast4: '6789', accountHolderName: 'Josh Franklin', reference: '009001706624', accountCode: '45701' },
  paypal: { email: 'you@example.com', reference: '009001706625', accountCode: '45702' },
  zelle: { contact: 'payments@filtergo.com', nickname: 'Business Zelle', reference: '009001706626', accountCode: '45703' },
  venmo: { username: '@filtergo', phone: '(402) 555-0100', reference: '009001706627', accountCode: '45704' },
};

export function AddPaymentMethodModal({ open, onClose, onSave, title = 'Add payment method', initialTypeId }) {
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState(PAYMENT_METHOD_TYPES[0].id);

  useEffect(() => {
    if (open) {
      setSelectedId(initialTypeId ?? PAYMENT_METHOD_TYPES[0].id);
    }
  }, [open, initialTypeId]);

  const selectedMethod = PAYMENT_METHOD_TYPES.find((method) => method.id === selectedId) ?? PAYMENT_METHOD_TYPES[0];

  const handleSave = () => {
    onSave?.(selectedId, DEFAULT_DETAILS[selectedId] ?? {});
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          m: 2,
          width: '100%',
          maxWidth: 760,
          overflow: 'hidden',
        },
      }}
    >
      <Box sx={{ px: 3, py: 2.5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
          <Stack direction="row" alignItems="center" spacing={1.25}>
            <FiltergoWordmark height={28} />
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: theme.palette.textPrimary }}>{title}</Typography>
          </Stack>
          <IconButton onClick={onClose} aria-label="Close" size="small" sx={{ color: theme.palette.textSecondary2 }}>
            <CloseIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </Stack>

        <Typography sx={{ fontSize: 13, fontWeight: 500, color: theme.palette.textSecondary3, mb: 1 }}>
          Payment method
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2, width: '100%', flexWrap: 'nowrap' }}>
          {PAYMENT_METHOD_TYPES.map(({ id, label, Logo }) => {
            const isSelected = selectedId === id;

            return (
              <Box
                key={id}
                component="button"
                type="button"
                onClick={() => setSelectedId(id)}
                sx={{
                  flex: '1 1 0',
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.75,
                  px: 0.5,
                  py: 1.25,
                  border: `1px solid ${isSelected ? theme.palette.primary.main : theme.palette.borderSubtle2}`,
                  borderRadius: '8px',
                  backgroundColor: isSelected ? theme.palette.surfaceBrandSubtle : theme.palette.surfaceWhite,
                  cursor: 'pointer',
                }}
              >
                <Logo />
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 500,
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Stack>

        <Divider sx={{ mb: 2.5, borderColor: theme.palette.borderSubtle1 }} />

        <Typography sx={{ fontSize: 15, fontWeight: 600, mb: 2 }}>
          {selectedMethod.label} details
        </Typography>

        <PaymentMethodFormFields methodId={selectedId} />

        <Button variant="primary" fullWidth onClick={handleSave} sx={{ mt: 3, py: 1.25, fontWeight: 600, borderRadius: '8px' }}>
          Save payment method
        </Button>
      </Box>
    </Dialog>
  );
}
