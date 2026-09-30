import { UserMessageExplanation } from '@/components/design-system/primitives/typography'
import { cn } from '@/lib/utils'

/**
 * Figma: Components / Checkout / Contact (3953:24967). p-xl gap-md-l, max-w-block-max:
 * Primitives / UserMessage & Explanation „Hast Du Fragen?“ und Hinweis (UserMessage/Default, mittig).
 */
export function CheckoutContact({ email = 'support@tarabao.bio', className }: { email?: string; className?: string }) {
  return (
    <section
      data-slot="checkout-contact"
      className={cn('flex w-full max-w-block-max flex-col items-center gap-md-l bg-surface p-xl', className)}
    >
      <UserMessageExplanation title="Hast Du Fragen?" as="h2">
        Schreib uns gern eine E-Mail auf:{' '}
        <a href={`mailto:${email}`} className="underline focus-visible:outline-2 focus-visible:outline-btn-primary-bg">
          {email}
        </a>{' '}
        *
      </UserMessageExplanation>
      <p className="w-full text-center type-user-message-default text-content-text">
        *wir antworten in der Regel am Montag und Donnerstag auf Mails
      </p>
    </section>
  )
}
