import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { component as spacingComponent } from '@signal/design-tokens/spacing';
import radius from '@signal/design-tokens/radius';
import shadows from '@signal/design-tokens/shadows';

export function SurfaceCard({ children, maxWidth = 420, ...rest }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        maxWidth,
        p: spacingComponent.dialogPadding,
        borderRadius: radius.default,
        backgroundColor: theme.palette.surfaceWhite,
        border: `1px solid ${theme.palette.borderSubtle1}`,
        boxShadow: shadows.soft,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
}
