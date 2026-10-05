import Link from 'next/link'

import { UserMessageExplanation } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Figma: Components / Checkout / OrderConfirmation (3826:18648). 512 px, p-lg gap-md:
 * UserMessage & Explanation „Danke für Deine Zahlung!“ mit Liefertermin, Kontaktzeilen
 * (UserMessage/Default) und Buttons / SM / SecondaryButton „Zu Deinem Kundenkonto“.
 */
export function OrderConfirmation({
  deliveryDateLabel,
  email = 'support@tarabao.bio',
  accountHref = '/de-de/account',
  className,
}: {
  deliveryDateLabel: string
  email?: string
  accountHref?: string
  className?: string
}) {
  return (
    <section
      data-slot="order-confirmation"
      className={cn(
        'flex w-full max-w-block-max flex-col items-center gap-md bg-surface p-lg text-content-text',
        className,
      )}
    >
      <UserMessageExplanation title="Danke für Deine Zahlung!" as="h1">
        Deine Bestellung kommt voraussichtlich am {deliveryDateLabel}.
      </UserMessageExplanation>
      <div className="flex w-full flex-col items-center gap-2 type-user-message-default">
        <p className="flex flex-wrap justify-center gap-sm text-center">
          <span>Schreib uns gern eine E-Mail auf:</span>
          <a
            href={`mailto:${email}`}
            className="underline focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
          >
            {email}
          </a>
        </p>
        <p className="text-right">*wir antworten in der Regel am Montag und Donnerstag auf E-Mails</p>
      </div>
      <div className="flex w-full flex-col items-center gap-xxs">
        <Button asChild intent="secondary" size="sm">
          <Link href={accountHref}>Zu Deinem Kundenkonto</Link>
        </Button>
      </div>
    </section>
  )
}
