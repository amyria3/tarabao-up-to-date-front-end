import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CheckoutDelivery } from '@modules/checkout/components/checkout-delivery'
import { ADDRESS, PICKUP_POINTS, SHIPPING_OPTIONS } from '@/lib/fixtures'

const meta = {
  title: 'Components/CheckoutDelivery',
  component: CheckoutDelivery,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / DeliveryAddress (3674:12341). Toggle „Lieferung | Abholung“ with the AddressFieldset, then the shipping address as SummaryDataset with the DeliveryMethodRadioGroup, finally address and shipping method as SummaryDataset.',
      },
    },
  },
  args: { shippingOptions: SHIPPING_OPTIONS, pickupPoints: PICKUP_POINTS },
} satisfies Meta<typeof CheckoutDelivery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Variant=Delivery, Editing Shipping Address?=True.' } } },
}

export const Pickup: Story = {
  args: { defaultMode: 'pickup' },
  parameters: { docs: { description: { story: 'Variant=Pickup, Editing Shipping Address?=True.' } } },
}

export const AddressComplete: Story = {
  args: { address: ADDRESS },
  parameters: { docs: { description: { story: 'Delivery Address complete?=True.' } } },
}

export const ShippingMethodComplete: Story = {
  args: { address: ADDRESS, shippingOptionId: 'standard' },
  parameters: { docs: { description: { story: 'Shipping Method Complete?=True.' } } },
}
