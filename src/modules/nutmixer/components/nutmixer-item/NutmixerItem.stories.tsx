import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { NutmixerItem } from '@modules/nutmixer/components/nutmixer-item'
import { NUTMIXER_PRODUCTS } from '@/lib/fixtures'

const PRODUCT = NUTMIXER_PRODUCTS[0]!

const meta = {
  title: 'Components/NutmixerItem',
  component: NutmixerItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Nutmixer / Item (8562:28599). Show Image?=False. Name and price per step on the left, Buttons / Counter and weight on the right. Quantity 0 removes the ingredient.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-block-max">
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Gefriergetrocknete Himbeeren in Zartbitterschokolade',
    stepPriceLabel: PRODUCT.stepPriceLabel,
    stepGrams: PRODUCT.stepGrams,
    quantity: 1,
  },
} satisfies Meta<typeof NutmixerItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MaxReached: Story = {
  args: { quantity: 2, max: 2 },
  parameters: { docs: { description: { story: 'The pack is full: the plus button of the counter is inactive.' } } },
}
