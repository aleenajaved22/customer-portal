import { createTheme } from '@mui/material/styles';
import borders from '@signal/design-tokens/borders';
import { values as breakpointValues } from '@signal/design-tokens/breakpoints';
import colors, { semantic as colorSemantic } from '@signal/design-tokens/colors';
import radius from '@signal/design-tokens/radius';
import shadows from '@signal/design-tokens/shadows';
import spacing from '@signal/design-tokens/spacing';
import { fontFamily, variants as typographyVariants } from '@signal/design-tokens/typography';

import overrides from './overrides';
import palette from './palette';

/**
 * Create the Signal MUI theme.
 *
 * Wrap your app once:
 *
 *   import { ThemeProvider } from '@mui/material/styles';
 *   import { createSignalTheme } from '@signal/theme';
 *
 *   <ThemeProvider theme={createSignalTheme()}>
 *     <App />
 *   </ThemeProvider>
 *
 * Then use normal MUI components (Button, TextField, Chip, …).
 * Signal look comes from this theme — you do not need custom CSS for basics.
 */
export function createSignalTheme() {
  const componentOverrides = overrides({ palette });

  const theme = createTheme({
    breakpoints: { values: breakpointValues },
    palette,
    typography: {
      fontFamily: fontFamily.sans,
      ...typographyVariants,
    },
    shape: {
      borderRadius: 8,
    },
    spacing: spacing.muiDefaultUnit,
    components: {
      MuiButton: componentOverrides.MuiButton,
      // Sales styles OutlinedInput via the TextField override file
      MuiOutlinedInput: componentOverrides.MuiTextField,
      MuiSwitch: componentOverrides.MuiSwitch,
      MuiRadio: componentOverrides.MuiRadio,
      MuiCheckbox: componentOverrides.MuiCheckbox,
      MuiInputLabel: componentOverrides.MuiInputLabel,
      MuiChip: componentOverrides.MuiChip,
      MuiSelect: componentOverrides.MuiSelect,
      MuiMenuItem: componentOverrides.MuiMenuItem,
      MuiTooltip: componentOverrides.MuiTooltip,
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: colorSemantic.surface.greySubtle,
            color: colorSemantic.text.primary,
          },
        },
      },
    },
  });

  theme.designSystem = {
    colors,
    spacing,
    radius,
    shadows,
    borders,
    focus: colorSemantic.focus,
    status: colorSemantic.status,
    component: colorSemantic.component,
  };

  return theme;
}

export { createSignalTheme as default };
