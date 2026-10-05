import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CartCalculation } from '@modules/cart/components/cart-calculation'
import { CART, EMPTY_CART } from '@/lib/fixtures'

const meta = {
  title: 'Components/CartCalculation',
  component: CartCalculation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Cart / Calculation (2260:4084). Products, shipping within Germany, deposit and the total below a rule.',
      },
    },
  },
  args: { totals: CART.totals },
} satisfies Meta<typeof CartCalculation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Example values that Figma hides behind 0 €.' } },
  },
}

export const Empty: Story = {
  args: { totals: EMPTY_CART.totals },
  parameters: { docs: { description: { story: 'Figma values (0 €).' } } },
}

export const CheckoutOverview: Story = {
  args: { subtotalText: 'Produkte Gesamt:' },
  parameters: {
    docs: { description: { story: 'First line as used in CartPage · Checkout (CheckoutCartOverview).' } },
  },
}
