# How to use Signal Design System in a NEW project

## In plain English

Think of three boxes:

1. **Paint cans** = `@signal/design-tokens` (colors, spacing, fonts)
2. **Paint job for MUI** = `@signal/theme` (makes every MUI button/field look Signal)
3. **Building blocks** = MUI itself (`Button`, `TextField`, …)

You tell the agent: *“Use MUI.”*  
You wrap the app in the Signal theme **once**.  
Then everything looks like Signal — flat, grey page background, blue brand, 8px corners.

Optional: `@signal/ui` is the same MUI pieces with a Signal package name. Not required if you use theme + MUI.

---

## What to install in your other project

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @signal/design-tokens @signal/theme
```

If packages are local (monorepo / folder copy):

```json
"workspaces": ["packages/*"]
```

or file links:

```json
"dependencies": {
  "@signal/design-tokens": "file:../path/to/packages/design-tokens",
  "@signal/theme": "file:../path/to/packages/theme"
}
```

---

## What to paste in your app (minimum)

**`src/main.jsx` or `src/App.jsx`:**

```jsx
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createSignalTheme } from '@signal/theme';

const theme = createSignalTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* your pages */}
    </ThemeProvider>
  );
}
```

**On a page (example):**

```jsx
import { Box, Button, TextField, Chip, Typography } from '@mui/material';

export function ExamplePage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Your reports</Typography>
      <Typography color="text.secondary">Browse and search available reports</Typography>
      <TextField fullWidth placeholder="Search reports..." sx={{ my: 2 }} />
      <Button variant="primary">Export</Button>
      <Chip label="Ready" color="success" size="small" sx={{ ml: 1 }} />
    </Box>
  );
}
```

---

## Checklist for a new project

- [ ] Install MUI + Emotion  
- [ ] Install `@signal/design-tokens` + `@signal/theme`  
- [ ] Wrap root in `ThemeProvider` + `createSignalTheme()` + `CssBaseline`  
- [ ] Use MUI components (not random CSS button kits)  
- [ ] Primary actions: `variant="primary"` (Signal theme variant)  
- [ ] Page background comes from theme (`CssBaseline` / `background.default`)  
- [ ] Copy the **signal-design-system skill** into the new project’s `.cursor/skills/` so agents follow the same rules  

---

## Packages in this folder

| Folder | Package name | Purpose |
|--------|--------------|---------|
| `design-tokens/` | `@signal/design-tokens` | Colors, spacing, type, radius… |
| `theme/` | `@signal/theme` | MUI ThemeProvider look & feel |
| `ui/` | `@signal/ui` | Optional thin wrappers around MUI |

---

## What this does NOT include

- Side navigation / app shell layout components (build in your app; skill describes the pattern)
- Sales pages, APIs, Redux
- Tables/search product shells (use MUI Table + themed TextField, or your own)

---

## Agent one-liner

> Use MUI. Wrap the app with `createSignalTheme` from `@signal/theme`. Follow the Signal Design System skill for layout (flat UI, grey page bg, title → search/actions → content).
