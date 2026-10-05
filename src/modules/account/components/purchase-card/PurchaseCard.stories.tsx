import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PurchaseCard } from '@modules/account/components/purchase-card'
import { PURCHASE, PURCHASE_ARRIVED } from '@/lib/fixtures'

const meta = {
  title: 'Components/PurchaseCard',
  component: PurchaseCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Cards / PurchaseCard (6748:17300). Order card with status, product images, PurchaseSummary and a secondary button.',
      },
    },
  },
  args: { purchase: PURCHASE },
} satisfies Meta<typeof PurchaseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Sent: Story = {
  parameters: { docs: { description: { story: 'Figma: Status=Sent.' } } },
}

export const Arrived: Story = {
  args: { purchase: PURCHASE_ARRIVED },
  parameters: { docs: { description: { story: 'Figma: Status=Arrived.' } } },
}
