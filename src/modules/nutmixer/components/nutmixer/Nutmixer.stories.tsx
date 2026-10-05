import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Nutmixer } from '@modules/nutmixer/components/nutmixer'
import { NUTMIXER_CATEGORIES_DEMO, NUTMIXER_PRODUCTS } from '@/lib/fixtures'

const meta = {
  title: 'Components/Nutmixer',
  component: Nutmixer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Components / Nutmixer (8863:27584). viewport-range=lg, colour mode cole-tint-surface-snow (pinned in the component). Products with sticky category tabs on the left, the mix on the right. „Zur Mischung“ adds 75 g; „Nussmix bestellen“ becomes active once the pack (750 g) is full. The bag is a placeholder.',
      },
    },
  },
  args: {
    categories: NUTMIXER_CATEGORIES_DEMO,
    products: NUTMIXER_PRODUCTS,
    defaultMix: { nuesse_1: 2, nuesse_2: 1, beeren_1: 1 },
  },
} satisfies Meta<typeof Nutmixer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
  args: { defaultMix: {} },
  parameters: {
    docs: { description: { story: 'No ingredients yet; „löschen“ and „Nussmix bestellen“ are inactive.' } },
  },
}

export const Full: Story = {
  args: { defaultMix: { nuesse_1: 4, beeren_1: 3, fruechte_1: 3 } },
  parameters: { docs: { description: { story: 'The pack is full (750 g), so „Nussmix bestellen“ is active.' } } },
}
