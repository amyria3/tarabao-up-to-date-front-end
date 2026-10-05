import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { AccountDataBlock, AccountSummaryItem } from '@modules/account/components/account-data-block'
import {
  CollapsibleSection,
  NussAboSection as NussAboSectionComponent,
} from '@modules/account/components/account-sections'
import { PurchaseCard } from '@modules/account/components/purchase-card'
import { VoucherCard } from '@modules/account/components/voucher-card'
import { PromotionPostCard } from '@/components/ui/promotion-post-card'
import { addressLines } from '@/lib/checkout/address'
import { ADDRESS, CUSTOMER, PROMOTION, PURCHASE, PURCHASE_ARRIVED, SUBSCRIPTION_ITEMS, VOUCHER } from '@/lib/fixtures'

const meta = {
  title: 'Components/CollapsibleSection',
  component: CollapsibleSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / Account / CollapsibleSection (8945:32963). Account section with an H2 toggle (arrow down/up) and a centered content column.',
      },
    },
  },
  args: {
    title: 'Deine Bestellungen',
    children: (
      <>
        <PurchaseCard purchase={PURCHASE} className="max-w-panel-max" />
        <PurchaseCard purchase={PURCHASE_ARRIVED} className="max-w-panel-max" />
      </>
    ),
  },
} satisfies Meta<typeof CollapsibleSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { docs: { description: { story: 'Figma: Bestellungen?=True, Open?=False.' } } },
}

export const Open: Story = {
  args: { defaultOpen: true },
  parameters: { docs: { description: { story: 'Figma: Bestellungen?=True, Open?=True.' } } },
}

export const Vouchers: Story = {
  args: {
    title: 'Gutscheine & Angebote',
    defaultOpen: true,
    children: (
      <div className="flex w-full flex-wrap justify-center gap-md-l">
        <VoucherCard voucher={VOUCHER} />
        <PromotionPostCard teaser={PROMOTION} />
      </div>
    ),
  },
  parameters: { docs: { description: { story: 'Figma: Gutscheine & Angebote?=True, Open?=True.' } } },
}

export const AccountData: Story = {
  args: {
    title: 'Deine Daten',
    defaultOpen: true,
    children: (
      <div className="flex w-full flex-wrap justify-center gap-md-l">
        <AccountDataBlock title="Dein Profil" actionLabel="Abmelden">
          <AccountSummaryItem label="Vorname:" lines={[[CUSTOMER.firstName]]} />
          <AccountSummaryItem label="E-Mail:" lines={[[CUSTOMER.email]]} />
        </AccountDataBlock>
        <AccountDataBlock title="Deine Adressen">
          <AccountSummaryItem label="Adresse 1:" lines={addressLines(ADDRESS)} />
        </AccountDataBlock>
      </div>
    ),
  },
  parameters: { docs: { description: { story: 'Figma: Deine Daten?=True, Open?=True.' } } },
}

export const NussAboSection: Story = {
  render: () => <NussAboSectionComponent items={SUBSCRIPTION_ITEMS} />,
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Sections / Account / Nuss-Abo Verwanltung (8819:25733). Cancellation box and Subscription Management share one subscription status.',
      },
    },
  },
}

export const NussAboSectionCanceled: Story = {
  render: () => <NussAboSectionComponent items={SUBSCRIPTION_ITEMS} defaultStatus="canceled" />,
  parameters: {
    docs: { description: { story: 'Figma: Nuss-Abo Verwanltung with status canceled (Gekündigt?=True).' } },
  },
}
