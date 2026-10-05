import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { WelcomeDataset } from '@modules/checkout/components/welcome-dataset'
import { CUSTOMER } from '@/lib/fixtures'

const meta = {
  title: 'Components/WelcomeDataset',
  component: WelcomeDataset,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / WelcomeDataset (3501:6526). „Hallo, {Name} Schön, dass Du da bist!“ as MainHeadline and the SummaryDataset „E-Mail:“; without login the name reads „Gast!“.',
      },
    },
  },
  args: { email: CUSTOMER.email },
} satisfies Meta<typeof WelcomeDataset>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { name: CUSTOMER.firstName },
  parameters: { docs: { description: { story: 'Logged In?=True.' } } },
}

export const Guest: Story = {
  parameters: { docs: { description: { story: 'Logged In?=False.' } } },
}
