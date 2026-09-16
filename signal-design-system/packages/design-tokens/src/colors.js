/**
 * Signal Design System — Color tokens
 *
 * Reflects existing Signal Sales UI after conflict analysis (approved decisions).
 * Consumed by src/theme/palette.js (flat compatibility API).
 * global.scss remains a parallel SCSS source until a later migration.
 *
 * customTheme.json is NOT a source of truth.
 */

/** Primitive scales from src/global.scss (plus documented legacy steps). */
export const primitive = {
  white: '#ffffff',
  black: '#000000',

  green: {
    50: '#eff8ef',
    100: '#def1de',
    200: '#bee3be',
    300: '#9dd49d',
    400: '#31a150',
    500: '#2da551',
    600: '#2e964b',
    700: '#027a48',
    800: '#05603a',
    900: '#054f31',
  },

  blue: {
    50: '#e5f6ff',
    100: '#cfefff',
    200: '#a9deff',
    300: '#75c4ff',
    /** Also Select-family focus border (component-specific) — see semantic.component.selectFocus */
    400: '#3f99ff',
    500: '#146dff',
    /**
     * LEGACY / unused in styles via `$blue-600`.
     * Canonical brand hover is `700` / `#0059FF` (see semantic.text.brandHover).
     * Do not treat as interactive hover. SVGs that hardcode #0058FF are unchanged in-app.
     */
    600: '#0058ff',
    /** Canonical brand hover step (matches palette textBrandHover / surfaceBrandHover). */
    700: '#0059ff',
    800: '#004fe3',
    900: '#0032a0',
    950: '#001d66',
  },

  lightBlue: {
    700: '#0369a1',
  },

  orange: {
    50: '#fff7ed',
    100: '#ffeed4',
    200: '#ffd9a8',
    300: '#ffbd71',
    400: '#ff9332',
    500: '#fe7711',
    600: '#ef5c07',
    700: '#c64308',
    800: '#9d360f',
    900: '#7e2f10',
    950: '#441406',
  },

  grey: {
    50: '#f5f5f6',
    100: '#e6e6e7',
    200: '#d0cfd2',
    300: '#aeaeb2',
    400: '#86868b',
    500: '#6a6a70',
    600: '#5b5b5f',
    700: '#4d4d51',
    /**
     * Canonical grey-800.
     * customTheme.json lists `#424242` for grey.800 — that JSON is NOT a source of truth.
     */
    800: '#444446',
    900: '#3c3c3d',
    950: '#262527',
  },

  yellow: {
    100: '#fef7ed',
    200: '#fcefdc',
    300: '#f9deb8',
    400: '#f6ce95',
    500: '#ffba57',
  },

  /**
   * SCSS `$success-*` ramp — legacy definitions; vars are not consumed by styles.
   * Do NOT merge with semantic success roles below.
   */
  successScss: {
    100: '#eff8ef',
    200: '#def1de',
    300: '#bee3be',
    400: '#9dd49d',
    500: '#5cb85c',
  },

  /**
   * SCSS `$alert-*` ramp — legacy definitions; vars are not consumed by styles.
   * Do NOT merge with semantic alert / form-error roles below.
   */
  alertScss: {
    100: '#fbeeed',
    200: '#f7dddc',
    300: '#f0bab9',
    400: '#e89895',
    500: '#d9534f',
  },

  assign: {
    100: '#f6ecfe',
    200: '#ecd9fd',
    300: '#d9b3fb',
    400: '#c78ef9',
    500: '#a142f5',
  },
};

/**
 * Semantic colors — role-based. Values intentionally NOT merged across roles.
 */
export const semantic = {
  text: {
    primary: '#262527',
    secondary1: '#444446',
    secondary2: '#5B5B5F',
    secondary3: '#86868B',
    placeholder: '#6A6A70',
    placeholderField: '#cccccc',
    disabled: '#AEAEB2',
    onColor: '#ffffff',
    brand: '#2DA551',
    /** Canonical brand hover. */
    brandHover: '#027A48',
    brandDisabled: '#9DD49D',
    alert: '#B32318',
    /** palette.js key typo `textAlerDisabled` preserved as meaning. */
    alertDisabled: '#FECDCA',
    /** Role: success text / border companion — do not merge with surfaceSuccessStrong. */
    success: '#2E964B',
    warning: '#f19f02',
  },

  border: {
    subtle1: '#e6e6e7',
    subtle2: '#d0cfd2',
    strong1: '#AEAEB2',
    strong2: '#6A6A70',
    brand: '#2DA551',
    warning: '#F19F02',
    /** Same role as text.success — keep distinct from surface.successStrong. */
    success: '#2E964B',
    alert: '#E43F32',
    purple: '#9747FF',
    alertHover: '#B32318',
    alertDisabled: '#FECDCA',
    brandDisabled: '#9DD49D',
    /**
     * Form-error border (TextField, destructiveSecondary).
     * Intentionally NOT the same as border.alert (#E43F32) — do not merge yet.
     */
    formError: '#DF372B',
  },

  surface: {
    white: '#ffffff',
    greySubtle: '#F5F5F6',
    /**
     * Canonical surfaceGreyLight = #F5F5F6 (same as greySubtle / $grey-50).
     * Pre-integration palette literal `#f6f6f6` is documented under legacy only.
     */
    greyLight: '#F5F5F6',
    greyStrong1: '#6A6A70',
    greyDisabled: '#AEAEB2',
    greyStrong2: '#262527',
    alertSubtle: '#FBEEED',
    alertStrong: '#E43F32',
    alertDisabled: '#FECDCA',
    alertHover: '#B32318',
    successSubtle: '#EFF8EF',
    /** Role: strong success fill — do not merge with text.success. */
    successStrong: '#31A150',
    warningSubtle: '#FEF0C7',
    warningStrong: '#FFAC0D',
    brandSubtle: '#EFF8EF',
    brand: '#2DA551',
    brandDisabled: '#9DD49D',
    brandHover: '#027A48',
    /** Rare / near-unused palette key — keep documented, not a merge target. */
    successActive: '#2DA551',
  },

  primary: {
    default: '#2DA551',
    hover: '#027A48',
    subtle: '#EFF8EF',
    disabled: '#9DD49D',
  },

  /**
   * Focus ring fills — TWO brand roles are intentional (buttons vs fields).
   * focus.neutral is ONLY a focus token — never a surface/border fallback.
   */
  focus: {
    brandSolid: '#EFF8EF',
    brandSoft: 'rgba(45, 165, 81, 0.1)',
    neutral: '#F2F4F7',
    error: '#FEE4E2',
  },

  /**
   * Status text on subtle tint backgrounds (chips, listing badges).
   * Do NOT replace with text.success / text.warning.
   */
  status: {
    onSubtle: {
      success: '#027A48',
      warning: '#DC6803',
    },
  },

  /**
   * Component-specific colors kept in the token layer for fidelity.
   * Not global semantic defaults.
   */
  component: {
    /** Select / countrySelect / bulk-assign focus border — keep; do not replace with brand. */
    selectFocus: '#3F99FF',
    /** Select error borderColor only — legacy/component-specific. */
    selectError: '#f04438',
    /** Button destructive @media (hover:none) — legacy accent. */
    destructiveAlt: '#D92D20',
  },
};

/**
 * Legacy / non-canonical values retained for documentation only.
 * Prefer semantic.* / primitive.* for design-system consumers.
 */
export const legacy = {
  /** SCSS `$blue-600` — unused via variable; not brand hover. */
  blue600: '#0058ff',
  /** palette.js `surfaceGreyLight` literal before DS alias to #F5F5F6. */
  surfaceGreyLightPaletteLiteral: '#f6f6f6',
  /** customTheme.json grey.800 — NOT a source of truth. */
  customThemeGrey800: '#424242',
  /** SCSS `$success-500` — legacy; not semantic text/surface success. */
  successScss500: '#5cb85c',
  /** SCSS `$alert-500` — legacy; not semantic borderAlert. */
  alertScss500: '#d9534f',
};

const colors = {
  primitive,
  semantic,
  legacy,
};

export default colors;
