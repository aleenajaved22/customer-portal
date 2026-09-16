# @signal/ui

Reusable **Signal Design System** UI primitives built as thin wrappers around MUI.

## Contents

| Component | Notes |
|-----------|--------|
| Button | Theme variants remain visual SoT in host theme |
| TextField | Host theme styles `MuiOutlinedInput` |
| Checkbox, Radio, Switch | MUI + host overrides |
| Tooltip, Chip, Select | MUI + host overrides; Select focus/error stay distinct |
| Tabs, Tab | Thin MUI wrappers |
| Dialog, Modal, Drawer | Shells only |
| Pagination | Presentational `TablePagination` |
| EmptyState | Presentational; no default i18n/icons |
| Search | Presentational search field (no debounce/API) |
| Autocomplete | Thin MUI wrapper |

## Intentionally excluded

CustomDropDown, TableComponent, Toast, DatePicker / DateRangePicker / TimePicker, ConfirmationDialog, SelectInput, CustomInput / FormField, maps, ACL, Stripe, sales/HO domain components, Redux/API/routing widgets.

## Installation

```bash
npm install @signal/ui @signal/design-tokens
# peer deps:
npm install react react-dom @mui/material @emotion/react @emotion/styled
```

## Usage

```jsx
import { Button, TextField, Select } from '@signal/ui';
import { colors, spacing } from '@signal/design-tokens';

export function Example() {
  return (
    <>
      <Button variant="primary">Save</Button>
      <TextField placeholder="Name" />
    </>
  );
}
```

## Peer dependencies

| Package | Version |
|---------|---------|
| `react` | ^17 \|\| ^18 |
| `react-dom` | ^17 \|\| ^18 |
| `@mui/material` | ^5.14 |
| `@emotion/react` | ^11.11 |
| `@emotion/styled` | ^11.11 |
| `prop-types` | ^15.8 (optional) |

## How theme is expected to be provided

`@signal/ui` components are **thin MUI wrappers**. Signal visual chrome (button variants, field borders/focus, chip status colors, etc.) lives in the **host application’s MUI theme** (`ThemeProvider`).

For Signal Sales, that theme is `src/theme` (already wired to design tokens).

For a **new Signal portal**:

1. Wrap the app in MUI `ThemeProvider`.
2. Reuse or port the Signal Sales theme overrides for the components you use (especially `MuiButton`, `MuiOutlinedInput` / text field styles, `MuiCheckbox`, `MuiRadio`, `MuiSwitch`, `MuiChip`, `MuiSelect`, `MuiTooltip`, `MuiInputLabel`).
3. Expose tokens on the theme (Sales uses `theme.designSystem`) if your overrides read them.
4. Keep approved exceptions (Select focus `#3F99FF`, dual focus rings, status-on-subtle colors).

A standalone `@signal/ui` theme package is **not** shipped yet — that remains host coupling (see remaining coupling notes).

## Tokens

UI depends on `@signal/design-tokens` (e.g. EmptyState text color). Do not duplicate token files inside `@signal/ui`.
