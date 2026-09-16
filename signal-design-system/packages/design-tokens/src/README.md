# Signal Design System — Tokens

Extracted tokens that **accurately represent** existing Signal Sales UI.

**Theme integration:** `src/theme/palette.js`, `typography.js`, and `breakpoints.js` read from these tokens
and keep the flat `theme.palette.*` / MUI typography / breakpoint APIs for the app.
Component overrides still contain many hardcoded values (not rewritten yet).
`global.scss` remains a parallel SCSS layer.

`customTheme.json` is **not** a source of truth.

## Structure

```
src/design-system/tokens/
├── colors.js
├── typography.js
├── spacing.js
├── radius.js
├── shadows.js
├── breakpoints.js
├── borders.js
├── index.js
└── README.md
```

---

## Approved decisions (token layer)

| Topic                 | Canonical / rule                                                               |
| --------------------- | ------------------------------------------------------------------------------ |
| Brand hover           | `#0059FF` (`primitive.blue.700` / `semantic.*.brandHover`)                     |
| `$blue-600` `#0058ff` | **Legacy / unused** in styles — documented only                                |
| `surfaceGreyLight`    | `#F5F5F6` (alias of grey-50 / greySubtle)                                      |
| Grey-800              | `#444446`                                                                      |
| Focus grey `#F2F4F7`  | **Focus ring only** (`semantic.focus.neutral`) — never surface/border fallback |
| Default radius        | `8px` (`radius.default` / `radius.md`)                                         |
| Role radii            | Keep `4px`, `12px`, pill, full                                                 |
| Default border width  | `1px`                                                                          |
| Type scale            | **MUI** `typography.variants`                                                  |
| SCSS headings         | **Legacy** — documented; not deleted in-app                                    |
| Shadows               | Observed named shadows only — no new elevation ladder                          |
| Spacing               | Observed values + composites — **no 4/8 grid**                                 |
| Success               | Role-split — do not merge                                                      |
| Error / alert         | Role-split — do not merge all reds                                             |
| Focus rings           | **Two** brand roles: solid + soft                                              |
| Select focus          | `#3F99FF` — component-specific                                                 |
| Status on subtle      | `#027A48` / `#DC6803` — keep separate from textSuccess/textWarning             |

---

## Colors

### Primitive (`colors.primitive`)

| Token                           | Value      | Notes                                   |
| ------------------------------- | ---------- | --------------------------------------- |
| `blue.500`                      | `#146dff`  | Brand default                           |
| `blue.600`                      | `#0058ff`  | **Legacy** — not brand hover            |
| `blue.700`                      | `#0059ff`  | Canonical hover step                    |
| `blue.400`                      | `#3f99ff`  | Also Select-family focus (component)    |
| `grey.50`                       | `#f5f5f6`  | Canonical light surface                 |
| `grey.800`                      | `#444446`  | Canonical; ignore customTheme `#424242` |
| `successScss.*` / `alertScss.*` | SCSS ramps | Legacy definitions                      |

### Semantic (`colors.semantic`)

| Group                                  | Key examples         | Value                             |
| -------------------------------------- | -------------------- | --------------------------------- |
| `text.success`                         | success text         | `#2E964B`                         |
| `border.success`                       | success border       | `#2E964B`                         |
| `surface.successStrong`                | strong fill          | `#31A150`                         |
| `surface.successSubtle`                | subtle bg            | `#EFF8EF`                         |
| `status.onSubtle.success`              | chip / badge on tint | `#027A48`                         |
| `status.onSubtle.warning`              | chip / badge on tint | `#DC6803`                         |
| `border.alert` / `surface.alertStrong` | alert strong         | `#E43F32`                         |
| `text.alert`                           | alert text           | `#B32318`                         |
| `surface.alertDisabled`                | disabled alert       | `#FECDCA`                         |
| `border.formError`                     | form error border    | `#DF372B` (not merged with alert) |
| `focus.brandSolid`                     | button focus fill    | `#E5F6FF`                         |
| `focus.brandSoft`                      | field focus fill     | `rgba(14, 165, 233, 0.1)`         |
| `focus.neutral`                        | grey control focus   | `#F2F4F7`                         |
| `focus.error`                          | error focus fill     | `#FEE4E2`                         |
| `surface.greyLight`                    | light surface        | `#F5F5F6`                         |
| `component.selectFocus`                | Select-family        | `#3F99FF`                         |

### Legacy (`colors.legacy`)

Document-only: `#0058ff`, palette `#f6f6f6` literal, customTheme grey.800, SCSS success/alert 500s.

---

## Typography

| Export                      | Role                                |
| --------------------------- | ----------------------------------- |
| `variants`                  | **Canonical** MUI scale             |
| `fontFamily` / `fontWeight` | Inter + 400/500/700                 |
| `scssSizeVariables`         | Legacy SCSS `$display-*` etc.       |
| `scssElementHeadings`       | Legacy `h1`/`h2`/`h3` element rules |

---

## Spacing

| Export                       | Role                                          |
| ---------------------------- | --------------------------------------------- |
| `scale`                      | Observed singles: 0,2,4,6,8,10,12,14,16,20,24 |
| `component.buttonPadding`    | `8px 14px`                                    |
| `component.inputPadding`     | `10px 14px`                                   |
| `component.chipPadding`      | `4px 8px`                                     |
| `component.tableCellPadding` | `12px 24px`                                   |
| `component.dialogPadding`    | `24px`                                        |

**Do not** enforce a 4px/8px grid.

---

## Radius

| Token                       | Value              | Role            |
| --------------------------- | ------------------ | --------------- |
| `default` / `md`            | `8px`              | Default control |
| `xs`                        | `4px`              | Checkbox        |
| `xl`                        | `12px`             | Dialog          |
| `pill` / `pillMax` / `full` | 100 / 1000px / 50% | Pills / circles |

---

## Shadows

| Token                                 | Role                           |
| ------------------------------------- | ------------------------------ |
| `focusBrandSolid` (+ WithSoft)        | Button brand focus             |
| `focusBrandSoft`                      | Field brand focus              |
| `focusNeutralWithSoft`                | Grey control focus (`#F2F4F7`) |
| `focusErrorWithSoft`                  | Error focus (`#FEE4E2`)        |
| `soft`, `dropdown`, `panel`, `modal*` | Observed elevations            |

Aliases `focusBrand` / `focusBrandRgba` / `focusGreyWithSoft` kept for back-compat.

---

## Borders

| Token                       | Value                          |
| --------------------------- | ------------------------------ |
| `width.default`             | `1px`                          |
| `color.alert`               | `#E43F32`                      |
| `color.formError`           | `#DF372B`                      |
| `overrideColor.selectFocus` | `#3F99FF` (component-specific) |

---

## Breakpoints

Unchanged from `src/theme/breakpoints.js`: xs 0, sm 600, md 960, lg 1280, mlgg 1325, mlg 1439, xl 1920.

---

## Intentionally not merged

- Success: `#2E964B` / `#31A150` / `#027A48` / `#5CB85C`
- Alert/error: `#E43F32` / `#DF372B` / `#B32318` / `#D9534F` / `#f04438` / `#D92D20`
- Focus rings: solid vs soft
- Select focus `#3F99FF` vs TextField `#146DFF`
- Status on-subtle vs generic textSuccess/textWarning
- MUI vs SCSS heading scales

---

## Out of scope

- Wiring tokens into `src/theme`
- Changing app components, SVGs, or `global.scss`
- Inventing spacing grids or elevation systems
