import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SetPassword } from '@modules/checkout/components/set-password'
import { CUSTOMER } from '@/lib/fixtures'

const meta = {
  title: 'Components/SetPassword',
  component: SetPassword,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / SetPassword (10302:51632). Card to set a password: Variant=Reset after „Passwort vergessen?“, Variant=NewAccount in the guest order confirmation. State follows the input; Completed shows the saved state.',
      },
    },
  },
  args: { email: CUSTOMER.email },
} satisfies Meta<typeof SetPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Variant=Reset, State=Initial.' } } },
}

export const ResetFilled: Story = {
  args: { defaultPassword: 'Cashew2026', defaultRepeat: 'Cashew2026' },
  parameters: { docs: { description: { story: 'Variant=Reset, State=Filled.' } } },
}

export const ResetError: Story = {
  args: { defaultPassword: 'Cashew2026', defaultRepeat: 'Cashew2025', validateOnMount: true },
  parameters: { docs: { description: { story: 'Variant=Reset, State=Error.' } } },
}

export const ResetCompletedInCheckout: Story = {
  args: { completed: true, returnTo: { label: 'Weiter zum Versand', href: '/de-de/checkout?step=delivery' } },
  parameters: { docs: { description: { story: 'Variant=Reset, State=Completed, Checkout in progress?=True.' } } },
}

export const ResetCompleted: Story = {
  args: { completed: true },
  parameters: { docs: { description: { story: 'Variant=Reset, State=Completed, Checkout in progress?=False.' } } },
}

export const NewAccount: Story = {
  args: { variant: 'new-account' },
  parameters: { docs: { description: { story: 'Variant=NewAccount, State=Initial.' } } },
}

export const NewAccountCompleted: Story = {
  args: { variant: 'new-account', completed: true },
  parameters: { docs: { description: { story: 'Variant=NewAccount, State=Completed.' } } },
}
