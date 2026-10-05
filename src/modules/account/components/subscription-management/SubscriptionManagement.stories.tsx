import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  NussAboCancellation as NussAboCancellationComponent,
  NussAboCancellationStatus as NussAboCancellationStatusComponent,
  SubscriptionManagement,
} from '@modules/account/components/subscription-management'
import { SUBSCRIPTION_ITEMS } from '@/lib/fixtures'

const meta = {
  title: 'Components/SubscriptionManagement',
  component: SubscriptionManagement,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Subscription Management (8840:26061). Deselect items from the next subscription delivery or pause it for one month.',
      },
    },
  },
  args: { items: SUBSCRIPTION_ITEMS },
} satisfies Meta<typeof SubscriptionManagement>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma: State=Default.' } } },
}

export const Deselected: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getAllByRole('checkbox')[0]!)
  },
  parameters: {
    docs: { description: { story: 'Figma: State=Deselected. The play function deselects the first item.' } },
  },
}

export const Paused: Story = {
  args: { paused: true },
  parameters: { docs: { description: { story: 'Figma: State=Canceled. The next delivery is paused.' } } },
}

export const Canceled: Story = {
  args: { canceled: true },
  parameters: {
    docs: { description: { story: 'Figma: Gekündigt?=True. Read-only items and „Kündigung zurücknehmen“.' } },
  },
}

export const NussAboCancellationStatus: Story = {
  render: () => <NussAboCancellationStatusComponent />,
  parameters: {
    docs: {
      description: { story: 'Figma: Components / Nuss-AboCancellationStatus (8867:48260) · Status=Cancellation.' },
    },
  },
}

export const NussAboCancellationStatusCanceled: Story = {
  render: () => <NussAboCancellationStatusComponent status="canceled" />,
  parameters: { docs: { description: { story: 'Figma: Nuss-AboCancellationStatus · Status=Canceled.' } } },
}

export const NussAboCancellationStatusReactivated: Story = {
  render: () => <NussAboCancellationStatusComponent status="reactivated" />,
  parameters: { docs: { description: { story: 'Figma: Nuss-AboCancellationStatus · Status=Reactivated.' } } },
}

export const NussAboCancellation: Story = {
  render: () => <NussAboCancellationComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Deprecated alias of NussAboCancellationStatus (Figma name until 29.09.: Components / Nuss-Abo Cancellation).',
      },
    },
  },
}
