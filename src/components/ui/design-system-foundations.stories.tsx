import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { foundationEntries } from '@/library/entries/foundations'

/**
 * Design tokens from app.css (colour modes, text styles, spacing, widths, heights), read by
 * scripts/gen-foundations.mjs. Counterpart of „Design System/Harness“ in apps/medusa-storefront.
 */
const meta = {
  title: 'Design System/Foundations',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Clrs / Color Modes · Text Styles · Box Spacing + Gaps · Lyt scl / Width · Lyt scl / Heights. All values come from app.css.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function foundation(id: string): Story {
  const entry = foundationEntries.find((e) => e.id === id)
  if (!entry) throw new Error(`Unknown foundation entry: ${id}`)
  return {
    render: () => <>{entry.render()}</>,
    parameters: { docs: { description: { story: `Figma: ${entry.figma}.` } } },
  }
}

export const ColorModes = foundation('foundations-color-modes')
export const MegaCards = foundation('foundations-mega-cards')
export const SpecialThemes = foundation('foundations-special')
export const SingleModeCollections = foundation('foundations-single-mode')
export const Primitives = foundation('foundations-primitives')
export const TextStyles = foundation('foundations-text-styles')
export const Fonts = foundation('foundations-fonts')
export const Spacing = foundation('foundations-spacing')
export const Widths = foundation('foundations-widths')
export const Heights = foundation('foundations-heights')
