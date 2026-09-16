import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { component as spacingComponent } from '@signal/design-tokens/spacing';
import { useAuth } from '../auth/AuthContext';
import { Button } from './design-system';

export function AppLayout({ title, children }) {
  const theme = useTheme();
  const { session, logout } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Box
        component="header"
        sx={{
          backgroundColor: theme.palette.surfaceWhite,
          borderBottom: `1px solid ${theme.palette.borderSubtle1}`,
          px: spacingComponent.dialogPadding,
          py: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ maxWidth: 1200, mx: 'auto' }}
        >
          <Typography variant="h4" sx={{ color: theme.palette.textPrimary }}>
            {title}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" sx={{ color: theme.palette.textSecondary2 }}>
              {session?.email}
            </Typography>
            <Button variant="secondaryGrey" onClick={logout}>
              Log out
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box
        component="main"
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          p: spacingComponent.dialogPadding,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
