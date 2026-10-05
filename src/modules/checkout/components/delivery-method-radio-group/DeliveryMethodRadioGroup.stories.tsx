import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { DeliveryMethodRadioGroup } from '@modules/checkout/components/delivery-method-radio-group'
import { SHIPPING_OPTIONS } from '@/lib/fixtures'

const meta = {
  title: 'Components/DeliveryMethodRadioGroup',
  component: DeliveryMethodRadioGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / DeliveryMethodRadioGroup (3674:12469). Question as MainHeadline and Switches / Radio with the shipping options (label and description).',
      },
    },
  },
  args: { options: SHIPPING_OPTIONS },
} satisfies Meta<typeof DeliveryMethodRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Express: Story = {
  args: { defaultValue: 'express' },
  parameters: { docs: { description: { story: 'Express?=True: Expressversand selected.' } } },
}
