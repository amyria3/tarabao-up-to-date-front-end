import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AddressFieldset } from '@modules/checkout/components/address-fieldset'
import { ADDRESS } from '@/lib/fixtures'

const meta = {
  title: 'Components/AddressFieldset',
  component: AddressFieldset,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / AddressFieldset (3685:13778). First and last name, then the address search (Delivery), the manual address fields (Enter address manually?=True, 9695:31743) or phone and postal code with the pickup search (Pickup).',
      },
    },
  },
} satisfies Meta<typeof AddressFieldset>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SearchMissing: Story = {
  args: { searchError: '' },
  parameters: { docs: { description: { story: 'Variant=Delivery with the address search in State=Missing.' } } },
}

export const Manual: Story = {
  args: { defaultManual: true },
  parameters: { docs: { description: { story: 'Variant=Delivery, Enter address manually?=True (9695:31743).' } } },
}

export const ManualFilled: Story = {
  args: { defaultValue: ADDRESS },
  parameters: { docs: { description: { story: 'Manual entry filled with an address.' } } },
}

export const ShortLastName: Story = {
  args: { defaultValue: { ...ADDRESS, lastName: 'W' } },
  parameters: {
    docs: { description: { story: 'A last name shorter than 3 characters shows the warning from Figma.' } },
  },
}

export const Pickup: Story = {
  args: { variant: 'pickup' },
  parameters: { docs: { description: { story: 'Variant=Pickup.' } } },
}
