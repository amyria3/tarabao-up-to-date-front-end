import { AccountDataBlock, AccountSummaryItem } from '@modules/account/components/account-data-block'
import { PurchaseSummary } from '@modules/account/components/purchase-summary'
import { NussAboCancellationStatus, SubscriptionManagement } from '@modules/account/components/subscription-management'
import { OrderCancellation } from '@modules/legal/components/withdrawal-form'
import { SearchPurchase } from '@modules/legal/components/withdrawal-form/search-purchase'
import { SelectOrder } from '@modules/legal/components/withdrawal-form/select-order'
import { SelectProducts } from '@modules/legal/components/withdrawal-form/select-products'
import { AddressFieldset } from '@modules/checkout/components/address-fieldset'
import { addressLines } from '@/lib/checkout/address'
import {
  ADDRESS,
  CANCELLABLE_ORDERS,
  CUSTOMER,
  PURCHASE,
  PURCHASE_ARRIVED,
  RETURNABLE_ITEMS,
  SUBSCRIPTION_ITEMS,
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
    code: '<AccountDataBlock title="Dein Profil" actionLabel="Abmelden">…</AccountDataBlock> · <AccountSummaryItem editor={<AddressFieldset …/>} editing />',
    note: 'SummaryItem Editing?=True zeigt statt Label und Buttons die passenden Eingabefelder (Adresse 1, Adresse 2 mit Land, Zahlungsmethode); „Korrigieren“ öffnet sie.',
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
          <AccountSummaryItem
            label="Adresse 1:"
            lines={addressLines(ADDRESS)}
            editor={<AddressFieldset defaultValue={ADDRESS} defaultManual legend="Adresse 1" />}
          />
          <AccountSummaryItem
            label="Adresse 2:"
            lines={addressLines(ADDRESS)}
            editing
            editor={<AddressFieldset defaultValue={ADDRESS} defaultManual legend="Adresse 2" />}
          />
        </AccountDataBlock>
        <AccountDataBlock title="Deine Zahlungsmethoden">
          <AccountSummaryItem label="Zahlungsart 1:" lines={[['Visa ****1234']]} note="Expires 06/2024" />
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
]
