import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { CheckoutContact } from '@modules/checkout/components/checkout-contact'

const meta = {
  title: 'Components/CheckoutContact',
  component: CheckoutContact,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / Contact (3953:24967). UserMessage & Explanation „Hast Du Fragen?“ with the support e-mail and a centred note on response times.',
      },
    },
  },
} satisfies Meta<typeof CheckoutContact>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
