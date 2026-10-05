import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'

import {
  AccountDataBlock,
  AccountSummaryItem as AccountSummaryItemComponent,
} from '@modules/account/components/account-data-block'
import { AddressFieldset } from '@modules/checkout/components/address-fieldset'
import { addressLines } from '@/lib/checkout/address'
import { ADDRESS, CUSTOMER } from '@/lib/fixtures'

const meta = {
  title: 'Components/AccountDataBlock',
  component: AccountDataBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Figma: Components / Account / DataBlock (3941:19858). Account card with title, summary items, empty text and a full-width secondary button.',
      },
    },
  },
  args: { title: 'Dein Profil' },
} satisfies Meta<typeof AccountDataBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Profile: Story = {
  args: {
    actionLabel: 'Abmelden',
    children: (
      <>
        <AccountSummaryItemComponent label="Vorname:" lines={[[CUSTOMER.firstName]]} />
        <AccountSummaryItemComponent label="Nachname:" lines={[[ADDRESS.lastName]]} />
        <AccountSummaryItemComponent label="E-Mail:" lines={[[CUSTOMER.email]]} />
      </>
    ),
  },
  parameters: { docs: { description: { story: 'Figma: Dein Profil?=True.' } } },
}

export const Addresses: Story = {
  args: {
    title: 'Deine Adressen',
    children: (
      <>
        <AccountSummaryItemComponent
          label="Adresse 1:"
          lines={addressLines(ADDRESS)}
          onDelete={fn()}
          editor={<AddressFieldset defaultValue={ADDRESS} defaultManual legend="Adresse 1" />}
        />
        <AccountSummaryItemComponent
          label="Adresse 2:"
          lines={addressLines(ADDRESS)}
          onDelete={fn()}
          editor={<AddressFieldset defaultValue={ADDRESS} defaultManual legend="Adresse 2" />}
        />
      </>
    ),
  },
  parameters: {
    docs: { description: { story: 'Figma: Deine Addressen?=True. „Korrigieren“ opens the address fields.' } },
  },
}

export const PaymentMethods: Story = {
  args: {
    title: 'Deine Zahlungsmethoden',
    children: (
      <AccountSummaryItemComponent
        label="Zahlungsart 1:"
        lines={[['Visa ****1234']]}
        note="Expires 06/2024"
        onEdit={fn()}
        onDelete={fn()}
      />
    ),
  },
  parameters: { docs: { description: { story: 'Figma: Deine Zahlungsmethoden?=True.' } } },
}

export const Wishlist: Story = {
  args: {
    title: 'Deine Wunschliste',
    emptyText: 'Deine Wunschliste ist leer',
    actionLabel: 'Ganze Liste zeigen',
  },
  parameters: { docs: { description: { story: 'Figma: Deine Wunschliste?=True. Empty state with UserMessage/LG.' } } },
}

export const AccountSummaryItem: Story = {
  render: () => <AccountSummaryItemComponent label="Vorname:" lines={[[CUSTOMER.firstName]]} />,
  parameters: {
    docs: {
      description: {
        story: 'Figma: Components / Account / SummaryItem (3941:19715) · Vorname?=True. Single-line item.',
      },
    },
  },
}

export const AccountSummaryItemAddress: Story = {
  render: () => (
    <AccountSummaryItemComponent
      label="Adresse 1:"
      lines={addressLines(ADDRESS)}
      onDelete={fn()}
      editor={<AddressFieldset defaultValue={ADDRESS} defaultManual legend="Adresse 1" />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Figma: SummaryItem · Addresse 1?=True. Inline buttons „Korrigieren“ and „Löschen“.',
      },
    },
  },
}

export const AccountSummaryItemPayment: Story = {
  render: () => (
    <AccountSummaryItemComponent
      label="Zahlungsart 1:"
      lines={[['Visa ****1234']]}
      note="Expires 06/2024"
      onEdit={fn()}
      onDelete={fn()}
    />
  ),
  parameters: {
    docs: { description: { story: 'Figma: SummaryItem · Zahlungsmethode 1?=True. With expiry note.' } },
  },
}

export const AccountSummaryItemEditing: Story = {
  render: () => (
    <AccountSummaryItemComponent
      label="Adresse 2:"
      lines={addressLines(ADDRESS)}
      editing
      editor={<AddressFieldset defaultValue={ADDRESS} defaultManual legend="Adresse 2" />}
    />
  ),
  parameters: {
    docs: {
      description: { story: 'Figma: SummaryItem · Editing?=True. The input fields replace label and buttons.' },
    },
  },
}
