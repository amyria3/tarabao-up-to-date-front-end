import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CartProductItem } from '@modules/cart/components/cart-product-item'
import { CART } from '@/lib/fixtures'

const meta = {
  title: 'Components/CartProductItem',
  component: CartProductItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Cart / ProductItem (3280:9437). Cart row with image, title, counter (1–9), line total and order type switch; read-only without controls.',
      },
    },
  },
  args: { item: CART.items[0]! },
} satisfies Meta<typeof CartProductItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma: Editable?=True · im Abo.' } } },
}

export const OneTime: Story = {
  args: { item: CART.items[1]! },
  parameters: { docs: { description: { story: 'Figma: Editable?=True · einmal bestellen.' } } },
}

export const Favorite: Story = {
  args: { favorite: true },
  parameters: { docs: { description: { story: 'Editable?=True with the item saved (filled heart).' } } },
}

export const ReadOnly: Story = {
  args: { item: CART.items[1]!, editable: false },
  parameters: {
    docs: {
      description: {
        story: 'Figma: Editable?=False. Below md the line „Menge und Preis“ truncates (viewport-range=base).',
      },
    },
  },
}
