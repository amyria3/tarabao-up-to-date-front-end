import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CheckoutIdentification } from '@modules/checkout/components/checkout-identification'
import { CUSTOMER } from '@/lib/fixtures'

const meta = {
  title: 'Components/CheckoutIdentification',
  component: CheckoutIdentification,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / Identification (6617:16895). Title „Wer gibt die Bestellung auf?“, e-mail, password when logging in, two consents and the primary button; State=Completed shows the WelcomeDataset.',
      },
    },
  },
} satisfies Meta<typeof CheckoutIdentification>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Variant=Guest, State=Initial.' } } },
}

export const GuestFilled: Story = {
  args: { defaultEmail: CUSTOMER.email },
  parameters: { docs: { description: { story: 'Variant=Guest, State=Filled.' } } },
}

export const GuestCompleted: Story = {
  args: { completed: { email: CUSTOMER.email } },
  parameters: { docs: { description: { story: 'Variant=Guest, State=Completed.' } } },
}

export const ReturningCustomer: Story = {
  args: { variant: 'returning' },
  parameters: { docs: { description: { story: 'Variant=ReturningCustomer, State=Initial.' } } },
}

export const ReturningCustomerError: Story = {
  args: { variant: 'returning', defaultEmail: CUSTOMER.email, error: 'Hast Du ein Passwort?' },
  parameters: { docs: { description: { story: 'Variant=ReturningCustomer, State=Error.' } } },
}

export const ReturningCustomerCompleted: Story = {
  args: { completed: { name: CUSTOMER.firstName, email: CUSTOMER.email } },
  parameters: { docs: { description: { story: 'Variant=ReturningCustomer, State=Completed.' } } },
}
