'use client'

import * as React from 'react'

import { InlineFeedbackElement } from '@/components/ui/inline-feedback-element'
import { HeadlineH2, InlineQuestion } from '@/components/ui/typography'
import { ProductImage } from '@modules/products/components/product-image'
import { Button } from '@/components/ui/button'
import type { ImageModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type ReturnableItem = { id: string; title: string; image?: ImageModel }

/**
 * Figma: Components / Cancellation / SelectProducts (6810:20264) mit Primitives / ProductImg
 * (6810:20272 · State=Default op 30 | Hover op 60 | Selected). Titel H2 Alternative, Hinweis
 * DefaultText MD, Artikelbilder zum Auswählen (Umschalter), Primitives / Inline Question & Button
 * „… alle Artikel zurückgeben? · Hier clicken“, Warnung (UserMessage/X-LG in error-content) und
 * Buttons / MD / PrimaryButton „Zahlungspflichtig widerrufen“. Der Button bleibt aktiv (Prinzip:
 * kein Inactive bei fehlender Auswahl): Ein Klick ohne Artikel zeigt über dem Button die Ebene
 * `error-no-item-selected` (Primitives / InlineFeedbackElement, Warnung, All Input Messages/Kein Artikel
 * gewählt); ein Klick auf ein Bild blendet sie aus.
 */
export function SelectProducts({
  items,
  warning = 'Deine Bestellung wurde bereits verschickt. […] es fallen Kosten von […] an.',
  noSelectionMessage = 'Bitte wähle mindestens einen Artikel aus',
  submitLabel = 'Zahlungspflichtig widerrufen',
  onSubmit,
  className,
}: {
  items: ReturnableItem[]
  warning?: string
  /** All Input Messages/Kein Artikel gewählt */
  noSelectionMessage?: string
  submitLabel?: string
  onSubmit?: (itemIds: string[]) => void
  className?: string
}) {
  const [selected, setSelected] = React.useState<string[]>([])
  const [noSelection, setNoSelection] = React.useState(false)
  const errorId = React.useId()
  const toggle = (id: string) => {
    setNoSelection(false)
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }
  const submit = () => {
    if (selected.length === 0) {
      setNoSelection(true)
      return
    }
    onSubmit?.(selected)
  }
  return (
    <div data-slot="select-products" className={cn('flex w-full max-w-block-max flex-col gap-md-l', className)}>
      <div className="flex w-full flex-col gap-xxs">
        <HeadlineH2 variant="alternative">Du möchtest ein oder mehrere Artikel zurückgeben?</HeadlineH2>
        <p className="type-default-text-md text-content-text">Bitte wähle die Artikel, die Du zurückgeben möchtest.</p>
      </div>
      <ul className="grid w-full grid-cols-2 gap-sm md:grid-cols-4">
        {items.map((item) => {
          const on = selected.includes(item.id)
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={on}
                aria-label={item.title}
                onClick={() => toggle(item.id)}
                className={cn(
                  'block h-52 w-full cursor-pointer opacity-30 transition-opacity hover:opacity-60',
                  'aria-pressed:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
                )}
              >
                <ProductImage image={item.image} sizes="12rem" />
              </button>
            </li>
          )
        })}
      </ul>
      <InlineQuestion
        question="Du möchtest aus irgendeinem Grund den Produkt komplett widerrufen oder alle Artikel zurückgeben?"
        action="Hier clicken"
        onAction={() => {
          setNoSelection(false)
          setSelected(items.map((i) => i.id))
        }}
      />
      <p className="type-user-message-x-lg text-error-content">{warning}</p>
      {noSelection ? (
        <InlineFeedbackElement id={errorId} tone="warning">
          {noSelectionMessage}
        </InlineFeedbackElement>
      ) : null}
      <Button
        intent="primary"
        size="md"
        className="w-full"
        aria-describedby={noSelection ? errorId : undefined}
        onClick={submit}
      >
        {submitLabel}
      </Button>
    </div>
  )
}
