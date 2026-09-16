import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { InvoiceIcon } from './design-system';

export function InvoiceViewIconButton({ onClick, label }) {
  const theme = useTheme();

  return (
    <IconButton
      onClick={onClick}
      aria-label={label ?? 'View invoice PDF'}
      size="small"
      sx={{
        width: 28,
        height: 28,
        p: 0.75,
        borderRadius: '8px',
        border: `1px solid ${theme.palette.borderSubtle2}`,
        backgroundColor: theme.palette.surfaceGreySubtle,
        color: theme.palette.textSecondary2,
        '&:hover': {
          backgroundColor: theme.palette.surfaceWhite,
          borderColor: theme.palette.borderSubtle2,
          color: theme.palette.textSecondary2,
        },
      }}
    >
      <InvoiceIcon size={16} />
    </IconButton>
  );
}
