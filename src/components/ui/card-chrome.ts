export type HoverProps = { forceHover?: boolean; className?: string }

/**
 * Figma: Die Karten sind auf „Clrs / Color Modes“ = cole-tint-surface-snow gepinnt (am Set oder an
 * jeder Variante). So heben sie sich immer vom Seitenhintergrund ab, auch auf warmen Seiten.
 */
export const CARD_THEME = { 'data-theme': 'cole-tint-surface-snow' } as const

/** Rahmen und Schatten „Cards default“; motion-hover blendet den Hover-Schatten über. */
export const CARD_FRAME = 'border border-card-btn-hover-click shadow-card motion-hover'

export const CARD_HOVER =
  'hover:bg-card-surface-hover hover:shadow-card-hover data-hovered:bg-card-surface-hover data-hovered:shadow-card-hover'
