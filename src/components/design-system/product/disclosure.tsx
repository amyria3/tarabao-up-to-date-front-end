'use client'

import * as React from 'react'

import { ArrowUpOrDown } from '@/components/design-system/primitives/arrow-up-or-down'
import { cn } from '@/lib/utils'

export interface DisclosureProps {
  title: React.ReactNode
  children?: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Figma State=Overlay: Die Zeile klappt nicht auf, sondern öffnet ein Overlay (Pfeil nach rechts). */
  overlay?: boolean
  onOpenOverlay?: () => void
  /** Polster des Inhalts; Standard wie Type=Text only (px-xl, pb-xxxl) */
  contentClassName?: string
  headingLevel?: 'h2' | 'h3' | 'h4'
  className?: string
}

/**
 * Figma: Components / Disclosure (283:633) · State=Default|Open|Overlay, Type=Text only|Inhaltsstoffe|
 * Nährwerte-Tabelle|Lieferkette und Lieferanten|Ladensuche|NestedHero …
 * Kopfzeile py-md-l gap-md-l: Titel ProductPage/Dropdown/Summary und ArrowUpOrDown (22),
 * darunter der Inhalt und eine Trennlinie in content-text. Der Inhalt je Type kommt als children.
 */
export function Disclosure({
  title,
  children,
  defaultOpen = false,
  open: controlled,
  onOpenChange,
  overlay: overlayProp,
  onOpenOverlay,
  contentClassName,
  headingLevel: Heading = 'h3',
  className,
}: DisclosureProps) {
  const [inner, setInner] = React.useState(defaultOpen)
  const open = controlled ?? inner
  const id = React.useId()
  const overlay = overlayProp ?? Boolean(onOpenOverlay)
  const toggle = () => {
    if (overlay) return onOpenOverlay?.()
    const next = !open
    if (controlled === undefined) setInner(next)
    onOpenChange?.(next)
  }
  return (
    <div
      data-slot="disclosure"
      data-state={overlay ? 'overlay' : open ? 'open' : 'closed'}
      className={cn('flex w-full flex-col border-b border-content-text text-content-text', className)}
    >
      <Heading className="w-full">
        <button
          type="button"
          aria-expanded={overlay ? undefined : open}
          aria-controls={overlay ? undefined : `${id}-panel`}
          aria-haspopup={overlay ? 'dialog' : undefined}
          onClick={toggle}
          className="flex w-full cursor-pointer items-center gap-md-l py-md-l text-left type-product-page-dropdown-summary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg"
        >
          <span className={cn(overlay && 'flex-1')}>{title}</span>
          {overlay ? (
            <ArrowUpOrDown variant="down" size={22} className="-rotate-90" />
          ) : (
            <ArrowUpOrDown variant={open ? 'up' : 'down'} size={22} />
          )}
        </button>
      </Heading>
      {!overlay ? (
        <div
          id={`${id}-panel`}
          role="region"
          aria-label={typeof title === 'string' ? title : undefined}
          hidden={!open}
          className={cn('w-full px-xl pb-xxxl', contentClassName)}
        >
          {children}
        </div>
      ) : null}
    </div>
  )
}
