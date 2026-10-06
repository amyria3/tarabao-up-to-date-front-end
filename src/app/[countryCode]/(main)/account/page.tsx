import { AccountDataBlock, AccountSummaryItem } from '@modules/account/components/account-data-block'
import { AccountAddressItem, AccountPaymentItem } from '@modules/account/components/account-editors'
import { PromotionPostCard } from '@/components/ui/promotion-post-card'
import { PurchaseCard } from '@modules/account/components/purchase-card'
import { VoucherCard } from '@modules/account/components/voucher-card'
import { AccountPage } from '@modules/account/templates/account-page'
import { ADDRESS, CUSTOMER, PROMOTION, PURCHASE, PURCHASE_ARRIVED, SUBSCRIPTION_ITEMS, VOUCHER } from '@/lib/fixtures'
import { localize } from '@/lib/shop/routes'

export const metadata = { title: 'Dein Account' }

/** Figma {Dein Account} 8975:27217. */
export default async function AccountRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  return (
    <AccountPage
      subscription={localize(SUBSCRIPTION_ITEMS, countryCode)}
      data={
        <div className="flex w-full flex-wrap justify-center gap-md-l">
          <AccountDataBlock title="Dein Profil" actionLabel="Abmelden">
            <AccountSummaryItem label="Vorname:" lines={[[CUSTOMER.firstName]]} />
            <AccountSummaryItem label="Nachname:" lines={[[ADDRESS.lastName]]} />
            <AccountSummaryItem label="E-Mail:" lines={[[CUSTOMER.email]]} />
          </AccountDataBlock>
          <AccountDataBlock title="Deine Adressen">
            <AccountAddressItem label="Adresse 1:" address={ADDRESS} />
          </AccountDataBlock>
          <AccountDataBlock title="Deine Zahlungsmethoden">
            <AccountPaymentItem
              label="Zahlungsart 1:"
              payment={{ brand: 'visa', number: '**** **** **** 1234', expiry: '06/2027' }}
            />
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
