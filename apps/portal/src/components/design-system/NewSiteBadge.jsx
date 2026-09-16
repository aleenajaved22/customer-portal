import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import newBadgeIcon from '../../assets/new-badge-icon.svg';

export function NewSiteBadge() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        pl: '6px',
        pr: '8px',
        py: '2px',
        borderRadius: '16px',
        backgroundColor: theme.palette.surfaceBrandSubtle,
        color: theme.palette.textBrand,
      }}
    >
      <Box
        component="img"
        src={newBadgeIcon}
        alt=""
        aria-hidden
        sx={{ width: 12, height: 12, display: 'block', flexShrink: 0 }}
      />
      <Typography
        component="span"
        sx={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '18px',
          color: theme.palette.textBrand,
          whiteSpace: 'nowrap',
        }}
      >
        New
      </Typography>
    </Box>
  );
}
