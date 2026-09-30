/**
 * `next/root-params` erzeugt der Compiler aus den Root-Segmenten.
 * Wie in apps/medusa-storefront: das eine Root-Segment `[countryCode]`.
 */
declare module 'next/root-params' {
  /** Das Root-Segment `[countryCode]` (`de-de`, `en-de`, …). */
  export function countryCode(): Promise<string | undefined>
}
