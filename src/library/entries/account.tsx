import { AccountDataBlock, AccountSummaryItem } from '@modules/account/components/account-data-block'
import { EmailLinkSent } from '@modules/account/components/email-link-sent'
import { SubscriptionReminder } from '@modules/email/components/subscription-reminder'
import { PurchaseSummary } from '@modules/account/components/purchase-summary'
import { NussAboCancellationStatus, SubscriptionManagement } from '@modules/account/components/subscription-management'
import { OrderCancellation } from '@modules/legal/components/withdrawal-form'
import { SearchPurchase } from '@modules/legal/components/withdrawal-form/search-purchase'
import { SelectOrder } from '@modules/legal/components/withdrawal-form/select-order'
import { SelectProducts } from '@modules/legal/components/withdrawal-form/select-products'
import {
  AccountAddressEditor,
  AccountAddressItem,
  AccountPaymentItem,
} from '@modules/account/components/account-editors'
import { addressLines } from '@/lib/checkout/address'
import {
  ADDRESS,
  CANCELLABLE_ORDERS,
  CUSTOMER,
  PURCHASE,
  PURCHASE_ARRIVED,
  RETURNABLE_ITEMS,
  SUBSCRIPTION_ITEMS,
  SUBSCRIPTION_REMINDER,
} from '@/lib/fixtures'
import { Specimen } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const grid = 'grid w-full grid-cols-1 items-start gap-md lg:grid-cols-2'

export const accountEntries: LibraryEntry[] = [
  {
    id: 'components-purchase-summary',
    figma: 'Components / PurchaseSummary',
    nodeId: '6794:18851',
    code: '<PurchaseSummary summary={purchase.summary} />',
    render: () => (
      <div className="flex flex-wrap gap-xl">
        <Specimen label="Status=Order Received">
          <PurchaseSummary summary={PURCHASE.summary} />
        </Specimen>
        <Specimen label="Status=Order Arrived">
          <PurchaseSummary summary={PURCHASE_ARRIVED.summary} />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-account-data-block',
    figma: 'Components / Account / DataBlock · SummaryItem',
    nodeId: '3941:19858',
    code: '<AccountDataBlock title="Dein Profil" actionLabel="Abmelden">…</AccountDataBlock> · <AccountAddressItem label="Adresse 1:" address={address} /> · <AccountPaymentItem label="Zahlungsart 1:" payment={payment} />',
    note: 'SummaryItem Editing?=True zeigt statt Label und Buttons die passenden Eingabefelder (Adresse 1, Adresse 2 mit Land, Zahlungsmethode) und darunter „Speichern“; „Korrigieren“ öffnet sie, „Speichern“ übernimmt die Eingaben, „Löschen“ blendet den Eintrag aus.',
    render: () => (
      <div className={grid}>
        <AccountDataBlock title="Dein Profil" actionLabel="Abmelden">
          <AccountSummaryItem label="Vorname:" lines={[[CUSTOMER.firstName]]} />
          <AccountSummaryItem label="Nachname:" lines={[[ADDRESS.lastName]]} />
          <AccountSummaryItem label="E-Mail:" lines={[[CUSTOMER.email]]} />
        </AccountDataBlock>
        <AccountDataBlock
          title="Deine Wunschliste"
          emptyText="Deine Wunschliste ist leer"
          actionLabel="Ganze Liste zeigen"
        />
        <AccountDataBlock title="Deine Adressen">
          <AccountAddressItem label="Adresse 1:" address={ADDRESS} />
          <AccountSummaryItem
            label="Adresse 2:"
            lines={addressLines(ADDRESS, true)}
            editing
            editor={<AccountAddressEditor defaultValue={ADDRESS} withCountry legend="Adresse 2" />}
          />
        </AccountDataBlock>
        <AccountDataBlock title="Deine Zahlungsmethoden">
          <AccountPaymentItem
            label="Zahlungsart 1:"
            payment={{ brand: 'visa', number: '**** **** **** 1234', expiry: '06/2024' }}
          />
        </AccountDataBlock>
      </div>
    ),
  },
  {
    id: 'components-subscription-management',
    figma: 'Components / Subscription Management · Nuss-AboCancellationStatus',
    nodeId: '8840:26061',
    code: '<SubscriptionManagement items={items} canceled={status === "canceled"} onPause={…} onReactivate={…} />',
    note: 'Abwählen eines Artikels wechselt zu State=Deselected. Gekündigt?=True zeigt „Du hast Dein Abo gekündigt“ mit „Kündigung zurücknehmen“; Kündigen-Box (Status Cancellation, Canceled, Reactivated) und Abwählen-Box folgen demselben Abo-Status.',
    render: () => (
      <div className={grid}>
        <Specimen label="State=Default">
          <SubscriptionManagement items={SUBSCRIPTION_ITEMS} />
        </Specimen>
        <div className="flex flex-col gap-md">
          <Specimen label="State=Canceled">
            <SubscriptionManagement items={SUBSCRIPTION_ITEMS} paused />
          </Specimen>
          <Specimen label="Gekündigt?=True">
            <SubscriptionManagement items={SUBSCRIPTION_ITEMS} canceled />
          </Specimen>
          <Specimen label="Nuss-AboCancellationStatus · Status=Cancellation / Canceled / Reactivated">
            <div className="flex flex-col gap-lg">
              <NussAboCancellationStatus />
              <NussAboCancellationStatus status="canceled" />
              <NussAboCancellationStatus status="reactivated" />
            </div>
          </Specimen>
        </div>
      </div>
    ),
  },
  {
    id: 'components-order-cancellation',
    figma: 'Components / OrderCancellation · SearchPurchase · Cancellation / SelectOrder · SelectProducts',
    nodeId: '6811:20710',
    code: '<OrderCancellation orders={orders} items={items} />',
    note: 'Die Buttons führen durch die Schritte (Beispiel ohne Server).',
    render: () => (
      <div className={grid}>
        <Specimen label="Ablauf (Default → …)">
          <OrderCancellation orders={CANCELLABLE_ORDERS} items={RETURNABLE_ITEMS} />
        </Specimen>
        <div className="flex flex-col gap-md">
          <Specimen label="SearchPurchase">
            <SearchPurchase />
          </Specimen>
          <Specimen label="Cancellation / SelectOrder">
            <SelectOrder orders={CANCELLABLE_ORDERS} />
          </Specimen>
          <Specimen label="Cancellation / SelectProducts">
            <SelectProducts items={RETURNABLE_ITEMS} />
          </Specimen>
          <Specimen label="State=Complete">
            <OrderCancellation orders={CANCELLABLE_ORDERS} items={RETURNABLE_ITEMS} defaultStep="complete" />
          </Specimen>
        </div>
      </div>
    ),
  },
  {
    id: 'components-account-email-link-sent',
    figma: 'Components / Account / EmailLinkSent',
    nodeId: '10351:54980',
    code: '<EmailLinkSent variant="magic-link" email={email} onResend={…} />',
    note: 'Zeigt immer dieselbe Bestätigung, auch ohne Konto zur E-Mail. „Erneut senden“ ist danach 30 s gesperrt.',
    render: () => (
      <div className={grid}>
        <Specimen label="Variant=PasswordReset">
          <EmailLinkSent email={CUSTOMER.email} />
        </Specimen>
        <Specimen label="Variant=MagicLink">
          <EmailLinkSent variant="magic-link" email={CUSTOMER.email} />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-email-subscription-reminder',
    figma: 'Components / Email / SubscriptionReminder',
    nodeId: '10353:58602',
    code: '<SubscriptionReminder deliveryDateLabel="14. Oktober" items={items} subscriptionHref={magicLink} />',
    note: 'Erinnerungs-E-Mail 7 Tage vor jeder Abo-Lieferung (Notification-Modul von Medusa). „Zu Deinem Abo“ ist ein Magic Link mit Bereich subscription, gültig bis 14 Tage nach der Lieferung.',
    render: () => (
      <div className={grid}>
        <Specimen label="Components / Email / SubscriptionReminder">
          <SubscriptionReminder {...SUBSCRIPTION_REMINDER} />
        </Specimen>
      </div>
    ),
  },
]
