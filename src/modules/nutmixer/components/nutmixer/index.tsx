'use client'

import * as React from 'react'

import { IconButton } from '@/components/ui/icon-button'
import { ProductCard } from '@modules/products/components/product-card'
import { IconPerson } from '@/components/icons/figma-icons'
import { NutmixerItem } from '@modules/nutmixer/components/nutmixer-item'
import { DefaultParagraph, HeadlineH3 } from '@/components/ui/typography'
import { NutmixerInfoTag, NutmixerTab } from '@/components/ui/category-navigation'
import { CardsOrder } from '@/components/ui/cards-order'
import { ProductImage } from '@modules/products/components/product-image'
import { Button } from '@/components/ui/button'
import { useHeaderHeight } from '@modules/common/components/breadcrumbs/page-breadcrumb'
import { MixBar } from '@modules/nutmixer/components/mix-bar'
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
 * Figma: Components / Nutmixer (8863:27584) · viewport-range=lg|md|base. Farbmodus cole-tint-surface-snow,
 * p-md-l gap-md. Auf dem Handy (base) stehen die Produkte in einer Spalte, am Ende klebt
 * Components / Nutmixer / MixBar unten am Bildschirm; „Ansehen“ zeigt die Mischung als Bottom Sheet.
 * Ab md stehen die Produkte links und die Mischung rechts; die Seite scrollt,
 * es gibt keine inneren Scrollbereiche. Die Kategorie-Tabs kleben unter dem Header
 * (sticky top-[Header-Höhe]). Ein Klick auf einen Tab scrollt zur Sektion (Anker #nuesse, #beeren …),
 * die Sektion hält Abstand für Header und Tabs (scroll-margin). Beim Scrollen wird der Tab der Sektion
 * aktiv, die gerade unter den Tabs steht. Die Mischung klebt unter dem Header (sticky top-[Header-Höhe], self-start).
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
  useHeaderHeight()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const tabsRef = React.useRef<HTMLElement>(null)
  // Während des Scrollens nach einem Tab-Klick folgt der aktive Tab nicht den Zwischenständen.
  const jumping = React.useRef(false)

  // Höhe der Tab-Leiste als --nutmixer-tabs-height: Die Sektionen halten so Abstand für Header und Tabs.
  React.useEffect(() => {
    const tabs = tabsRef.current
    const root = rootRef.current
    if (!tabs || !root || typeof ResizeObserver === 'undefined') return
    const set = () => root.style.setProperty('--nutmixer-tabs-height', `${tabs.getBoundingClientRect().height}px`)
    set()
    const observer = new ResizeObserver(set)
    observer.observe(tabs)
    return () => observer.disconnect()
  }, [])

  // Der aktive Tab folgt der Sektion, die gerade unter den Tabs steht; am Seitenende die letzte.
  React.useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const tabs = tabsRef.current
      if (jumping.current || !tabs) return
      const line = tabs.getBoundingClientRect().bottom + 1
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = categories[0]?.id
      for (const c of categories) {
        const el = document.getElementById(c.id)
        if (el && (el.getBoundingClientRect().top <= line || atEnd)) current = c.id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [categories])

  const jumpTo = (id: string) => {
    setActive(id)
    const el = document.getElementById(id)
    if (!el) return
    jumping.current = true
    const done = () => {
      jumping.current = false
      window.removeEventListener('scrollend', done)
    }
    window.addEventListener('scrollend', done)
    window.setTimeout(done, 1000)
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }
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
  // Rechnet mit dem aktuellen Stand, damit schnelle Klicks hintereinander alle zählen.
  const add = (id: string) => {
    const p = byId.get(id)
    if (!p) return
    setMix((m) => {
      const used = Object.keys(m).reduce((sum, k) => sum + (m[k] ?? 0) * (byId.get(k)?.stepGrams ?? 0), 0)
      if (used + p.stepGrams > capacityGrams) return m
      return { ...m, [id]: (m[id] ?? 0) + 1 }
    })
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

  // Mischung: ab md rechts neben den Produkten, auf dem Handy im Bottom Sheet der MixBar.
  const details = (
    <>
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
    </>
  )

  return (
    <div
      ref={rootRef}
      data-slot="nutmixer"
      data-theme="cole-tint-surface-snow"
      className={cn(
        'flex w-full flex-col bg-surface text-content-text md:flex-row md:items-start md:gap-md md:p-md-l',
        className,
      )}
    >
      <div className="flex min-w-zero flex-1 flex-col p-md-l md:p-zero">
        <nav
          ref={tabsRef}
          aria-label="Kategorien"
          className="sticky top-(--header-height,0) z-10 flex w-full flex-wrap items-center justify-center gap-md-sm bg-surface pb-md"
        >
          {categories.map((c) => (
            <NutmixerTab
              key={c.id}
              selected={active === c.id}
              aria-current={active === c.id ? 'true' : undefined}
              onClick={() => jumpTo(c.id)}
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
                id={c.id}
                aria-label={c.label}
                className="flex w-full scroll-mt-[calc(var(--header-height,0px)+var(--nutmixer-tabs-height,0px))] flex-col items-center gap-md"
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
        className="hidden w-full flex-1 flex-col gap-md-l md:sticky md:top-(--header-height,0) md:flex md:self-start md:pt-xxxl md:pr-xl"
      >
        {details}
      </section>

      {/* Handy (Figma viewport-range=base): Leiste am Ende des Nussmixers, klebt unten; „Ansehen“ öffnet das Sheet. */}
      <MixBar fillPercent={percent(total, capacityGrams)} className="sticky bottom-zero z-20 md:hidden">
        <div className="flex w-full flex-col gap-md-l">{details}</div>
      </MixBar>
    </div>
  )
}
