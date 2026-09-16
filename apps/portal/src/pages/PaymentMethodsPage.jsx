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
import { Button } from '../components/design-system';
import { usePaymentMethods } from '../context/PaymentMethodsContext';
import { PAYMENT_METHOD_CATEGORIES, getPaymentMethodType } from '../data/paymentMethodCategories';
import { PAYMENT_METHOD_TYPES } from '../components/payment-method-logos';

export function PaymentMethodsPage() {
  const theme = useTheme();
  const { methods, defaultMethodId, addPaymentMethod, setDefaultPaymentMethod, removePaymentMethod } =
    usePaymentMethods();
  const [addOpen, setAddOpen] = useState(false);
  const [addCategory, setAddCategory] = useState(null);

  const openAddPaymentMethod = () => {
    setAddCategory(null);
    setAddOpen(true);
  };

  return (
    <PortalShell activeNav="invoice-payment">
      <Stack spacing={3} sx={{ width: '100%', maxWidth: 1200, mx: 'auto', px: { xs: 0, md: 1 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 22, fontWeight: 600 }}>Card Management</Typography>
            <Typography sx={{ fontSize: 14, color: theme.palette.textSecondary2 }}>
              One active payment method at a time. Select a row to make it active for invoice payments.
            </Typography>
          </Box>
          <Button
            variant="primary"
            onClick={openAddPaymentMethod}
            startIcon={<AddIcon sx={{ fontSize: 18 }} />}
            sx={{ flexShrink: 0, alignSelf: { xs: 'flex-start', sm: 'center' } }}
          >
            Add Payment method
          </Button>
        </Stack>

        <Box>
          {PAYMENT_METHOD_CATEGORIES.map((category, categoryIndex) => {
            const categoryMethods = methods.filter((method) => method.typeId === category.typeId);

            return (
              <Box key={category.typeId}>
                {categoryIndex > 0 ? (
                  <Divider sx={{ borderColor: theme.palette.borderSubtle1 }} />
                ) : null}
                <Box sx={{ py: 2 }}>
                  <Typography sx={{ fontSize: 16, fontWeight: 600, color: theme.palette.textPrimary, mb: 1.5 }}>
                    {category.title}
                  </Typography>

                  {categoryMethods.length === 0 ? (
                    <Typography sx={{ fontSize: 13, color: theme.palette.textSecondary3, py: 1.5 }}>
                      No {category.title.toLowerCase()} saved yet.
                    </Typography>
                  ) : (
                    <Box
                      sx={{
                        border: `1px solid ${theme.palette.borderSubtle1}`,
                        borderRadius: '12px',
                        backgroundColor: theme.palette.surfaceWhite,
                        overflow: 'hidden',
                      }}
                    >
                      <Stack spacing={0}>
                        {categoryMethods.map((method, index) => (
                          <PaymentMethodListRow
                            key={method.id}
                            method={method}
                            isActive={method.id === defaultMethodId}
                            onActivate={setDefaultPaymentMethod}
                            onRemove={removePaymentMethod}
                            isFirst={index === 0}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
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
        }}
        onSave={(typeId, details) =>
          addPaymentMethod(typeId, details, { makeDefault: methods.length === 0 || !defaultMethodId })
        }
        title={
          addCategory
            ? `Add ${getPaymentMethodType(addCategory, PAYMENT_METHOD_TYPES)?.label ?? 'payment method'}`
            : 'Add payment method'
        }
        initialTypeId={addCategory ?? undefined}
      />
    </PortalShell>
  );
}
