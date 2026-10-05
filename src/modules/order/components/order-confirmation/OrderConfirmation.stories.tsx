import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { OrderConfirmation } from '@modules/order/components/order-confirmation'

const meta = {
  title: 'Components/OrderConfirmation',
  component: OrderConfirmation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / OrderConfirmation (3826:18648). Thank-you message with delivery date, contact lines and a link to the customer account.',
      },
    },
  },
  args: { deliveryDateLabel: '10.11.2025' },
} satisfies Meta<typeof OrderConfirmation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
