import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SizeAndPrice } from '@modules/products/components/size-and-price'
import { PRODUCT_DETAIL } from '@/lib/fixtures'

const meta = {
  title: 'Components/SizeAndPrice',
  component: SizeAndPrice,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Product / SizeAndPrice (9473:50567). Switches / OptionSelection with the sizes Pack, Multipack and Bulk and the price with unit price on the right. A click on a chip switches the size; price and unit price follow from `variants`.',
      },
    },
  },
  args: { variants: PRODUCT_DETAIL.variants },
} satisfies Meta<typeof SizeAndPrice>

export default meta
type Story = StoryObj<typeof meta>

/** Size=Pack */
export const Default: Story = {}

export const Multipack: Story = {
  args: { defaultValue: 'multipack' },
}

export const Bulk: Story = {
  args: { defaultValue: 'bulk' },
}
