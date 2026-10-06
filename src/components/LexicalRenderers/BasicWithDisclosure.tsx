'use client'

import * as React from 'react'
import { ArrowUpOrDown } from '@/components/ui/arrow-up-or-down'
import { DefaultParagraph, HeadlineH3 } from '@/components/ui/typography'
import { ProductImage } from '@modules/products/components/product-image'
import { cn } from '@/lib/utils'

export interface BasicWithDisclosureProps {
  title: React.ReactNode
  text: React.ReactNode
  /** Figma „Absatz 2“ (Show Absatz 2): Daten des Lieferanten, je Eintrag eine Zeile („Region: …“). Nur offen sichtbar. */
  supplierData?: React.ReactNode[]
  /** Figma „Absatz 3“ (Show Absatz 3): Ergänzungen des Lieferanten. Nur offen sichtbar. */
  supplierNote?: React.ReactNode
  /**
   * Figma Slot „Signets [A.1 Zertifizierungen]“: Anzahl Platzhalter 50 × 50, Namen der Siegel
   * (Platzhalter mit Alt-Text) oder eigene <li>-Inhalte. Nur offen sichtbar.
   */
  signets?: number | string[] | React.ReactNode
  /**
   * false: ohne Pfeil und immer offen. Figma nimmt dafür ContentModules / Basic (H3, DefaultParagraph MD,
   * gap-sm), z. B. im Tab No Plane mit nur einem Baustein.
   */
  collapsible?: boolean
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  headingLevel?: 'h3' | 'h4'
  className?: string
}

/**
 * Figma: ContentModules / BasicWithDisclosure (8141:22208) · State=Default|Open, Show Slot Signets.
 * Spalte gap-sm, min/max block: H3 mit ArrowUpOrDown (22), darunter Paragraph (gap-md-sm).
 * Zu: Absatz 1 auf 2 Zeilen gekürzt (Figma maxLines 2), Absatz 2/3 und Signets verborgen.
 * Offen: Absatz 1, Absatz 2 (Lieferantendaten zeilenweise), Absatz 3 (Ergänzungen), Signets.
 */
export function BasicWithDisclosure({
  title,
  text,
  supplierData,
  supplierNote,
  signets,
  collapsible = true,
  open: controlled,
  defaultOpen = false,
  onOpenChange,
  headingLevel = 'h3',
  className,
}: BasicWithDisclosureProps) {
  const [inner, setInner] = React.useState(defaultOpen)
  const open = !collapsible || (controlled ?? inner)
  const id = React.useId()
  const toggle = () => {
    if (controlled === undefined) setInner(!open)
    onOpenChange?.(!open)
  }
  const signetItems =
    typeof signets === 'number'
      ? Array.from({ length: signets }, (_, i) => `Siegel ${i + 1}`)
      : Array.isArray(signets) && signets.every((s) => typeof s === 'string')
        ? (signets as string[])
        : null
  return (
    <div
      data-slot="basic-with-disclosure"
      data-state={open ? 'open' : 'closed'}
      className={cn('flex w-full min-w-block-min max-w-block-max flex-col gap-sm', className)}
    >
      <HeadlineH3 as={headingLevel}>
        {collapsible ? (
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
        ) : (
          title
        )}
      </HeadlineH3>
      {/* Figma Paragraph: gap-md-sm; ContentModules / Basic (ohne Pfeil): gap-sm. */}
      <div id={`${id}-text`} className={cn('flex w-full flex-col', collapsible ? 'gap-md-sm' : 'gap-sm')}>
        <DefaultParagraph size="md" className={cn(!open && 'line-clamp-2')}>
          {text}
        </DefaultParagraph>
        {open && supplierData?.length ? (
          <DefaultParagraph size="md" data-slot="basic-with-disclosure-supplier-data">
            {supplierData.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </DefaultParagraph>
        ) : null}
        {open && supplierNote ? (
          <DefaultParagraph size="md" data-slot="basic-with-disclosure-supplier-note">
            {supplierNote}
          </DefaultParagraph>
        ) : null}
        {open && (signetItems ? signetItems.length > 0 : signets) ? (
          <ul className="flex w-full flex-wrap justify-center gap-md-sm" aria-label="Zertifizierungen">
            {signetItems
              ? signetItems.map((name) => (
                  <li key={name} className="size-12.5">
                    <ProductImage image={{ src: '', alt: name }} />
                  </li>
                ))
              : (signets as React.ReactNode)}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

/* ---- ContentModules / CMS / MediaText ---- */
