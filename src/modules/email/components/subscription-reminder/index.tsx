import Link from 'next/link'

import { IconLogIn, LogoTarabao } from '@/components/icons/figma-icons'
import { Button } from '@/components/ui/button'
import { DefaultParagraph, HeadlineH2 } from '@/components/ui/typography'
import { CartProductItem } from '@modules/cart/components/cart-product-item'
import type { CartItemModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface SubscriptionReminderProps {
  /** Liefertermin aus dem Abo, z. B. „14. Oktober“ */
  deliveryDateLabel: string
  /** Produkte der nächsten Lieferung */
  items: CartItemModel[]
  /** Magic Link zur Abo-Seite (gilt bis 14 Tage nach der Lieferung, nur für das Abo) */
  subscriptionHref: string
  className?: string
}

/**
 * Figma: Components / Email / SubscriptionReminder (10353:58602). Erinnerungs-E-Mail eine Woche vor jeder
 * Lieferung im Nuss-Abo. Fläche surface-color, 320–768 px breit (Block Element), Abstände wie die
 * Check-out-Karten (gap-md, px/pt lg, pb-7): Logo, Titel (ShoppingCart & Checkout/MainHeadline), Text,
 * H2 Alternative „In Deiner nächsten Lieferung“, Components / Cart / ProductItem mit Editable?=False,
 * Buttons / MD / PrimaryButton „Zu Deinem Abo“ (Magic Link) und zwei Absätze.
 * Den Versand übernimmt das Notification-Modul von Medusa; diese Komponente zeigt Aufbau und Texte.
 */
export function SubscriptionReminder({
  deliveryDateLabel,
  items,
  subscriptionHref,
  className,
}: SubscriptionReminderProps) {
  return (
    <article
      data-slot="subscription-reminder"
      aria-labelledby="subscription-reminder-title"
      className={cn(
        'flex w-full min-w-block-min max-w-block-max flex-col gap-md bg-surface px-lg pt-lg pb-7 text-content-text',
        className,
      )}
    >
      <LogoTarabao title="tarabao" className="h-7 w-auto self-start" />
      <h2
        id="subscription-reminder-title"
        className="w-full max-w-128 type-shopping-cart-checkout-main-headline text-content-text"
      >
        Deine nächste Lieferung kommt bald
      </h2>
      <DefaultParagraph>
        Am {deliveryDateLabel} schicken wir Dir Dein Nuss-Abo. Bis dahin kannst Du es anpassen, eine Lieferung pausieren
        oder kündigen.
      </DefaultParagraph>
      <HeadlineH2 variant="alternative">In Deiner nächsten Lieferung</HeadlineH2>
      <ul className="flex w-full flex-col gap-md">
        {items.map((item) => (
          <li key={item.id}>
            <CartProductItem item={item} editable={false} />
          </li>
        ))}
      </ul>
      <Button
        asChild
        intent="primary"
        size="md"
        className="w-full"
        icon={<IconLogIn aria-hidden className="h-btn-md-icon w-auto" />}
      >
        <Link href={subscriptionHref}>Zu Deinem Abo</Link>
      </Button>
      <DefaultParagraph>
        Mit dem Button kommst Du ohne Passwort zu Deinem Abo. Der Link gilt bis zwei Wochen nach der Lieferung.
      </DefaultParagraph>
      <DefaultParagraph>
        Fragen? Schreib uns an{' '}
        <a
          href="mailto:support@tarabao.bio"
          className="underline focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
        >
          support@tarabao.bio
        </a>
      </DefaultParagraph>
    </article>
  )
}
