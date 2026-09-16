# @signal/design-tokens

Canonical **Signal Design System tokens**.

## Contents

- `colors` — primitive, semantic, legacy (approved role splits preserved)
- `typography` — font families, weights, MUI-aligned variants
- `spacing` — scale + component paddings
- `radius` — control radii (default 8px)
- `shadows` — elevation + focus rings (brandSolid vs brandSoft)
- `borders` — widths, semantic colors, component override colors (incl. Select `#3F99FF`)
- `breakpoints` — MUI breakpoint values

## Installation

```bash
npm install @signal/design-tokens
```

In this monorepo (workspace):

```bash
npm install
# resolves via packages/design-tokens
```

## Usage

```js
import { colors, spacing, typography, semantic as colorSemantic } from '@signal/design-tokens';
import { semantic } from '@signal/design-tokens/colors';
```

## Peer dependencies

None. Tokens are plain JavaScript objects.

## Notes

- Do **not** collapse intentional success / alert / focus / Select / status-on-subtle exceptions.
- Signal Sales continues to import tokens via `src/design-system/tokens/*` compatibility re-exports.
