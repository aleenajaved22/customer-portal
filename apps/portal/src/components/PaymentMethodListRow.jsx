import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getPaymentMethodRowDisplay, getPaymentMethodType } from '../data/paymentMethodCategories';
import { PAYMENT_METHOD_TYPES, PaymentMethodLogoIcon } from './payment-method-logos';
import { BRAND_SLOT, PaymentBrandMark, getPaymentBrandMark } from './payment-brand-marks';

/** Brand mark when we have an official one, otherwise the generic type glyph — same slot either way. */
function MethodMarkSlot({ method, Logo }) {
  const theme = useTheme();
  const brandId = method.typeId === 'credit-card' ? method.details?.brand : method.typeId;
  const hasBrandMark = Boolean(getPaymentBrandMark(brandId));

  return (
    <Box
      sx={{
        width: BRAND_SLOT.width,
        height: BRAND_SLOT.height,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
      }}
    >
      {hasBrandMark ? (
        <PaymentBrandMark brandId={brandId} />
      ) : Logo ? (
        <Box sx={{ color: theme.palette.textSecondary2, display: 'flex' }}>
          <PaymentMethodLogoIcon Logo={Logo} size={24} />
        </Box>
      ) : null}
    </Box>
  );
}

/** Ghost action — invisible until the row is hovered, always visible on keyboard focus. */
function RowAction({ label, icon, onClick }) {
  const theme = useTheme();

  return (
    <IconButton
      size="small"
      aria-label={label}
      onClick={onClick}
      sx={{
        width: 30,
        height: 30,
        border: 'none',
        backgroundColor: 'transparent',
        color: theme.palette.textSecondary3,
        opacity: 0,
        transition: 'opacity 0.15s ease, color 0.15s ease',
        '&:hover': { backgroundColor: 'transparent', color: theme.palette.textPrimary },
        '&:focus-visible': { opacity: 1 },
        '.payment-method-row:hover &': { opacity: 1 },
        // Touch devices get no hover, so keep the actions visible there.
        '@media (hover: none)': { opacity: 1 },
      }}
    >
      {icon}
    </IconButton>
  );
}

export function PaymentMethodListRow({ method, onEdit, onRemove, showActions = true, isFirst = false }) {
  const theme = useTheme();
  const type = getPaymentMethodType(method.typeId, PAYMENT_METHOD_TYPES);
  const display = getPaymentMethodRowDisplay(method);

  return (
    <Box
      className="payment-method-row"
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, md: 2 },
        py: 1.5,
        // Listing style: a hairline between items, no surrounding container.
        borderTop: isFirst ? 'none' : `1px solid ${theme.palette.borderSubtle1}`,
      }}
    >
      <MethodMarkSlot method={method} Logo={type?.Logo} />

      <Box sx={{ flex: '0 1 240px', minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: theme.palette.textPrimary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 0.25,
          }}
        >
          {display.primary}
        </Typography>
        <Typography sx={{ fontSize: 12, lineHeight: '18px', color: theme.palette.textSecondary3 }}>
          {display.reference}
        </Typography>
      </Box>

      {/* Every remaining stored field for this type, label + value. */}
      <Stack
        direction="row"
        spacing={4}
        sx={{ flexShrink: 0, display: { xs: 'none', md: 'flex' } }}
      >
        {display.fields.map((field) => (
          <Box key={field.label} sx={{ minWidth: field.minWidth ?? 92 }}>
            <Typography sx={{ fontSize: 12, color: theme.palette.textSecondary3, mb: 0.25 }}>
              {field.label}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 500,
                fontVariantNumeric: 'tabular-nums',
                color: theme.palette.textPrimary,
                whiteSpace: 'nowrap',
              }}
            >
              {field.value}
            </Typography>
          </Box>
        ))}
      </Stack>

      {/* Absorbs the slack so the data stays grouped left and actions stay right. */}
      <Box sx={{ flex: 1, minWidth: 8 }} />

      {showActions ? (
        <Stack direction="row" spacing={0.25} sx={{ flexShrink: 0 }}>
          <RowAction
            label={`Edit ${display.primary}`}
            icon={<EditOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={() => onEdit?.(method)}
          />
          <RowAction
            label={`Remove ${display.primary}`}
            icon={<DeleteOutlineIcon sx={{ fontSize: 18 }} />}
            onClick={() => onRemove?.(method.id)}
          />
        </Stack>
      ) : null}
    </Box>
  );
}
