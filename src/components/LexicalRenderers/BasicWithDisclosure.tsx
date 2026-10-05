'use client'

import * as React from 'react'
import { ArrowUpOrDown } from '@/components/ui/arrow-up-or-down'
import { DefaultParagraph, HeadlineH3 } from '@/components/ui/typography'
import { ProductImage } from '@modules/products/components/product-image'
import { cn } from '@/lib/utils'

export interface BasicWithDisclosureProps {
  title: React.ReactNode
  text: React.ReactNode
  /** Figma Slot „Signets [A.1 Zertifizierungen]“: Anzahl Platzhalter 50 × 50 oder eigene Inhalte */
  signets?: number | React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  headingLevel?: 'h3' | 'h4'
  className?: string
}

/**
 * Figma: ContentModules / BasicWithDisclosure (8141:22208) · State=Default|Open, Show Slot Signets.
 * Spalte gap-sm, min/max block: H3 mit ArrowUpOrDown (22), darunter DefaultParagraph MD.
 * Zu: Absatz auf 3 Zeilen gekürzt. Offen: voller Absatz und Signets (Platzhalter, gap-md-sm).
 */
export function BasicWithDisclosure({
  title,
  text,
  signets,
  open: controlled,
  defaultOpen = false,
  onOpenChange,
  headingLevel = 'h3',
  className,
}: BasicWithDisclosureProps) {
  const [inner, setInner] = React.useState(defaultOpen)
  const open = controlled ?? inner
  const id = React.useId()
  const toggle = () => {
    if (controlled === undefined) setInner(!open)
    onOpenChange?.(!open)
  }
  return (
    <div
      data-slot="basic-with-disclosure"
      data-state={open ? 'open' : 'closed'}
      className={cn('flex w-full min-w-block-min max-w-block-max flex-col gap-sm', className)}
    >
      <HeadlineH3 as={headingLevel}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-text`}
          onClick={toggle}
          className="flex w-full cursor-pointer items-start justify-between gap-sm text-left [text-transform:inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg"
        >
          <span>{title}</span>
          <span className="flex h-5 w-5.5 shrink-0 items-center justify-center">
            <ArrowUpOrDown variant={open ? 'up' : 'down'} size={22} />
          </span>
        </button>
      </HeadlineH3>
      <div id={`${id}-text`} className="flex w-full flex-col gap-md-sm">
        <DefaultParagraph size="md" className={cn(!open && 'line-clamp-3')}>
          {text}
        </DefaultParagraph>
        {open && signets ? (
          <ul className="flex w-full flex-wrap justify-center gap-md-sm" aria-label="Zertifizierungen">
            {typeof signets === 'number'
              ? Array.from({ length: signets }, (_, i) => (
                  <li key={i} className="size-12.5">
                    <ProductImage image={{ src: '', alt: `Siegel ${i + 1}` }} />
                  </li>
                ))
              : signets}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

/* ---- ContentModules / CMS / MediaText ---- */
