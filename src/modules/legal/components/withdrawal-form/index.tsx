'use client'

import * as React from 'react'

import { CartLogIn } from '@modules/cart/components/cart-login'
import { SearchPurchase } from '@modules/legal/components/withdrawal-form/search-purchase'
import { SelectOrder, type CancellableOrder } from '@modules/legal/components/withdrawal-form/select-order'
import { SelectProducts, type ReturnableItem } from '@modules/legal/components/withdrawal-form/select-products'
import { BlockElement } from '@/components/ui/block-element'
import { DefaultParagraph, InlineQuestion, UserMessageExplanation } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CancellationStep = 'intro' | 'order-number' | 'login' | 'select-order' | 'select-items' | 'complete'

export interface OrderCancellationProps {
  orders: CancellableOrder[]
  items: ReturnableItem[]
  orderNumber?: string
  returnAddress?: string[]
  defaultStep?: CancellationStep
  className?: string
}

/**
 * Figma: Components / OrderCancellation (6811:20710) · State=Default|SelectOrder|SelectItems|Complete|LogIn,
 * Filled Out?, AllItemsSelected?, Bestellnummer?. Widerruf in Schritten, p xl/lg, gap xl:
 * Components / BlockElement · Widerruf → SearchPurchase (oder „Melde Dich an“) → Cart / LogIn →
 * Cancellation / SelectOrder → „Bestellung #…“ + Cancellation / SelectProducts → Bestätigung
 * „Wir haben Deinen Widerruf erhalten!“ mit Rücksendeadresse.
 * Die Schritte laufen hier als Beispiel ohne Server; im Shop steuern Medusa-Aufrufe den Wechsel.
 */
export function OrderCancellation({
  orders,
  items,
  orderNumber = '489443',
  returnAddress = ['Bio.Fair.Direkt. GmbH', 'Eichenstr. 1', '95233 Helmbrechts'],
  defaultStep = 'intro',
  className,
}: OrderCancellationProps) {
  const [step, setStep] = React.useState<CancellationStep>(defaultStep)
  return (
    <section
      data-slot="order-cancellation"
      data-step={step}
      aria-label="Widerruf"
      className={cn(
        'flex w-full max-w-138 flex-col items-center gap-xl bg-surface px-lg py-xl text-content-text',
        className,
      )}
    >
      {step === 'intro' ? <BlockElement variant="widerruf" padding onAction={() => setStep('order-number')} /> : null}
      {step === 'order-number' ? (
        <>
          <SearchPurchase onSubmit={() => setStep('select-items')} />
          <div className="flex w-full max-w-block-max flex-col items-center gap-md">
            <UserMessageExplanation title="oder Melde Dich an" as="h3" className="text-center">
              Um die Bestellung auszuwählen, die Du zurückgeben möchtest
            </UserMessageExplanation>
            <Button intent="secondary" size="sm" className="w-full" onClick={() => setStep('login')}>
              Anmelden
            </Button>
          </div>
        </>
      ) : null}
      {step === 'login' ? (
        <div className="flex w-full max-w-block-max flex-col gap-md">
          <UserMessageExplanation title="Melde Dich an" as="h3" className="text-center">
            Um die Bestellung auszuwählen, die Du zurückgeben möchtest
          </UserMessageExplanation>
          <CartLogIn onSubmit={() => setStep('select-order')} />
          <InlineQuestion
            question="Oder zurück und Bestellnummer eingeben"
            action="Hier clicken"
            onAction={() => setStep('order-number')}
          />
        </div>
      ) : null}
      {step === 'select-order' ? <SelectOrder orders={orders} onSubmit={() => setStep('select-items')} /> : null}
      {step === 'select-items' ? (
        <div className="flex w-full max-w-block-max flex-col gap-md-l">
          <p className="flex gap-xxs type-data-blocks-summary-item-title">
            <span>Bestellung</span>
            <span>#{orderNumber}</span>
          </p>
          <SelectProducts items={items} onSubmit={() => setStep('complete')} />
        </div>
      ) : null}
      {step === 'complete' ? (
        <div role="status" className="flex w-full max-w-block-max flex-col items-center gap-md text-center">
          <UserMessageExplanation title="Wir haben Deinen Widerruf erhalten!" as="h3" className="text-center">
            Bitte sende Deine Bestellung nach Erhalt zurück. Ein wichtiger Hinweis: Achte auf ausreichendes
            Verpackungsmaterial – möge die Post mit Dir sein.
          </UserMessageExplanation>
          <DefaultParagraph size="md" className="text-center">
            {returnAddress.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </DefaultParagraph>
        </div>
      ) : null}
    </section>
  )
}
