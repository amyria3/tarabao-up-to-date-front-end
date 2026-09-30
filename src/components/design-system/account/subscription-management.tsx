'use client'

import * as React from 'react'

import { CartProductItem } from '@/components/design-system/cart/cart-product-item'
import { HeadlineH2, HeadlineH3, UserMessageExplanation } from '@/components/design-system/primitives/typography'
import { InformationBubble } from '@/components/design-system/switches/information-bubble'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { CartItemModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type SubscriptionState = 'default' | 'deselected' | 'canceled'

const MESSAGES: Record<SubscriptionState, string> = {
  default: 'Hier kannst Du eines der Produkte für die nächste Lieferung abwählen :)',
  deselected: 'Du hast einige Produkte aus Deiner nächsten Lieferung abgewählt',
  canceled: 'Wir überspringen Deine Lieferung am … . Die nächste Lieferung kommt am …',
}

export interface SubscriptionManagementProps {
  items: CartItemModel[]
  /** Figma State=Canceled: nächste Lieferung pausiert */
  paused?: boolean
  /** Texte mit Datum für State=Canceled */
  pausedMessage?: string
  /** Figma Gekündigt?=True: „Du hast Dein Abo gekündigt“, Artikel nur lesen, „Kündigung zurücknehmen“. */
  canceled?: boolean
  /** Text mit Datum für Gekündigt?=True */
  canceledMessage?: string
  onSelectionChange?: (itemIds: string[]) => void
  onPause?: () => void
  /** Gekündigt?=True: Kündigung zurücknehmen (setzt den Abo-Status zurück). */
  onReactivate?: () => void
  pauseLabel?: string
  reactivateLabel?: string
  className?: string
}

const CANCELED_MESSAGE = 'Du hast Dein Abo am … gekündigt. In Deiner letzten Lieferung waren enthalten:'

/**
 * Figma: Components / Subscription Management (8840:26061) · State=Default|Deselected|Canceled × Gekündigt?.
 * Abwählen-Box: p-md-l gap-md-l, surface-color, fluid von min-w-panel-min bis
 * max-w-subscription-management-max: (ab Deselected) Titel „Dein Abo“ (H3, mittig), Information Bubble
 * mit Hinweis, H2 Alternative „In Deiner nächsten Lieferung enthalten:“, je Artikel CheckBox +
 * Cart / ProductItem (gap-md-sm), „oder“ (Cards/MD) und Buttons / SM / PrimaryButton
 * „ganze Lieferung um 1 Monat Pausieren“. Gekündigt?=True: Hinweis „Du hast Dein Abo am … gekündigt“,
 * Artikel nur lesen (px-lg) und „Kündigung zurücknehmen“ (Hug content?=True).
 */
export function SubscriptionManagement({
  items,
  paused = false,
  pausedMessage,
  canceled = false,
  canceledMessage = CANCELED_MESSAGE,
  onSelectionChange,
  onPause,
  onReactivate,
  pauseLabel = 'ganze Lieferung um 1 Monat Pausieren',
  reactivateLabel = 'Kündigung zurücknehmen',
  className,
}: SubscriptionManagementProps) {
  const [selected, setSelected] = React.useState<string[]>(items.map((i) => i.id))
  const state: SubscriptionState = paused ? 'canceled' : selected.length < items.length ? 'deselected' : 'default'
  const toggle = (id: string, on: boolean) => {
    const next = on ? [...selected, id] : selected.filter((x) => x !== id)
    setSelected(next)
    onSelectionChange?.(next)
  }
  const root = cn(
    'flex w-full min-w-panel-min max-w-subscription-management-max flex-col items-center gap-md-l bg-surface p-md-l text-content-text',
    className,
  )
  if (canceled) {
    return (
      <section
        data-slot="subscription-management"
        data-state={state}
        data-canceled
        aria-label="Dein Abo"
        className={root}
      >
        <HeadlineH3 align="center">Dein Abo</HeadlineH3>
        <div className="flex w-full flex-col items-center pb-md">
          <InformationBubble fill={false} showIcon={false} role="status">
            {canceledMessage}
          </InformationBubble>
        </div>
        <ul className="flex w-full flex-col gap-md-sm px-lg">
          {items.map((item) => (
            <li key={item.id} className="flex w-full items-start gap-md-sm">
              <CartProductItem item={item} editable={false} />
            </li>
          ))}
        </ul>
        <p className="w-full text-center type-cards-md">oder</p>
        <div className="flex w-full flex-col items-center gap-xxs">
          <Button intent="primary" size="sm" width="hug" onClick={onReactivate}>
            {reactivateLabel}
          </Button>
        </div>
      </section>
    )
  }
  return (
    <section data-slot="subscription-management" data-state={state} aria-label="Dein Abo" className={root}>
      {state !== 'default' ? <HeadlineH3 align="center">Dein Abo</HeadlineH3> : null}
      <div className="flex w-full flex-col pb-md">
        <InformationBubble fill={false} role="status">
          {state === 'canceled' && pausedMessage ? pausedMessage : MESSAGES[state]}
        </InformationBubble>
      </div>
      <div className="flex w-full flex-col gap-md">
        <HeadlineH2 variant="alternative">In Deiner nächsten Lieferung enthalten:</HeadlineH2>
        <ul className="flex w-full flex-col gap-md-sm">
          {items.map((item) => (
            <li key={item.id} className="flex w-full items-start gap-md-sm">
              <Checkbox
                checked={selected.includes(item.id)}
                onCheckedChange={(c) => toggle(item.id, c === true)}
                aria-label={`${item.title} in der nächsten Lieferung`}
              />
              <CartProductItem item={item} className={cn(!selected.includes(item.id) && 'opacity-60')} />
            </li>
          ))}
        </ul>
      </div>
      <p className="w-full type-cards-md">oder</p>
      <div className="flex w-full flex-col gap-xxs">
        <Button intent="primary" size="sm" className="w-full" onClick={onPause} disabled={paused}>
          {pauseLabel}
        </Button>
      </div>
    </section>
  )
}

export type NussAboStatus = 'cancellation' | 'canceled' | 'reactivated'

const ABO: Record<NussAboStatus, { title: string; text: string; action: string }> = {
  cancellation: {
    title: 'Hier kannst Du Dein Nuss-Abo kündigen',
    text: 'Noch x Tage bis zur nächsten Abbuchung',
    action: 'Nuss-Abo kündigen',
  },
  canceled: {
    title: 'Du hast Dein Nuss-Abo gekündigt.',
    text: 'Die letzte Abbuchung & Lieferung war / wird am … sein.',
    action: 'Abo wieder aktivieren',
  },
  reactivated: {
    title: 'Schön, dass Du das Nuss-Abo wieder abonniert hast!',
    text: 'Deine nächste Abbuchung & Lieferung war / wird am … sein.',
    action: 'Nuss-Abo kündigen',
  },
}

/**
 * Figma: Components / Nuss-AboCancellationStatus (8867:48260) · Status=Cancellation|Canceled|Reactivated.
 * Kündigen-Box: Primitives / UserMessage & Explanation und Buttons / SM / SecondaryButton: kündigen,
 * gekündigt (wieder aktivieren), wieder aktiviert. Kündigen-Box und Abwählen-Box folgen demselben
 * Abo-Status (Figma: `subscription-canceled`, nur Prototyp); im Code hält ihn der Aufrufer.
 * Höchstbreite max-w-nuss-abo-cancellation-status-max.
 */
export function NussAboCancellationStatus({
  status = 'cancellation',
  text,
  onAction,
  className,
}: {
  status?: NussAboStatus
  /** Text mit echten Daten statt der Figma-Platzhalter */
  text?: string
  onAction?: () => void
  className?: string
}) {
  const t = ABO[status]
  return (
    <div
      data-slot="nuss-abo-cancellation-status"
      data-status={status}
      className={cn('flex w-full max-w-nuss-abo-cancellation-status-max flex-col gap-md', className)}
    >
      <UserMessageExplanation title={t.title} as="h3">
        {text ?? t.text}
      </UserMessageExplanation>
      <Button intent="secondary" size="sm" onClick={onAction}>
        {t.action}
      </Button>
    </div>
  )
}

/** @deprecated Figma-Name bis 29.09.: Components / Nuss-Abo Cancellation. Nutze NussAboCancellationStatus. */
export const NussAboCancellation = NussAboCancellationStatus
