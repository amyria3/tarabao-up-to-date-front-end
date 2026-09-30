/**
 * Nachhaltigkeitskategorien (Figma: SustainabilityCategoryTag,
 * SustainabilitCategoryNavigationButton). Schlüssel = Token-Präfix in app.css
 * (`--tag-<key>-bg`, `--tag-<key>-bg-hover-click`).
 */
export const SUSTAINABILITY_CATEGORIES = [
  { key: 'social-commitment', label: 'Engagement' },
  { key: 'cultivation-environment', label: 'Umwelt' },
  { key: 'supply-chain-fairness', label: 'Fairness' },
  { key: 'transportation', label: 'No Plane' },
] as const

export type SustainabilityCategory = (typeof SUSTAINABILITY_CATEGORIES)[number]['key']

/** Vollständige Klassennamen, damit Tailwind sie findet. */
export const SUSTAINABILITY_TAG_CLASSES: Record<SustainabilityCategory, { bg: string; bgActive: string }> = {
  'social-commitment': {
    bg: 'text-tag-social-commitment-bg',
    bgActive:
      'group-hovered:text-tag-social-commitment-bg-hover-click group-selected:text-tag-social-commitment-bg-hover-click',
  },
  'cultivation-environment': {
    bg: 'text-tag-cultivation-environment-bg',
    bgActive:
      'group-hovered:text-tag-cultivation-environment-bg-hover-click group-selected:text-tag-cultivation-environment-bg-hover-click',
  },
  'supply-chain-fairness': {
    bg: 'text-tag-supply-chain-fairness-bg',
    bgActive:
      'group-hovered:text-tag-supply-chain-fairness-bg-hover-click group-selected:text-tag-supply-chain-fairness-bg-hover-click',
  },
  transportation: {
    bg: 'text-tag-transportation-bg',
    bgActive:
      'group-hovered:text-tag-transportation-bg-hover-click group-selected:text-tag-transportation-bg-hover-click',
  },
}
