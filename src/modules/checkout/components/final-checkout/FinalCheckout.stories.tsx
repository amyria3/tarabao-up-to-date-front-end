import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FinalCheckout } from '@modules/checkout/components/final-checkout'
import { CART } from '@/lib/fixtures'

const meta = {
  title: 'Components/FinalCheckout',
  component: FinalCheckout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / FinalCheckout (3807:19305). Cart / Summary without editing titled „Gute Wahl!“, legal note with links to terms and privacy policy and the primary button „mit {Zahlart} kaufen“.',
      },
    },
  },
  args: { cart: CART },
} satisfies Meta<typeof FinalCheckout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Variant=Delivery.' } } },
}

export const Pending: Story = {
  args: { pending: true },
  parameters: { docs: { description: { story: 'Order is being placed: the button is disabled.' } } },
}
