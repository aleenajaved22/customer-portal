import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export function PageHeader({ title, description }) {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ color: theme.palette.textPrimary, mb: description ? 0.5 : 0 }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" sx={{ color: theme.palette.textSecondary2 }}>
          {description}
        </Typography>
      ) : null}
    </Box>
  );
}
