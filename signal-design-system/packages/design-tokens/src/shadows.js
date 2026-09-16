/**
 * Signal Design System — Shadow tokens
 *
 * Observed named shadows only — no invented elevation ladder.
 * Focus rings: two brand roles (solid vs soft) + neutral + error.
 */

/** Focus ring colors (mirrors colors.semantic.focus). */
export const focusColor = {
  brandSolid: '#EFF8EF',
  brandSoft: 'rgba(45, 165, 81, 0.1)',
  /** Neutral focus ONLY — not a surface/border fallback. */
  neutral: '#F2F4F7',
  error: '#FEE4E2',
};

export const shadows = {
  none: 'none',

  /** Soft elevation used on buttons and combined with some focus rings. */
  soft: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',

  /**
   * Button-family brand focus (solid) — muiButton primary / secondaryBlue.
   * Role token: focus.brandSolid
   */
  focusBrandSolid: '0px 0px 0px 4px #EFF8EF',
  focusBrandSolidWithSoft: '0px 0px 0px 4px #EFF8EF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)',

  /**
   * Field-family brand focus (soft rgba) — TextField, Select, dropdown, countrySelect.
   * Role token: focus.brandSoft — intentionally distinct from focusBrandSolid.
   */
  focusBrandSoft: '0px 0px 0px 4px rgba(45, 165, 81, 0.1)',

  /**
   * Neutral / grey control focus — secondaryGrey button, pagination, table.
   * Uses #F2F4F7 as focus fill only.
   */
  focusNeutralWithSoft: '0px 0px 0px 4px #F2F4F7, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)',

  /** Error focus — TextField error focused, destructive buttons. */
  focusErrorWithSoft: '0px 0px 0px 4px #FEE4E2, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)',

  /** Switch thumb filter (muiSwitch.js) — not box-shadow. */
  switchThumbFilter:
    'drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.06)) drop-shadow(0px 1px 3px rgba(16, 24, 40, 0.10))',

  switchThumbBox: '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',

  /** Dropdown / menu panel — customDropDown. */
  dropdown: '0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.1)',

  /** Floating panels in common UI. */
  panel: '0px 4px 14px 0px rgba(0, 0, 0, 0.10)',

  /** Modal-like elevations (alpha casing preserved from sources). */
  modal: '0px 8px 8px -4px rgba(16, 24, 40, 0.04), 0px 20px 24px -4px rgba(16, 24, 40, 0.10)',
  modalAlt: '0px 8px 8px -4px rgba(16, 24, 40, 0.04), 0px 20px 24px -4px rgba(16, 24, 40, 0.1)',

  scrollbarInset: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',

  helperTextShadow: '0px 0px 0px #F4EBFF, 0px 1px 2px rgba(16, 24, 40, 0.05)',

  /**
   * Back-compat aliases (previous token names).
   * Prefer focusBrandSolid / focusBrandSoft going forward.
   */
  focusBrand: '0px 0px 0px 4px #EFF8EF',
  focusBrandWithSoft: '0px 0px 0px 4px #EFF8EF, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
  focusBrandRgba: '0px 0px 0px 4px rgba(45, 165, 81, 0.1)',
  focusGreyWithSoft: '0px 0px 0px 4px #F2F4F7, 0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
};

export default shadows;
