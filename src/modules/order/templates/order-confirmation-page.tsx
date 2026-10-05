import { OrderConfirmation } from '@modules/order/components/order-confirmation'
import { Section } from '@/components/ui/section'

/** Figma: 06-17-Checkout-OrderConfirmation. Eine Templates / Section mit Components / Checkout / OrderConfirmation. */
export function OrderConfirmationPage({ deliveryDateLabel }: { deliveryDateLabel: string }) {
  return (
    <>
      <Section aria-label="Bestellbestätigung">
        <OrderConfirmation deliveryDateLabel={deliveryDateLabel} />
      </Section>
    </>
  )
}
