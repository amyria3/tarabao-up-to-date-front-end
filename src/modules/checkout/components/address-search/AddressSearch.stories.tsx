import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AddressSearch } from '@modules/checkout/components/address-search'
import { ADDRESS } from '@/lib/fixtures'

const meta = {
  title: 'Components/AddressSearch',
  component: AddressSearch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Checkout / AddressSearch (9779:30099). Input field „Adressdaten suchen“ with the row „Adresse manuell eingeben?“. State Default → Focus → Selected follows focus, input and selection; Missing comes from `error`.',
      },
    },
  },
} satisfies Meta<typeof AddressSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Focus: Story = {
  args: { value: 'Ber' },
  parameters: { docs: { description: { story: 'State=Focus: input in progress.' } } },
}

export const Missing: Story = {
  args: { error: '' },
  parameters: { docs: { description: { story: 'State=Missing: an empty `error` shows the default message.' } } },
}

export const Selected: Story = {
  args: { selected: { id: '1', address1: ADDRESS.address1 } },
  parameters: {
    docs: { description: { story: 'State=Selected: the address appears as „Adresszeile 1*“ with a check mark.' } },
  },
}
