import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PaymentButton } from '@modules/checkout/components/payment-button'

const meta = {
  title: 'Components/PaymentButton',
  component: PaymentButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Buttons / Payment (3230:22134). Size=Mid, Type=PrimaryButton; fill width up to max-w-btn-payment-max, label „Express zahlen“.',
      },
    },
  },
} satisfies Meta<typeof PaymentButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Hover: Story = {
  args: { forceHover: true },
}
