import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@signal/ui';

/**
 * The single page-title treatment for the portal.
 *
 * Uses the design system's h3 step (20/700) rather than h5 (14/700) — h5 is the
 * same size as body text, which is why a page title built on it never read as one.
 * `actions` keeps the page-level control on the title baseline instead of each
 * page inventing its own header row.
 */
export function PageHeader({ title, description, actions, onBack, backLabel = 'Back' }) {
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      spacing={2}
      sx={{ width: '100%' }}
    >
      <Box sx={{ minWidth: 0 }}>
        {onBack ? (
          <Button
            variant="tertiaryGrey"
            onClick={onBack}
            startIcon={<ChevronLeftIcon sx={{ fontSize: 18 }} />}
            sx={{
              minWidth: 'auto',
              height: 24,
              px: 0,
              mb: 0.5,
              fontSize: 13,
              fontWeight: 500,
              '&:hover': { backgroundColor: 'transparent', color: theme.palette.textPrimary },
              '& .MuiButton-startIcon': { mr: 0.25, ml: 0 },
            }}
          >
            {backLabel}
          </Button>
        ) : null}
        <Typography
          component="h1"
          sx={{
            fontSize: 20,
            fontWeight: 700,
            lineHeight: '28px',
            color: theme.palette.textPrimary,
          }}
        >
          {title}
        </Typography>
        {description ? (
          <Typography
            sx={{
              mt: 0.25,
              fontSize: 14,
              fontWeight: 400,
              lineHeight: '20px',
              color: theme.palette.textSecondary2,
            }}
          >
            {description}
          </Typography>
        ) : null}
      </Box>
      {actions ? <Box sx={{ flexShrink: 0 }}>{actions}</Box> : null}
    </Stack>
  );
}
