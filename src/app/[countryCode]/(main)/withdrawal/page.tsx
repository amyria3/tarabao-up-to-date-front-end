import { OrderCancellation } from '@modules/legal/components/withdrawal-form'
import { Section } from '@/components/ui/section'
import { CANCELLABLE_ORDERS, RETURNABLE_ITEMS } from '@/lib/fixtures'

export const metadata = { title: 'Widerrufsformular' }

/** Widerruf wie `/withdrawal` in der Storefront: Figma Components / OrderCancellation mit Beispieldaten. */
export default function WithdrawalRoute() {
  return (
    <Section aria-label="Widerrufsformular">
      <OrderCancellation orders={CANCELLABLE_ORDERS} items={RETURNABLE_ITEMS} />
    </Section>
  )
}
