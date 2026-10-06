import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SubscriptionReminder } from '@modules/email/components/subscription-reminder'
import { SUBSCRIPTION_REMINDER } from '@/lib/fixtures'

const meta = {
  title: 'Components/SubscriptionReminder',
  component: SubscriptionReminder,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Email / SubscriptionReminder (10353:58602). Reminder e-mail one week before each subscription delivery; „Zu Deinem Abo“ is a magic link that opens only the subscription.',
      },
    },
  },
  args: SUBSCRIPTION_REMINDER,
} satisfies Meta<typeof SubscriptionReminder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
