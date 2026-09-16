import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { useEffect, useMemo, useRef, useState } from 'react';
import { formatInvoiceTotal, sumInvoiceAmounts } from '../data/mockInvoices';
import { Button, Dialog } from './design-system';
import { PayInvoicesFormPanel } from './PayInvoicesFormPanel';
import { PAYMENT_METHODS } from './payment-method-logos';
import { PaymentMethodModalSkeleton } from './PaymentMethodModalSkeleton';
import {
  PaymentMethodModalProcessing,
  PaymentMethodModalSuccess,
} from './PaymentMethodModalPayStates';

import { EMPTY_PAYMENT_METHOD_FORMS, buildDetailsFromForm } from '../data/paymentMethodCategories';

const PROCESSING_MS = 1600;
const SUCCESS_DISMISS_MS = 2800;

export function PaymentMethodModal({
  open,
  onClose,
  invoices = [],
  defaultTypeId,
  onPayNow,
  onPaymentComplete,
}) {
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState(PAYMENT_METHODS[0].id);
  const [formValues, setFormValues] = useState(EMPTY_PAYMENT_METHOD_FORMS[PAYMENT_METHODS[0].id]);
  const [phase, setPhase] = useState('form');
  const processingTimerRef = useRef(null);
  const successTimerRef = useRef(null);

  useEffect(() => {
    if (open) {
      const typeId = defaultTypeId ?? PAYMENT_METHODS[0].id;
      setSelectedId(typeId);
      setFormValues({ ...EMPTY_PAYMENT_METHOD_FORMS[typeId] });
      setPhase('form');
    } else {
      setPhase('form');
    }
  }, [open, defaultTypeId]);

  useEffect(
    () => () => {
      window.clearTimeout(processingTimerRef.current);
      window.clearTimeout(successTimerRef.current);
    },
    [],
  );

  const subtotal = useMemo(() => sumInvoiceAmounts(invoices), [invoices]);
  const amountLabel = useMemo(() => formatInvoiceTotal(subtotal), [subtotal]);
  const isProcessing = phase === 'processing';
  const isSuccess = phase === 'success';
  const showForm = phase === 'form';

  const finishAndClose = () => {
    onPaymentComplete?.();
    onClose();
  };

  const handleClose = () => {
    if (isProcessing) return;
    if (isSuccess) {
      finishAndClose();
      return;
    }
    onClose();
  };

  const handleSelect = (methodId) => {
    if (!showForm) return;
    setSelectedId(methodId);
    setFormValues({ ...EMPTY_PAYMENT_METHOD_FORMS[methodId] });
  };

  const handleFieldChange = (field, value) => {
    if (!showForm) return;
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handlePayNow = () => {
    if (invoices.length === 0 || !showForm) return;

    setPhase('processing');

    processingTimerRef.current = window.setTimeout(() => {
      const details = buildDetailsFromForm(selectedId, formValues);
      onPayNow?.({ typeId: selectedId, details });
      setPhase('success');

      successTimerRef.current = window.setTimeout(() => {
        finishAndClose();
      }, SUCCESS_DISMISS_MS);
    }, PROCESSING_MS);
  };

  const receiptBackground = theme.palette.surfaceSuccessSubtle;

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
            position: 'relative',
          }}
        >
          {showForm ? (
            <PayInvoicesFormPanel
              methods={PAYMENT_METHODS}
              selectedId={selectedId}
              onSelect={handleSelect}
              formValues={formValues}
              onFieldChange={handleFieldChange}
              formFooter={
                <Button
                  variant="primary"
                  fullWidth
                  disabled={invoices.length === 0}
                  onClick={handlePayNow}
                  endIcon={<LockOutlinedIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    mt: 3,
                    minHeight: 44,
                    py: 1.375,
                    fontSize: 15,
                    fontWeight: 600,
                    borderRadius: '8px',
                    '& .MuiButton-endIcon': { ml: 0.75 },
                  }}
                >
                  Pay Now
                </Button>
              }
            />
          ) : null}

          {isProcessing ? (
            <Box sx={{ position: 'absolute', inset: 0, px: 3, py: 2.5, backgroundColor: theme.palette.surfaceWhite, zIndex: 1 }}>
              <PaymentMethodModalSkeleton />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.72)',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <PaymentMethodModalProcessing />
              </Box>
            </Box>
          ) : null}

          {isSuccess ? <PaymentMethodModalSuccess amountLabel={amountLabel} /> : null}
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: 360 },
            flexShrink: 0,
            backgroundColor: receiptBackground,
            px: 3,
            py: 2.5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <ReceiptLongOutlinedIcon sx={{ fontSize: 20, color: theme.palette.textSecondary3 }} />
              <Typography sx={{ fontSize: 15, fontWeight: 600, color: theme.palette.textSecondary3 }}>Receipt</Typography>
            </Stack>
            <IconButton onClick={handleClose} aria-label="Close" size="small" sx={{ color: theme.palette.textSecondary2, mr: -0.5 }}>
              <CloseIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Stack>

          <Box sx={{ flex: 1 }}>
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
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography sx={{ fontSize: 12, color: theme.palette.textSecondary3 }}>Subtotal</Typography>
                    <Typography sx={{ fontSize: 22, fontWeight: 700, color: theme.palette.textPrimary, lineHeight: 1.2 }}>
                      {formatInvoiceTotal(subtotal)}
                    </Typography>
                  </Stack>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Stack>
    </Dialog>
  );
}
