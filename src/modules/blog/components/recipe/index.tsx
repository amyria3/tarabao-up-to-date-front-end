'use client'

import * as React from 'react'

import { Counter } from '@/components/ui/counter'
import { DisclosureToggle } from '@/components/ui/disclosure-toggle'
import { IngredientRow, IngredientTable } from '@/components/ui/ingredient-row'
import { DefaultParagraph, HeadlineH3 } from '@/components/ui/typography'
import { InformationBubble } from '@/components/ui/information-bubble'
import { ProductImage } from '@modules/products/components/product-image'
import { Button } from '@/components/ui/button'
import type { ImageModel, IngredientModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

/* ---- Components / Recipe / RecipeHeader ---- */

export interface RecipeHeaderProps {
  /** Rezeptangaben als Badges, z. B. „Arbeitszeit 15 Min.“ */
  facts: string[]
  onPrint?: () => void
  onShare?: () => void
  printLabel?: string
  shareLabel?: string
  className?: string
}

/**
 * Figma: Components / Recipe / RecipeHeader (9323:45095). Wrap-Reihe, justify-between, gap-md:
 * links die Rezeptangaben als Information Bubble (Property 1=Badge, gap-sm, min-w-block-min),
 * rechts die Buttons / XXS / Inline „Drucken“ und „Weiterleiten“ (gap-md). Ist die Breite zu klein,
 * bricht der Button-Teil in die nächste Zeile um.
 */
export function RecipeHeader({
  facts,
  onPrint,
  onShare,
  printLabel = 'Drucken',
  shareLabel = 'Weiterleiten',
  className,
}: RecipeHeaderProps) {
  return (
    <div
      data-slot="recipe-header"
      className={cn('flex w-full flex-wrap items-center justify-between gap-md', className)}
    >
      <ul className="flex min-w-zero flex-1 flex-wrap items-center gap-sm md:min-w-block-min">
        {facts.map((fact) => (
          <InformationBubble key={fact} as="li" variant="badge">
            {fact}
          </InformationBubble>
        ))}
      </ul>
      <div className="flex items-center gap-md">
        <Button intent="inline" size="xxs" onClick={onPrint ?? (() => window.print())}>
          {printLabel}
        </Button>
        <Button intent="inline" size="xxs" onClick={onShare}>
          {shareLabel}
        </Button>
      </div>
    </div>
  )
}

/* ---- Components / Recipe / PortionCalculator ---- */

export interface PortionCalculatorProps {
  facts: string[]
  /** Mengen für `baseServings` Portionen (Figma zeigt 1 Portion). */
  ingredients: IngredientModel[]
  baseServings?: number
  defaultServings?: number
  maxServings?: number
  onPrint?: () => void
  onShare?: () => void
  title?: string
  servingsLabel?: string
  className?: string
}

const AMOUNT = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 })

/** Rechnet eine Menge auf die gewählten Portionen um (Basis: `baseServings`). */
export function scaleAmount(amount: number, servings: number, baseServings = 1): string {
  return AMOUNT.format((amount * servings) / baseServings)
}

/**
 * Figma: Components / Recipe / PortionCalculator (9323:45127). Spalte gap-lg, min/max block:
 * RecipeHeader, Zeile mit H3 „Zutaten“ und Buttons / Counter + „Portionen“ (Label/default),
 * darunter der Slot Zutaten mit Zeilen aus Primitives / IngredientRow (Zutat oder Gruppe).
 * Ändert die Nutzerin die Portionen, rechnet der Code die Mengen um.
 */
export function PortionCalculator({
  facts,
  ingredients,
  baseServings = 1,
  defaultServings,
  maxServings = 12,
  onPrint,
  onShare,
  title = 'Zutaten',
  servingsLabel = 'Portionen',
  className,
}: PortionCalculatorProps) {
  const [servings, setServings] = React.useState(defaultServings ?? baseServings)
  return (
    <div
      data-slot="portion-calculator"
      className={cn('flex w-full min-w-block-min max-w-block-max flex-col gap-lg', className)}
    >
      <RecipeHeader facts={facts} onPrint={onPrint} onShare={onShare} />
      <div className="flex w-full flex-col gap-md">
        <div className="flex w-full items-center gap-md">
          <HeadlineH3 className="min-w-zero flex-1">{title}</HeadlineH3>
          <div className="flex shrink-0 items-center gap-sm">
            <Counter
              value={servings}
              min={1}
              max={maxServings}
              onValueChange={setServings}
              aria-label={servingsLabel}
            />
            <span className="type-label-default text-content-text">{servingsLabel}</span>
          </div>
        </div>
        <IngredientTable aria-label={`${title} für ${servings} ${servingsLabel}`}>
          {ingredients.map((row) =>
            row.kind === 'group' ? (
              <IngredientRow key={row.id} variant="group" title={row.title} />
            ) : (
              <IngredientRow
                key={row.id}
                amount={
                  row.amount === null
                    ? (row.unit ?? '')
                    : `${scaleAmount(row.amount, servings, baseServings)}${row.unit ? ` ${row.unit}` : ''}`
                }
                name={row.name}
              />
            ),
          )}
        </IngredientTable>
      </div>
    </div>
  )
}

/* ---- ContentModules / CMS / RecipeStep ---- */

export interface RecipeStepProps {
  /** Badge-Label, z. B. „Schritt 1“ */
  label: string
  /** Dauer o. Ä. in der Kopfzeile, z. B. „ca. 10 Min“ */
  meta?: string
  children: React.ReactNode
  /** Figma Has Img?=True */
  image?: ImageModel
  /** Figma Open?; unkontrolliert mit defaultOpen */
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

/**
 * Figma: ContentModules / CMS / RecipeStep (9325:70427) · Has Img?, Open?. Spalte gap-md, max-w-block-max:
 * Kopfzeile (gap-sm) mit Information Bubble Badge, DefaultText MD (Dauer) und Buttons / DisclosureToggle;
 * darunter die Wrap-Reihe Body (gap-md-l): Primitives / DefaultParagraph (min-w-block-min) und bei
 * Has Img? die Bildfläche h-60 (Platzhalter), die unter 2 × 320 px unter den Text rutscht.
 * Open?=False klappt bis auf die Kopfzeile zu; die ganze Kopfzeile schaltet um.
 */
export function RecipeStep({
  label,
  meta,
  children,
  image,
  defaultOpen = true,
  open: controlled,
  onOpenChange,
  className,
}: RecipeStepProps) {
  const [inner, setInner] = React.useState(defaultOpen)
  const open = controlled ?? inner
  const bodyId = React.useId()
  const toggle = () => {
    if (controlled === undefined) setInner(!open)
    onOpenChange?.(!open)
  }
  return (
    <section
      data-slot="recipe-step"
      data-open={open || undefined}
      className={cn('flex w-full max-w-block-max flex-col gap-md', className)}
    >
      <div className="flex w-full cursor-pointer items-center gap-sm" onClick={toggle}>
        <InformationBubble variant="badge" as="span">
          {label}
        </InformationBubble>
        <p className="min-w-zero flex-1 type-default-text-md text-content-text">{meta}</p>
        <DisclosureToggle
          open={open}
          aria-controls={bodyId}
          onClick={(e) => {
            e.stopPropagation()
            toggle()
          }}
        />
      </div>
      {open ? (
        <div id={bodyId} className="flex w-full flex-wrap items-start gap-md-l">
          <DefaultParagraph size="md" className="min-w-block-min flex-1">
            {children}
          </DefaultParagraph>
          {image ? (
            <div className="h-60 min-w-block-min flex-1">
              <ProductImage image={image} sizes="(min-width: 64rem) 24rem, 100vw" />
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
