import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CheckoutPayment } from '@modules/checkout/components/checkout-payment'
import { ADDRESS, PAYMENT_METHODS } from '@/lib/fixtures'

const meta = {
  title: 'Components/CheckoutPayment',
  component: CheckoutPayment,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / Payment (3773:14405) with ShippingAddressFormRadioButton (3782:14948). Country and billing address choice, then the payment methods, finally billing address and payment method as SummaryDataset.',
      },
    },
  },
  args: { shippingAddress: ADDRESS, paymentMethods: PAYMENT_METHODS },
} satisfies Meta<typeof CheckoutPayment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Payment address equal to shipping address?=True.' } } },
}

export const BillingAddressComplete: Story = {
  args: { billingAddress: ADDRESS },
  parameters: { docs: { description: { story: 'New invoice address complete?=True.' } } },
}

export const PaymentMethodSelected: Story = {
  args: { billingAddress: ADDRESS, paymentMethodId: 'paypal' },
  parameters: { docs: { description: { story: 'Payment method selected?=True.' } } },
}
