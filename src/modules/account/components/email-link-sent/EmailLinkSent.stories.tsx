import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { EmailLinkSent } from '@modules/account/components/email-link-sent'
import { CUSTOMER } from '@/lib/fixtures'

const meta = {
  title: 'Components/EmailLinkSent',
  component: EmailLinkSent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Account / EmailLinkSent (10351:54980). Confirmation after requesting a link by e-mail: the address in the field and „Erneut senden“ (locked for 30 s after a click).',
      },
    },
  },
  args: { email: CUSTOMER.email },
} satisfies Meta<typeof EmailLinkSent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Variant=PasswordReset.' } } },
}

export const MagicLink: Story = {
  args: { variant: 'magic-link' },
  parameters: { docs: { description: { story: 'Variant=MagicLink.' } } },
}
