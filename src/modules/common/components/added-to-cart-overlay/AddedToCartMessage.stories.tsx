import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AddedToCartMessage } from '@modules/common/components/added-to-cart-overlay/added-to-cart-message'
import { CART } from '@/lib/fixtures'

const meta = {
  title: 'Components/AddedToCartMessage',
  component: AddedToCartMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Figma: Components / OverlayComponents / Message (2784:3621). Item added to cart?=True, colour mode cole-tint-surface-snow (pinned in the component). Close button, title with check mark, product and price, „Weiterstöbern“ and „Prüfen & kaufen“.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-overlay-message-max">
        <Story />
      </div>
    ),
  ],
  args: { productTitle: CART.items[0]!.title, priceLabel: CART.items[0]!.totalLabel },
} satisfies Meta<typeof AddedToCartMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
