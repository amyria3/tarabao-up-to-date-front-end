'use client'

import * as React from 'react'

import {
  NussAboCancellationStatus,
  type NussAboStatus,
  SubscriptionManagement,
} from '@/components/design-system/account/subscription-management'
import { IconArrowDown30, IconArrowUp30 } from '@/components/design-system/icons/figma-icons'
import { HeadlineH3 } from '@/components/design-system/primitives/typography'
import { Section } from '@/components/design-system/templates/section'
import type { CartItemModel } from '@/lib/view-models'

export interface CollapsibleSectionProps {
  /** z. B. „Deine Bestellungen“, „Gutscheine & Angebote“, „Deine Daten“ */
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

/**
 * Figma: Sections / Account / CollapsibleSection (8945:32963) · Bestellungen?, Gutscheine & Angebote?,
 * Deine Daten?, Open?. Templates / Section: Slot 00 „Title + Button“ (H2 Alternative bis max-w-128
 * und Icons / ArrowUp · ArrowDown / 30, gap-md), Slot 01 der Inhalt (Spalte gap-md-l, zentriert).
 */
export function CollapsibleSection({ title, defaultOpen = false, children }: CollapsibleSectionProps) {
  const [open, setOpen] = React.useState(defaultOpen)
  const id = React.useId()
  return (
    <Section aria-label={title} data-state={open ? 'open' : 'closed'}>
      <h2 className="flex w-full">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-content`}
          onClick={() => setOpen(!open)}
          className="flex w-full cursor-pointer items-center gap-md text-left type-h2-alternative text-content-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg"
        >
          <span className="max-w-128">{title}</span>
          {open ? (
            <IconArrowUp30 aria-hidden className="h-3 w-7.5" />
          ) : (
            <IconArrowDown30 aria-hidden className="h-3 w-7.5" />
          )}
        </button>
      </h2>
      {open ? (
        <div id={`${id}-content`} className="flex w-full flex-col items-center gap-md-l">
          {children}
        </div>
      ) : null}
    </Section>
  )
}

/**
 * Figma: Sections / Account / Nuss-Abo Verwanltung (8819:25733) · Show Overlay?. Templates / Section:
 * H3 „Dein Abo“ (mittig), darunter Zeile mit Umbruch (gap-md, py-2.5): Components / Subscription
 * Management und Components / Nuss-Abo Cancellation (512 px).
 */
export interface NussAboSectionProps {
  items: CartItemModel[]
  /** Abo-Status, den Kündigen-Box und Abwählen-Box gemeinsam zeigen (Figma: subscription-canceled). */
  defaultStatus?: NussAboStatus
  onStatusChange?: (status: NussAboStatus) => void
}

/**
 * Figma: Sections / Account / Nuss-Abo Verwaltung (8819:25733). Kündigen-Box (Nuss-AboCancellationStatus,
 * max-w-nuss-abo-cancellation-status-max) und Abwählen-Box (Subscription Management,
 * max-w-subscription-management-max) in einer Wrap-Reihe: nebeneinander, wenn die Breite reicht, sonst
 * untereinander. Kündigen setzt beide auf „gekündigt“, Wieder aktivieren und Kündigung zurücknehmen zurück.
 */
export function NussAboSection({ items, defaultStatus = 'cancellation', onStatusChange }: NussAboSectionProps) {
  const [status, setStatus] = React.useState<NussAboStatus>(defaultStatus)
  const set = (next: NussAboStatus) => {
    setStatus(next)
    onStatusChange?.(next)
  }
  return (
    <Section aria-label="Dein Abo">
      <HeadlineH3 as="h2" align="center">
        Dein Abo
      </HeadlineH3>
      <div className="flex w-full flex-wrap items-start justify-center gap-md py-2.5">
        <NussAboCancellationStatus
          status={status}
          className="min-w-panel-min flex-1"
          onAction={() => set(status === 'canceled' ? 'reactivated' : 'canceled')}
        />
        <SubscriptionManagement
          items={items}
          canceled={status === 'canceled'}
          className="flex-1"
          onReactivate={() => set('reactivated')}
        />
      </div>
    </Section>
  )
}
