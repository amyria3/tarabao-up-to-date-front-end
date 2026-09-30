'use client'

import * as React from 'react'

import { IconButton } from '@/components/design-system/buttons/icon-button'
import { ProductCard } from '@/components/design-system/cards/product-card'
import { IconPerson } from '@/components/design-system/icons/figma-icons'
import { NutmixerItem } from '@/components/design-system/nutmixer/nutmixer-item'
import { DefaultParagraph, HeadlineH3 } from '@/components/design-system/primitives/typography'
import { NutmixerInfoTag, NutmixerTab } from '@/components/design-system/switches/category-navigation'
import { CardsOrder } from '@/components/design-system/templates/cards-order'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import { Button } from '@/components/ui/button'
import type { NutmixerCategoryModel, NutmixerProductModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type NutmixerMix = Record<string, number>

export interface NutmixerProps {
  categories: NutmixerCategoryModel[]
  products: NutmixerProductModel[]
  /** Füllmenge der Packung in Gramm (Figma: 750) */
  capacityGrams?: number
  defaultMix?: NutmixerMix
  onOrder?: (mix: NutmixerMix) => void
  className?: string
}

const percent = (value: number, total: number) => Math.round((value / total) * 100)

/**
 * Figma: Components / Nutmixer (8863:27584) · viewport-range=lg. Farbmodus cole-tint-surface-snow,
 * p-md-l gap-md. Ab md stehen die Produkte links und die Mischung rechts; die Seite scrollt,
 * es gibt keine inneren Scrollbereiche. Die Kategorie-Tabs kleben oben (sticky top-0) und springen
 * zur Kategorie. Die Mischung klebt unter dem Header (sticky top-[Header-Höhe], self-start).
 * Mischung: H2 „Meine Nussmischung“ (Textstil H1 Subtitle wie in Figma), IconButtons „Personalisieren“ und „löschen“, Anteile als
 * NutmixerTabs · Information neben der Tüte (Platzhalter) mit „x % voll!“, Hinweis zur Füllmenge,
 * Components / Nutmixer / Item je Zutat, Hinweis zum Preis und Buttons / SM / PrimaryButton
 * „Nussmix bestellen“ (aktiv, sobald die Packung voll ist).
 */
export function Nutmixer({
  categories,
  products,
  capacityGrams = 750,
  defaultMix = {},
  onOrder,
  className,
}: NutmixerProps) {
  const [mix, setMix] = React.useState<NutmixerMix>(defaultMix)
  const [active, setActive] = React.useState(categories[0]?.id)
  const baseId = React.useId()
  const byId = React.useMemo(() => new Map(products.map((p) => [p.id, p])), [products])
  const grams = (id: string) => (mix[id] ?? 0) * (byId.get(id)?.stepGrams ?? 0)
  const total = Object.keys(mix).reduce((sum, id) => sum + grams(id), 0)
  const full = total >= capacityGrams
  const set = (id: string, quantity: number) =>
    setMix((m) => {
      const next = { ...m }
      if (quantity <= 0) delete next[id]
      else next[id] = quantity
      return next
    })
  const add = (id: string) => {
    const p = byId.get(id)
    if (!p || total + p.stepGrams > capacityGrams) return
    set(id, (mix[id] ?? 0) + 1)
  }
  const shares = categories.map((c) => ({
    ...c,
    share: percent(
      Object.keys(mix)
        .filter((id) => byId.get(id)?.categoryId === c.id)
        .reduce((sum, id) => sum + grams(id), 0),
      capacityGrams,
    ),
  }))
  const empty = Math.max(0, 100 - percent(total, capacityGrams))

  return (
    <div
      data-slot="nutmixer"
      data-theme="cole-tint-surface-snow"
      className={cn(
        'flex w-full flex-col gap-md bg-surface p-md-l text-content-text md:flex-row md:items-start',
        className,
      )}
    >
      <div className="flex min-w-zero flex-1 flex-col">
        <nav
          aria-label="Kategorien"
          className="sticky top-0 z-10 flex w-full flex-wrap items-center justify-center gap-md-sm bg-surface pb-md"
        >
          {categories.map((c) => (
            <NutmixerTab
              key={c.id}
              selected={active === c.id}
              aria-current={active === c.id ? 'true' : undefined}
              onClick={() => {
                setActive(c.id)
                document.getElementById(`${baseId}-${c.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              {c.label}
            </NutmixerTab>
          ))}
        </nav>
        <div className="flex w-full flex-col gap-md-l">
          {categories.map((c) => {
            const items = products.filter((p) => p.categoryId === c.id)
            return (
              <section
                key={c.id}
                id={`${baseId}-${c.id}`}
                aria-label={c.label}
                className="flex w-full scroll-mt-16 flex-col items-center gap-md"
              >
                <HeadlineH3 align="center">
                  {c.label} ({items.length})
                </HeadlineH3>
                <CardsOrder variant="tiles" className="gap-md">
                  {items.map((p) => (
                    <li key={p.id}>
                      <ProductCard
                        product={p}
                        size="compact"
                        context="nutmixer"
                        addLabel="Zur Mischung"
                        onAddToCart={() => add(p.id)}
                      />
                    </li>
                  ))}
                </CardsOrder>
              </section>
            )
          })}
        </div>
      </div>

      <section
        aria-label="Meine Nussmischung"
        className="flex w-full flex-1 flex-col gap-md-l md:sticky md:top-(--header-height,0) md:self-start md:pt-xxxl md:pr-xl"
      >
        <div className="flex w-full max-w-block-max flex-col items-center gap-sm">
          <h2 className="w-full text-center type-h1-subtitle text-content-text">Meine Nussmischung</h2>
          <div className="flex">
            <IconButton label="Personalisieren" icon={<IconPerson aria-hidden className="size-3.5" />} />
            <IconButton label="löschen" onClick={() => setMix({})} disabled={total === 0} />
          </div>
        </div>
        <div className="flex w-full max-w-block-max flex-col gap-md-sm">
          <div className="flex h-32.5 w-full items-start justify-center gap-md">
            <ul className="flex h-full flex-col items-end justify-end gap-xxs" aria-label="Anteile">
              <li>
                <NutmixerInfoTag>Leer ? {empty}%</NutmixerInfoTag>
              </li>
              {shares.map((c) => (
                <li key={c.id}>
                  <NutmixerInfoTag>
                    {c.label} {c.share}%
                  </NutmixerInfoTag>
                </li>
              ))}
            </ul>
            <div
              className="relative h-32.5 w-25"
              role="img"
              aria-label={`Packung ${percent(total, capacityGrams)} % voll`}
            >
              <ProductImage />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="-rotate-90 bg-surface px-xxs type-label-default whitespace-nowrap text-nutmixer-tag-label-stroke-default">
                  {percent(total, capacityGrams)} % voll!
                </span>
              </span>
            </div>
          </div>
          <DefaultParagraph size="md">
            Jede Packung enthält {capacityGrams} Gramm. Füge so viele Zutaten hinzu, bis Deine Packung voll ist!
          </DefaultParagraph>
        </div>
        <div className="flex w-full max-w-block-max flex-col gap-md-sm border-t-[0.046875rem] border-(color:--cole-tint-60) pt-md-sm">
          {Object.keys(mix).length === 0 ? (
            <DefaultParagraph size="md" className="text-content-weak">
              Noch keine Zutaten ausgewählt.
            </DefaultParagraph>
          ) : (
            <ul className="flex w-full flex-col gap-md-sm">
              {Object.keys(mix).map((id) => {
                const p = byId.get(id)!
                return (
                  <li key={id}>
                    <NutmixerItem
                      title={p.title}
                      stepPriceLabel={p.stepPriceLabel}
                      stepGrams={p.stepGrams}
                      quantity={mix[id]!}
                      max={mix[id]! + Math.floor((capacityGrams - total) / p.stepGrams)}
                      onQuantityChange={(q) => set(id, q)}
                    />
                  </li>
                )
              })}
            </ul>
          )}
          <div className="flex w-full flex-col gap-sm pt-md-sm">
            <DefaultParagraph size="md">Der Preis wird erst angezeigt, wenn die Tüte voll ist. :)</DefaultParagraph>
            <Button intent="primary" size="sm" className="w-full" disabled={!full} onClick={() => onOrder?.(mix)}>
              Nussmix bestellen
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
