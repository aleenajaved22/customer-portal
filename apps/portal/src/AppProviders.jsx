import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { createSignalTheme } from '@signal/theme';
import { AuthProvider } from './auth/AuthContext';
import { PaymentMethodsProvider } from './context/PaymentMethodsContext';

const INTER_FONT = '"Inter", sans-serif';

const baseTheme = createSignalTheme();

const theme = createTheme(baseTheme, {
  typography: {
    fontFamily: INTER_FONT,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          fontFamily: INTER_FONT,
        },
        body: {
          margin: 0,
          backgroundColor: '#ffffff',
          color: baseTheme.palette.textPrimary,
          fontFamily: INTER_FONT,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '#root': {
          margin: 0,
          fontFamily: INTER_FONT,
        },
      },
    },
  },
});

export function AppProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <PaymentMethodsProvider>{children}</PaymentMethodsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
