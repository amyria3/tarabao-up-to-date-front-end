'use client'

import * as React from 'react'

import { InformationBubble } from '@/components/ui/information-bubble'
import { MegaSwitch } from '@/components/ui/mega-switch'
import { RadioField, type RadioFieldOption } from '@/components/ui/radio-field'
import type { GlobalTheme } from '@/lib/design-system/themes'
import { cn } from '@/lib/utils'

export interface ChoiceProps {
  /** Figma Default Variant choosen?=False ↔ subscription=true */
  subscription?: boolean
  defaultSubscription?: boolean
  onSubscriptionChange?: (subscription: boolean) => void
  /** Text bei Einmalkauf (UserMessage/LG) */
  promoText?: string
  /** Text bei Abo (UserMessage/LG) */
  subscribedText?: string
  /** Hinweise als Information Bubbles, nur bei Abo sichtbar */
  benefits?: string[]
  /** Lieferrhythmus, nur bei Abo sichtbar */
  intervals?: RadioFieldOption[]
  interval?: string
  onIntervalChange?: (value: string) => void
  /** Figma pinnt die Komponente auf cole-tint-surface-warm. */
  theme?: GlobalTheme | null
  className?: string
}

/**
 * Figma: Choice (8819:23124) — Einmalkauf oder Abo in der BuyBox.
 * Spalte p-md, gap-xs (Einmalkauf) bzw. gap-md-l (Abo), min/max block.
 */
export function Choice({
  subscription,
  defaultSubscription = false,
  onSubscriptionChange,
  promoText = 'Bestelle Nachschub und profitiere von reduzierten Versandkosten',
  subscribedText = 'Du bestellst Das ausgewählte Produkt im Abo',
  benefits = ['Vorteil bei Versandkosten Erklärung', 'Erklärung kosten', 'Erklärung Kündigung'],
  intervals = [
    { value: 'monthly', label: '1 x monatlich' },
    { value: 'bimonthly', label: '1 x alle zwei Monate' },
  ],
  interval,
  onIntervalChange,
  theme = 'cole-tint-surface-warm',
  className,
}: ChoiceProps) {
  const [inner, setInner] = React.useState(defaultSubscription)
  const isSubscription = subscription ?? inner
  return (
    <div
      data-slot="choice"
      {...(theme ? { 'data-theme': theme } : {})}
      className={cn(
        'flex w-full min-w-block-min max-w-block-max flex-col justify-center bg-surface p-md text-content-text',
        isSubscription ? 'gap-md-l' : 'gap-xs',
        className,
      )}
    >
      <p className="w-full text-center type-user-message-lg" aria-live="polite">
        {isSubscription ? subscribedText : promoText}
      </p>
      <MegaSwitch
        checked={isSubscription}
        onCheckedChange={(next) => {
          if (subscription === undefined) setInner(next)
          onSubscriptionChange?.(next)
        }}
        aria-label="Bestellart"
      />
      {isSubscription ? (
        <>
          <ul className="flex w-full flex-wrap justify-end gap-xs">
            {benefits.map((benefit) => (
              <InformationBubble key={benefit} as="li" fill={false}>
                {benefit}
              </InformationBubble>
            ))}
          </ul>
          <RadioField
            options={intervals}
            value={interval}
            defaultValue={intervals[0]?.value}
            onValueChange={onIntervalChange}
            aria-label="Lieferrhythmus"
            className="gap-md-sm"
          />
        </>
      ) : null}
    </div>
  )
}
