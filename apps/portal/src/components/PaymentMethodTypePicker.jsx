import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { PaymentMethodLogoIcon } from './payment-method-logos';

export function PaymentMethodTypePicker({ methods, selectedId, onSelect, sx }) {
  const theme = useTheme();
  const accentColor = theme.palette.primary.main;
  const mutedColor = theme.palette.textSecondary3;

  return (
    <Stack
      direction="row"
      spacing={1.25}
      flexWrap="wrap"
      sx={{ mb: 2, width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', ...sx }}
    >
      {methods.map(({ id, label, Logo, preserveLogoColor }) => {
        const isSelected = selectedId === id;
        const muteLogo = !isSelected && !preserveLogoColor;

        return (
          <Box
            key={id}
            component="button"
            type="button"
            onClick={() => onSelect(id)}
            sx={{
              flex: '0 0 auto',
              width: 120,
              height: 82,
              m: 0,
              p: 1.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: 0.75,
              boxSizing: 'border-box',
              border: `1px solid ${isSelected ? accentColor : theme.palette.borderSubtle1}`,
              borderRadius: '12px',
              backgroundColor: theme.palette.surfaceWhite,
              cursor: 'pointer',
              textAlign: 'left',
              font: 'inherit',
              transition: 'border-color 0.15s ease, color 0.15s ease',
              '&:hover': {
                borderColor: isSelected ? accentColor : theme.palette.borderSubtle2,
              },
            }}
          >
            <Box
              sx={{
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                overflow: 'visible',
                color: isSelected ? accentColor : mutedColor,
                filter: muteLogo ? 'grayscale(1)' : 'none',
                opacity: isSelected ? 1 : muteLogo ? 0.7 : 1,
              }}
            >
              <PaymentMethodLogoIcon Logo={Logo} size={32} />
            </Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: isSelected ? 600 : 500,
                lineHeight: '16px',
                color: isSelected ? accentColor : mutedColor,
                alignSelf: 'stretch',
              }}
            >
              {label}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
}
