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
        p: 0.5,
        borderRadius: 0,
        border: 'none',
        backgroundColor: 'transparent',
        color: theme.palette.textSecondary2,
        '&:hover': {
          backgroundColor: 'transparent',
          color: theme.palette.textPrimary,
        },
      }}
    >
      <InvoiceIcon size={16} />
    </IconButton>
  );
}
