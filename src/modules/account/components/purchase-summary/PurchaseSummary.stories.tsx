import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PurchaseSummary } from '@modules/account/components/purchase-summary'
import { PURCHASE, PURCHASE_ARRIVED } from '@/lib/fixtures'

const meta = {
  title: 'Components/PurchaseSummary',
  component: PurchaseSummary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Figma: Components / PurchaseSummary (6794:18851). Order number, total, dates and inline links for invoice and tracking.',
      },
    },
  },
  args: { summary: PURCHASE.summary },
} satisfies Meta<typeof PurchaseSummary>

export default meta
type Story = StoryObj<typeof meta>

export const OrderReceived: Story = {
  parameters: { docs: { description: { story: 'Figma: Status=Order Received.' } } },
}

export const OrderArrived: Story = {
  args: { summary: PURCHASE_ARRIVED.summary },
  parameters: { docs: { description: { story: 'Figma: Status=Order Arrived.' } } },
}
