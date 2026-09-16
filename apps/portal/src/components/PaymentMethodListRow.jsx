import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import RemoveIcon from '@mui/icons-material/Remove';
import { getPaymentMethodRowDisplay, getPaymentMethodType } from '../data/paymentMethodCategories';
import { PAYMENT_METHOD_TYPES, PaymentMethodLogoIcon } from './payment-method-logos';

function MethodLogoTile({ typeId, Logo }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
        minWidth: 40,
      }}
    >
      {typeId === 'credit-card' ? (
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            fontStyle: 'italic',
            letterSpacing: '0.06em',
            color: '#1A1F71',
            lineHeight: 1,
          }}
        >
          VISA
        </Typography>
      ) : Logo ? (
        <Box sx={{ color: theme.palette.textSecondary2 }}>
          <PaymentMethodLogoIcon Logo={Logo} size={32} />
        </Box>
      ) : null}
    </Box>
  );
}

export function PaymentMethodListRow({
  method,
  isActive,
  onActivate,
  onRemove,
  showRemove = true,
  isFirst = false,
}) {
  const theme = useTheme();
  const type = getPaymentMethodType(method.typeId, PAYMENT_METHOD_TYPES);
  const Logo = type?.Logo;
  const display = getPaymentMethodRowDisplay(method);
  const rowBorder = `1px solid ${theme.palette.borderSubtle1}`;

  return (
    <Box
      component={isActive ? 'div' : 'button'}
      type={isActive ? undefined : 'button'}
      onClick={() => {
        if (!isActive) onActivate?.(method.id);
      }}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.5, md: 2 },
        px: 2,
        py: 1.25,
        border: 'none',
        borderTop: isFirst ? 'none' : rowBorder,
        borderBottom: 'none',
        borderRadius: 0,
        backgroundColor: isActive ? theme.palette.surfaceBrandSubtle : 'transparent',
        cursor: isActive ? 'default' : 'pointer',
        textAlign: 'left',
        font: 'inherit',
        transition: 'background-color 0.15s ease',
        '&:hover': isActive
          ? {}
          : {
              backgroundColor: theme.palette.surfaceGreySubtle,
            },
      }}
    >
      <MethodLogoTile typeId={method.typeId} Logo={Logo} />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 15,
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
        <Typography sx={{ fontSize: 13, color: theme.palette.textSecondary3 }}>{display.reference}</Typography>
      </Box>

      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: theme.palette.textPrimary,
          flexShrink: 0,
          display: { xs: 'none', sm: 'block' },
          minWidth: 128,
          textAlign: 'right',
          whiteSpace: 'nowrap',
        }}
      >
        {display.accountCode}
      </Typography>

      {isActive ? (
        <Box
          sx={{
            flexShrink: 0,
            px: 1.25,
            py: 0.5,
            borderRadius: '999px',
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.surfaceWhite,
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: theme.palette.primary.main }}>Active</Typography>
        </Box>
      ) : (
        <Typography
          sx={{
            flexShrink: 0,
            fontSize: 13,
            fontWeight: 500,
            color: theme.palette.textSecondary3,
            display: { xs: 'none', lg: 'block' },
          }}
        >
          Set active
        </Typography>
      )}

      {showRemove ? (
        <IconButton
          size="small"
          aria-label="Remove payment method"
          onClick={(event) => {
            event.stopPropagation();
            onRemove?.(method.id);
          }}
          sx={{
            flexShrink: 0,
            width: 36,
            height: 36,
            border: `1px solid ${theme.palette.borderSubtle1}`,
            backgroundColor: theme.palette.surfaceWhite,
            color: theme.palette.textSecondary2,
            '&:hover': {
              backgroundColor: theme.palette.surfaceGreySubtle,
              borderColor: theme.palette.borderSubtle2,
            },
          }}
        >
          <RemoveIcon sx={{ fontSize: 18 }} />
        </IconButton>
      ) : null}
    </Box>
  );
}
