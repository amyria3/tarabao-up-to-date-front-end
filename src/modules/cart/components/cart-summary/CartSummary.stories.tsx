import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CartLogIn } from '@modules/cart/components/cart-login'
import { CartSummary } from '@modules/cart/components/cart-summary'
import { CART, EMPTY_CART } from '@/lib/fixtures'

const meta = {
  title: 'Components/CartSummary',
  component: CartSummary,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Cart / Summary (3307:5882). Items in two blocks by order type (recurring and one-time deliveries), then Cart / Calculation.',
      },
    },
  },
  args: { cart: CART },
} satisfies Meta<typeof CartSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma: Cart is empty?=False.' } } },
}

export const Empty: Story = {
  args: { cart: EMPTY_CART },
  parameters: { docs: { description: { story: 'Figma: Cart is empty?=True.' } } },
}

export const LoggingIn: Story = {
  args: { login: <CartLogIn /> },
  parameters: {
    docs: { description: { story: 'Figma: Logging In?=True. Title „Log in“ and Cart / LogIn instead of the items.' } },
  },
}

export const ReadOnly: Story = {
  args: { editable: false, subtotalText: 'Produkte Gesamt:' },
  parameters: {
    docs: { description: { story: 'Read-only items as in CartPage · Checkout (CheckoutCartOverview).' } },
  },
}

export const ReadOnlyWithTitle: Story = {
  args: { editable: false, showTitle: true, title: 'Gute Wahl!' },
  parameters: {
    docs: { description: { story: 'Read-only items with title as in Checkout / FinalCheckout.' } },
  },
}
