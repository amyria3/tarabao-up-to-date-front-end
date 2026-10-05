import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SummaryDataset } from '@modules/checkout/components/summary-dataset'
import { addressLines } from '@/lib/checkout/address'
import { ADDRESS, CUSTOMER } from '@/lib/fixtures'

const meta = {
  title: 'Components/SummaryDataset',
  component: SummaryDataset,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / SummaryDataset (3773:11559). Title, content lines and the inline button „Korrigieren“; single-line data sits in one row.',
      },
    },
  },
  args: { label: 'Versand an:', lines: addressLines(ADDRESS) },
} satisfies Meta<typeof SummaryDataset>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Lieferadresse?=True.' } } },
}

export const BillingAddress: Story = {
  args: { label: 'Rechnung an:', lines: addressLines(ADDRESS, true) },
  parameters: { docs: { description: { story: 'Rechnungsadresse?=True.' } } },
}

export const Email: Story = {
  args: { label: 'E-Mail:', lines: [[CUSTOMER.email]] },
  parameters: { docs: { description: { story: 'E-Mail?=True.' } } },
}

export const ShippingMethod: Story = {
  args: { label: 'Versandart:', lines: [['Standardversand']] },
  parameters: { docs: { description: { story: 'Versandmethode?=True.' } } },
}

export const PaymentMethod: Story = {
  args: { label: 'Zahlen mit:', lines: [['PayPal']] },
  parameters: { docs: { description: { story: 'Zahlungsmethode?=True.' } } },
}
