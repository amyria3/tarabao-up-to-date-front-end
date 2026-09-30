/**
 * Route-Segment [countryCode] wie in der Storefront (z. B. de-de, en-de):
 * Sprache vor dem Bindestrich, Land danach.
 */
export const LOCALES = ['de', 'en'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'de'

export function localeFromCountryCode(countryCode: string | undefined): Locale {
  const lang = countryCode?.split('-')[0]
  return (LOCALES as readonly string[]).includes(lang ?? '') ? (lang as Locale) : DEFAULT_LOCALE
}
