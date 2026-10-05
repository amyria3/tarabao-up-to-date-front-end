import type * as React from 'react'
import { HeadlineH1 } from '@/components/ui/typography'
import { CollapsibleSection, NussAboSection } from '@modules/account/components/account-sections'
import { Section } from '@/components/ui/section'
import type { CartItemModel } from '@/lib/view-models'

/**
 * Figma: Dein Account (Templates / Page 8975:27217). Templates / Section mit H1 „Dein Account“,
 * Sections / Account / Nuss-Abo Verwaltung und drei Sections / Account / CollapsibleSection
 * (Deine Daten, Gutscheine & Angebote, Deine Bestellungen).
 */
export function AccountPage({
  subscription,
  data,
  vouchers,
  orders,
}: {
  subscription?: CartItemModel[]
  data: React.ReactNode
  vouchers: React.ReactNode
  orders: React.ReactNode
}) {
  return (
    <>
      <Section aria-label="Dein Account" className="pb-zero">
        <HeadlineH1>Dein Account</HeadlineH1>
      </Section>
      {subscription?.length ? <NussAboSection items={subscription} /> : null}
      <CollapsibleSection title="Deine Daten">{data}</CollapsibleSection>
      <CollapsibleSection title="Gutscheine & Angebote">{vouchers}</CollapsibleSection>
      <CollapsibleSection title="Deine Bestellungen" defaultOpen>
        {orders}
      </CollapsibleSection>
    </>
  )
}
