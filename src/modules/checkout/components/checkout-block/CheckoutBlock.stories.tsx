import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  CheckoutBlock,
  CheckoutHeadline as CheckoutHeadlineComponent,
} from '@modules/checkout/components/checkout-block'
import { SummaryDataset } from '@modules/checkout/components/summary-dataset'
import { addressLines } from '@/lib/checkout/address'
import { ADDRESS } from '@/lib/fixtures'

const meta = {
  title: 'Components/CheckoutBlock',
  component: CheckoutBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / Identification (6617:16895), shared frame of the checkout steps Identification, DeliveryAddress, Payment and FinalCheckout. Surface, pt/px lg, pb-7, min-w-block-min, max-w-block-max; child gap per step.',
      },
    },
  },
  args: {
    children: (
      <>
        <CheckoutHeadlineComponent>Zahlung</CheckoutHeadlineComponent>
        <SummaryDataset label="Rechnung an:" lines={addressLines(ADDRESS, true)} />
      </>
    ),
  },
} satisfies Meta<typeof CheckoutBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const GapMdL: Story = {
  args: { gap: 'md-l' },
  parameters: { docs: { description: { story: 'Child gap gap-md-l as in FinalCheckout.' } } },
}

export const GapXl: Story = {
  args: { gap: 'xl' },
  parameters: { docs: { description: { story: 'Child gap gap-xl as in DeliveryAddress and Payment.' } } },
}

export const CheckoutHeadline: Story = {
  render: () => <CheckoutHeadlineComponent>Wer gibt die Bestellung auf?</CheckoutHeadlineComponent>,
  parameters: {
    docs: { description: { story: 'Text style ShoppingCart & Checkout/MainHeadline, max-w-128.' } },
  },
}
