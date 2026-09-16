import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { PAYMENT_METHOD_CATEGORIES, getPaymentMethodRowDisplay, getPaymentMethodType } from '../data/paymentMethodCategories';
import { PAYMENT_METHOD_TYPES, PaymentMethodLogoIcon } from './payment-method-logos';

function MethodLogoTile({ Logo }) {
  const theme = useTheme();

  if (!Logo) return null;

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.textSecondary2,
      }}
    >
      <PaymentMethodLogoIcon Logo={Logo} size={32} />
    </Box>
  );
}

export function SavedPaymentMethodPicker({ methods, selectedId, onSelect }) {
  const theme = useTheme();

  const categoriesWithMethods = PAYMENT_METHOD_CATEGORIES.map((category) => ({
    ...category,
    methods: methods.filter((method) => method.typeId === category.typeId),
  })).filter((category) => category.methods.length > 0);

  if (methods.length === 0) {
    return (
      <Typography sx={{ fontSize: 13, color: theme.palette.textSecondary3 }}>
        No saved payment methods yet. Add one in Card Management or use a new method below.
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {categoriesWithMethods.map((category) => (
        <Box key={category.typeId}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: theme.palette.textPrimary, mb: 1 }}>
            {category.title}
          </Typography>
          <Stack spacing={1}>
            {category.methods.map((method) => {
              const type = getPaymentMethodType(method.typeId, PAYMENT_METHOD_TYPES);
              const Logo = type?.Logo;
              const display = getPaymentMethodRowDisplay(method);
              const isSelected = method.id === selectedId;

              return (
                <Box
                  key={method.id}
                  component="button"
                  type="button"
                  onClick={() => onSelect(method.id)}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    px: 2,
                    py: 1.25,
                    border: `1px solid ${isSelected ? theme.palette.primary.main : theme.palette.borderSubtle1}`,
                    borderRadius: '8px',
                    backgroundColor: isSelected ? theme.palette.surfaceBrandSubtle : theme.palette.surfaceWhite,
                    cursor: 'pointer',
                    textAlign: 'left',
                    font: 'inherit',
                    transition: 'border-color 0.15s ease, background-color 0.15s ease',
                  }}
                >
                  <MethodLogoTile Logo={Logo} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: theme.palette.textPrimary,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {display.primary}
                    </Typography>
                    {display.secondary ? (
                      <Typography sx={{ fontSize: 13, color: theme.palette.textSecondary3 }}>{display.secondary}</Typography>
                    ) : null}
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
