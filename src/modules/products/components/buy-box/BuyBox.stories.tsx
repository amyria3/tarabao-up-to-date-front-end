import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BuyBox } from '@modules/products/components/buy-box'
import { PRODUCT_DETAIL } from '@/lib/fixtures'

const meta = {
  title: 'Components/BuyBox',
  component: BuyBox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Product / BuyBox (3164:4829). Title with ReviewStars, highlights, sustainability tags, ShippingCostsInfo, SizeAndPrice (price per size), Choice (one-time purchase or subscription) and the add-to-cart button.',
      },
    },
  },
  args: { product: PRODUCT_DETAIL },
} satisfies Meta<typeof BuyBox>

export default meta
type Story = StoryObj<typeof meta>

/** Size=Pack */
export const Default: Story = {}

export const Multipack: Story = {
  args: { defaultVariantId: 'multipack' },
}

export const Bulk: Story = {
  args: { defaultVariantId: 'bulk' },
}

/** Add-to-cart request in progress: the button is disabled. */
export const Pending: Story = {
  args: { pending: true },
}
