/**
 * Theme-Achsen aus app.css (Figma: Clrs / Color Modes, Clrs / Mega Cards, Clrs / Special).
 * Gleiche Namen und Exporte wie apps/medusa-storefront/src/lib/design-system/themes.ts.
 */

/** Globale Farbmodi — `data-theme`, am Container gesetzt, kaskadiert. */
export const GLOBAL_THEMES = [
  'cole-tint-surface-warm',
  'cole-tint-surface-snow',
  'purple-tint-surface-warm',
  'purple-tint-surface-snow',
] as const

export type GlobalTheme = (typeof GLOBAL_THEMES)[number]

/** Seiten und Sections starten in cole-tint-surface-warm (Default in app.css). */
export const DEFAULT_GLOBAL_THEME: GlobalTheme = 'cole-tint-surface-warm'

/** Navigation und Footer liegen auf der Snow-Fläche (Figma: Modus-Pin an Navigation / Header und Navigation / Footer). */
export const SHELL_SURFACE_THEME: GlobalTheme = 'cole-tint-surface-snow'

/** Seiten (Figma Templates / Page und alle Seiten in {Single Pages}) liegen auf der Snow-Fläche. */
export const PAGE_THEME: GlobalTheme = 'cole-tint-surface-snow'

/** Kampagnen-Achse — `data-lively-theme`, pro Komponente (MegaCard + LG-Buttons). */
export const LIVELY_THEMES = ['blue-pistacio-green', 'orange-black', 'happy-christmas', 'purple-black'] as const

export type LivelyTheme = (typeof LIVELY_THEMES)[number]

/** Sonderflächen-Achse — `data-special-theme` (VoucherCard, PromoBar). forest ist Default. */
export const SPECIAL_THEMES = ['forest', 'lilac'] as const

export type SpecialTheme = (typeof SPECIAL_THEMES)[number]

/** Figma-Variante von Cards / MegaCard → Code-Wert von data-lively-theme (2.3 §4b). */
export const MEGACARD_VARIANT_TO_LIVELY: Record<string, LivelyTheme> = {
  'blue-green': 'blue-pistacio-green',
  'orange-black': 'orange-black',
  'happy-yellow': 'happy-christmas',
  'purple-black': 'purple-black',
}

/** Semantische Variablen, die jeder globale Theme-Block vollständig setzen muss (63). */
export const REQUIRED_GLOBAL_THEME_TOKENS = [
  '--surface-color',
  '--surface-placeholder',
  '--surface-highlighted',
  '--content-text',
  '--content-weak',
  '--content-loud-headline',
  '--btn-primary-bg',
  '--btn-primary-label',
  '--btn-primary-bg-hover',
  '--btn-primary-label-hover',
  '--btn-primary-bg-inactive',
  '--btn-primary-label-inactive',
  '--btn-secondary-bg',
  '--btn-secondary-label',
  '--btn-secondary-bg-hover',
  '--btn-secondary-label-hover',
  '--btn-secondary-bg-inactive',
  '--btn-secondary-label-inactive',
  '--btn-inline-bg',
  '--btn-inline-label',
  '--btn-inline-bg-hover',
  '--btn-inline-label-hover',
  '--btn-inline-bg-inactive',
  '--btn-inline-label-inactive',
  '--input-label',
  '--input-bg-focused',
  '--input-label-focused',
  '--input-placeholder',
  '--input-label-inactive',
  '--segmented-bg',
  '--segmented-label',
  '--segmented-bg-hover',
  '--segmented-label-hover',
  '--segmented-bg-selected',
  '--segmented-label-selected',
  '--switch-bg-hover',
  '--switch-segment-bg',
  '--switch-segment-label',
  '--switch-segment-bg-selected',
  '--switch-segment-label-selected',
  '--switch-segment-bg-selected-hover',
  '--switch-segment-label-selected-hover',
  '--counter-bg',
  '--counter-label',
  '--counter-bg-hover-click',
  '--btn-option-selection-bg',
  '--btn-option-selection-label',
  '--btn-option-selection-bg-hover',
  '--btn-option-selection-label-hover',
  '--btn-option-selection-bg-selected',
  '--btn-option-selection-label-selected',
  '--card-surface',
  '--card-surface-hover',
  '--card-content-text',
  '--card-content-text-hover',
  '--card-btn',
  '--card-btn-hover-click',
  '--block-surface',
  '--block-content-text',
  '--error-content',
  '--error-bg',
  '--success-content',
  '--success-bg',
] as const
