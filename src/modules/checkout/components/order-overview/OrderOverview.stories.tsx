import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { OrderOverview } from '@modules/checkout/components/order-overview'
import { CART, PRODUCTS } from '@/lib/fixtures'

const meta = {
  title: 'Components/OrderOverview',
  component: OrderOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / OrderOverview (3501:5794). Compact, expandable CartPage · Checkout, Checkout / Identification (Guest) and recommendations with Cards / ProductCard. Used as overlay below the navigation or in the flow of the checkout page.',
      },
    },
  },
  args: {
    cart: CART,
    recommendations: [
      { title: 'Deine Favoriten:', products: PRODUCTS },
      { title: 'Für Dich Empfohlen:', products: PRODUCTS },
    ],
  },
} satisfies Meta<typeof OrderOverview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutRecommendations: Story = {
  args: { recommendations: [] },
}

export const AsDialog: Story = {
  args: { asDialog: true },
  parameters: {
    docs: {
      description: { story: 'Overlay context below the navigation: role=dialog with label „Bestellübersicht“.' },
    },
  },
}
