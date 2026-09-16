import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { useEffect, useMemo, useState } from 'react';
import { formatInvoiceTotal, sumInvoiceAmounts } from '../data/mockInvoices';
import { Button, Dialog } from './design-system';
import { PaymentMethodFormFields } from './PaymentMethodFormFields';
import { PAYMENT_METHODS } from './payment-method-logos';

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

export function PaymentMethodModal({
  open,
  onClose,
  invoices = [],
  defaultTypeId,
  onPayNow,
}) {
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState(PAYMENT_METHODS[0].id);

  useEffect(() => {
    if (open) {
      setSelectedId(defaultTypeId ?? PAYMENT_METHODS[0].id);
    }
  }, [open, defaultTypeId]);

  const subtotal = useMemo(() => sumInvoiceAmounts(invoices), [invoices]);
  const selectedMethod = PAYMENT_METHODS.find((method) => method.id === selectedId) ?? PAYMENT_METHODS[0];

  const handleClose = () => {
    onClose();
  };

  const handleSelect = (methodId) => {
    setSelectedId(methodId);
  };

  const handlePayNow = () => {
    if (invoices.length === 0) return;
    onPayNow?.(selectedId, DEFAULT_DETAILS[selectedId] ?? {});
  };

  const receiptBackground = '#EEF1F6';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: '16px',
          m: 2,
          width: '100%',
          maxWidth: 1080,
          overflow: 'hidden',
        },
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ minHeight: { md: 520 } }}>
        <Box
          sx={{
            flex: 1,
            minWidth: { md: 640 },
            px: 3,
            py: 2.5,
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 600, color: theme.palette.textPrimary }}>Pay invoices</Typography>
            <IconButton onClick={handleClose} aria-label="Close" size="small" sx={{ color: theme.palette.textSecondary2 }}>
              <CloseIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Stack>

          <Typography sx={{ fontSize: 13, fontWeight: 500, color: theme.palette.textSecondary3, mb: 1 }}>
            Payment method
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2, width: '100%' }}>
            {PAYMENT_METHODS.map(({ id, label, Logo }) => {
              const isSelected = selectedId === id;

              return (
                <Box
                  key={id}
                  component="button"
                  type="button"
                  onClick={() => handleSelect(id)}
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.75,
                    px: 0.75,
                    py: 1.25,
                    border: `1px solid ${isSelected ? theme.palette.primary.main : theme.palette.borderSubtle2}`,
                    borderRadius: '8px',
                    backgroundColor: isSelected ? theme.palette.surfaceBrandSubtle : theme.palette.surfaceWhite,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'border-color 0.15s, background-color 0.15s',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <Box sx={{ width: 28, height: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Logo />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 500,
                      lineHeight: '14px',
                      color: theme.palette.textPrimary,
                      width: '100%',
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>

          <Divider sx={{ mb: 2.5, borderColor: theme.palette.borderSubtle1 }} />

          <Typography sx={{ fontSize: 15, fontWeight: 600, color: theme.palette.textPrimary, mb: 2 }}>
            {selectedMethod.label} details
          </Typography>

          <Box sx={{ flex: 1, minWidth: 0, overflowY: 'auto', overflowX: 'hidden' }}>
            <PaymentMethodFormFields methodId={selectedId} />
          </Box>

          <Button
            variant="primary"
            fullWidth
            disabled={invoices.length === 0}
            onClick={handlePayNow}
            sx={{ mt: 3, py: 1.25, fontSize: 15, fontWeight: 600, borderRadius: '8px' }}
          >
            Pay Now
          </Button>
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: 360 },
            flexShrink: 0,
            backgroundColor: receiptBackground,
            px: 2.5,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <ReceiptLongOutlinedIcon sx={{ fontSize: 20, color: theme.palette.textSecondary2 }} />
            <Typography sx={{ fontSize: 15, fontWeight: 600, color: theme.palette.textPrimary }}>Receipt</Typography>
          </Stack>

          <Box
            sx={{
              flex: 1,
              backgroundColor: theme.palette.surfaceWhite,
              borderRadius: '12px',
              px: 2,
              py: 2,
              boxShadow: '0 1px 3px rgba(16, 24, 40, 0.08)',
            }}
          >
            {invoices.length === 0 ? (
              <Typography sx={{ fontSize: 13, color: theme.palette.textSecondary3, textAlign: 'center', py: 4 }}>
                Select one or more invoices to see your payment summary.
              </Typography>
            ) : (
              <>
                <Stack spacing={1.75} sx={{ mb: 2 }}>
                  {invoices.map((invoice) => (
                    <Stack key={invoice.id} direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 500, color: theme.palette.textPrimary }}>
                          {invoice.invoiceNumber}
                        </Typography>
                        <Typography sx={{ fontSize: 12, color: theme.palette.textSecondary3 }} noWrap>
                          {invoice.site}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 500, color: theme.palette.textPrimary, flexShrink: 0 }}>
                        {invoice.amount}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Box
                  sx={{
                    borderTop: `1px dashed ${theme.palette.borderSubtle2}`,
                    pt: 2,
                    position: 'relative',
                    '&::before, &::after': {
                      content: '""',
                      position: 'absolute',
                      top: -6,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: receiptBackground,
                    },
                    '&::before': { left: -6 },
                    '&::after': { right: -6 },
                  }}
                >
                  <Typography sx={{ fontSize: 12, color: theme.palette.textSecondary3, mb: 0.5 }}>Subtotal</Typography>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontSize: 22, fontWeight: 700, color: theme.palette.textPrimary, lineHeight: 1.2 }}>
                      {formatInvoiceTotal(subtotal)}
                    </Typography>
                    <ReceiptLongOutlinedIcon sx={{ fontSize: 22, color: theme.palette.textSecondary3 }} />
                  </Stack>
                  <Typography sx={{ fontSize: 11, color: theme.palette.textSecondary3, mt: 0.5 }}>
                    {invoices.length} invoice{invoices.length === 1 ? '' : 's'}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Stack>
    </Dialog>
  );
}
