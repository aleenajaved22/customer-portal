# @signal/theme

Applies **Signal look and feel** to any React app that uses MUI.

## Install

```bash
npm install @signal/theme @signal/design-tokens
npm install @mui/material @emotion/react @emotion/styled react react-dom
```

## Use (once, at app root)

```jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createSignalTheme } from '@signal/theme';

const theme = createSignalTheme();

export function AppRoot() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* your routes / pages */}
    </ThemeProvider>
  );
}
```

Then use normal MUI:

```jsx
import { Button, TextField, Chip } from '@mui/material';

<Button variant="primary">Save</Button>
<TextField placeholder="Search…" />
<Chip label="Ready" color="success" size="small" />
```
