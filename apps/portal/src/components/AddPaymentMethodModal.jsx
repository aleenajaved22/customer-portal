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
import { PaymentMethodTypePicker } from './PaymentMethodTypePicker';
import { EMPTY_PAYMENT_METHOD_FORMS, buildDetailsFromForm } from '../data/paymentMethodCategories';

export function AddPaymentMethodModal({ open, onClose, onSave, title = 'Add payment method', initialTypeId }) {
  const theme = useTheme();
  const [selectedId, setSelectedId] = useState(PAYMENT_METHOD_TYPES[0].id);
  const [formValues, setFormValues] = useState(EMPTY_PAYMENT_METHOD_FORMS[PAYMENT_METHOD_TYPES[0].id]);

  useEffect(() => {
    if (!open) return;
    const typeId = initialTypeId ?? PAYMENT_METHOD_TYPES[0].id;
    setSelectedId(typeId);
    setFormValues({ ...EMPTY_PAYMENT_METHOD_FORMS[typeId] });
  }, [open, initialTypeId]);

  const handleTypeChange = (typeId) => {
    setSelectedId(typeId);
    setFormValues({ ...EMPTY_PAYMENT_METHOD_FORMS[typeId] });
  };

  const handleFieldChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const details = buildDetailsFromForm(selectedId, formValues);
    onSave?.(selectedId, details);
    onClose?.();
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
        <PaymentMethodTypePicker methods={PAYMENT_METHOD_TYPES} selectedId={selectedId} onSelect={handleTypeChange} />

        <Divider sx={{ mb: 2.5, borderColor: theme.palette.borderSubtle1 }} />

        <PaymentMethodFormFields methodId={selectedId} values={formValues} onChange={handleFieldChange} />

        <Button variant="primary" fullWidth onClick={handleSave} sx={{ mt: 3, py: 1.25, fontWeight: 600, borderRadius: '8px' }}>
          Save payment method
        </Button>
      </Box>
    </Dialog>
  );
}
