import { AccountDataBlock, AccountSummaryItem } from '@/components/design-system/account/account-data-block'
import { PromotionPostCard, PurchaseCard } from '@/components/design-system/cards/content-cards'
import { VoucherCard } from '@/components/design-system/cards/voucher-card'
import { AccountPage } from '@/components/design-system/pages/shop-pages'
import { addressLines } from '@/lib/checkout/address'
import { ADDRESS, CUSTOMER, PROMOTION, PURCHASE, PURCHASE_ARRIVED, SUBSCRIPTION_ITEMS, VOUCHER } from '@/lib/fixtures'
import { chrome } from '@/lib/shop/chrome'
import { localize } from '@/lib/shop/routes'

export const metadata = { title: 'Dein Account' }

/** Figma {Dein Account} 8975:27217. */
export default async function AccountRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  return (
    <AccountPage
      chrome={chrome(countryCode)}
      subscription={localize(SUBSCRIPTION_ITEMS, countryCode)}
      data={
        <div className="flex w-full flex-wrap justify-center gap-md-l">
          <AccountDataBlock title="Dein Profil" actionLabel="Abmelden">
            <AccountSummaryItem label="Vorname:" lines={[[CUSTOMER.firstName]]} />
            <AccountSummaryItem label="Nachname:" lines={[[ADDRESS.lastName]]} />
            <AccountSummaryItem label="E-Mail:" lines={[[CUSTOMER.email]]} />
          </AccountDataBlock>
          <AccountDataBlock title="Deine Adressen">
            <AccountSummaryItem label="Adresse 1:" lines={addressLines(ADDRESS)} />
          </AccountDataBlock>
          <AccountDataBlock title="Deine Zahlungsmethoden">
            <AccountSummaryItem label="Zahlungsart 1:" lines={[['Visa ****1234']]} note="Expires 06/2027" />
          </AccountDataBlock>
        </div>
      }
      vouchers={
        <div className="flex w-full flex-wrap justify-center gap-md-l">
          <VoucherCard voucher={VOUCHER} />
          <PromotionPostCard teaser={localize(PROMOTION, countryCode)} />
        </div>
      }
      orders={
        <>
          <PurchaseCard purchase={PURCHASE} className="max-w-panel-max" />
          <PurchaseCard purchase={PURCHASE_ARRIVED} className="max-w-panel-max" />
        </>
      }
    />
  )
}
