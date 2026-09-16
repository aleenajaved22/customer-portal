import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { PortalShell } from '../components/PortalShell';
import { AddPaymentMethodModal } from '../components/AddPaymentMethodModal';
import { PaymentMethodListRow } from '../components/PaymentMethodListRow';
import { Button, PageHeader } from '../components/design-system';
import { usePaymentMethods } from '../context/PaymentMethodsContext';
import { PAYMENT_METHOD_CATEGORIES, getPaymentMethodType } from '../data/paymentMethodCategories';
import { getSampleMethods } from '../data/samplePaymentMethods';
import { PAYMENT_METHOD_TYPES } from '../components/payment-method-logos';

/**
 * Prefill the edit form from stored details. Secrets we deliberately never keep
 * (full card number, CVV, PayPal password) come back blank and must be re-entered.
 */
function getEditFormValues(method) {
  const d = method.details ?? {};
  switch (method.typeId) {
    case 'credit-card':
      return {
        nameOnCard: d.nameOnCard ?? '',
        expiryMonth: d.expiryMonth ?? '',
        // The field takes two digits; stored years may be four.
        expiryYear: String(d.expiryYear ?? '').slice(-2),
      };
    case 'ach':
      return { routingNumber: d.routingNumber ?? '', accountHolderName: d.accountHolderName ?? '' };
    case 'paypal':
      return { email: d.email ?? '' };
    case 'zelle':
      return { contact: d.contact ?? '', nickname: d.nickname ?? '' };
    case 'venmo':
      return { username: d.username ?? '', phone: d.phone ?? '' };
    default:
      return {};
  }
}

export function PaymentMethodsPage() {
  const theme = useTheme();
  const { methods, defaultMethodId, addPaymentMethod, removePaymentMethod, updatePaymentMethod } =
    usePaymentMethods();
  const [addOpen, setAddOpen] = useState(false);
  const [addCategory, setAddCategory] = useState(null);
  const [editingMethod, setEditingMethod] = useState(null);

  const openAddPaymentMethod = () => {
    setAddCategory(null);
    setEditingMethod(null);
    setAddOpen(true);
  };

  /** Re-open the form for an existing method, prefilled with what we still hold. */
  const openEditPaymentMethod = (method) => {
    setEditingMethod(method);
    setAddCategory(method.typeId);
    setAddOpen(true);
  };

  return (
    <PortalShell activeNav="invoice-payment">
      <Stack spacing={2.5} sx={{ width: '100%' }}>
        <PageHeader
          title="Card Management"
          description="Saved payment methods for this account. Choose which one to use when you pay an invoice."
          actions={
            <Button
              variant="primary"
              onClick={openAddPaymentMethod}
              startIcon={<AddIcon sx={{ fontSize: 18 }} />}
            >
              Add Payment method
            </Button>
          }
        />

        <Box>
          {PAYMENT_METHOD_CATEGORIES.map((category, categoryIndex) => {
            const categoryMethods = methods.filter((method) => method.typeId === category.typeId);
            // Never show an empty category — fall back to display-only sample rows.
            const rows = categoryMethods.length > 0 ? categoryMethods : getSampleMethods(category.typeId);

            return (
              <Box key={category.typeId}>
                {categoryIndex > 0 ? (
                  <Divider sx={{ borderColor: theme.palette.borderSubtle1 }} />
                ) : null}
                <Box sx={{ py: 2 }}>
                  {/* Group eyebrow — deliberately distinct from the 16/600 row name below it. */}
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      lineHeight: '18px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: theme.palette.textSecondary3,
                      mb: 1,
                    }}
                  >
                    {category.title}
                  </Typography>

                  <Stack spacing={0}>
                    {rows.map((method, index) => (
                      <PaymentMethodListRow
                        key={method.id}
                        method={method}
                        onEdit={openEditPaymentMethod}
                        onRemove={removePaymentMethod}
                        showActions={!method.isSample}
                        isFirst={index === 0}
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Stack>

      <AddPaymentMethodModal
        open={addOpen}
        onClose={() => {
          setAddOpen(false);
          setAddCategory(null);
          setEditingMethod(null);
        }}
        onSave={(typeId, details) => {
          if (editingMethod) {
            updatePaymentMethod(editingMethod.id, typeId, details);
            return;
          }
          addPaymentMethod(typeId, details, { makeDefault: methods.length === 0 || !defaultMethodId });
        }}
        initialValues={editingMethod ? getEditFormValues(editingMethod) : undefined}
        lockType={Boolean(editingMethod)}
        saveLabel={editingMethod ? 'Save changes' : undefined}
        title={
          editingMethod
            ? `Edit ${getPaymentMethodType(editingMethod.typeId, PAYMENT_METHOD_TYPES)?.label ?? 'payment method'}`
            : addCategory
            ? `Add ${getPaymentMethodType(addCategory, PAYMENT_METHOD_TYPES)?.label ?? 'payment method'}`
            : 'Add payment method'
        }
        initialTypeId={addCategory ?? undefined}
      />
    </PortalShell>
  );
}
