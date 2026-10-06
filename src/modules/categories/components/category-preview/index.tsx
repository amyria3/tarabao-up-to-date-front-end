import Link from 'next/link'
import type * as React from 'react'

import { HeadlineH2 } from '@/components/ui/typography'
import { CardsOrder } from '@/components/ui/cards-order'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CategoryPreviewProps {
  title: React.ReactNode
  /** Ziel der Kategorie- oder Unterkategorieseite („Alle anzeigen“) */
  href: string
  /** Figma More products?: True, wenn die Kategorie mehr Produkte hat, als die Vorschau zeigt. */
  moreProducts?: boolean
  /** Karten als <li>-Elemente (Slot Cards, Templates / Cards Order · CardsTiles) */
  children: React.ReactNode
  /** Zeigt State=Hover statisch (Bibliothek, Storybook). */
  forceHover?: boolean
  allLabel?: string
  /** Label des unteren Buttons in base (Figma „Alle Produkte in … anzeigen“) */
  allProductsLabel?: string
  className?: string
}

/**
 * Figma: Sections / CategoryPreview (9779:32594) · State=Default|Hover, More products?. Templates / Section:
 * Zeile (flex-wrap, gap-md-sm) mit H2 (Hug content?=True) und direkt hinter dem Textende Buttons / XXS /
 * Inline „Alle anzeigen“ (Hover?=True, Modus purple-tint-surface-snow → von vornherein lila unterlegt).
 * Reicht die Breite nicht, rutscht der Button unter die Überschrift. Darunter der Slot Cards. In Default hält der
 * Button unsichtbar seinen Platz (opacity 0), beim Hover über die ganze Vorschau wird er sichtbar.
 * Der Button erscheint nur, wenn die Kategorie mehr Produkte hat, als die Vorschau zeigt.
 * In base gibt es keinen Hover: Dort steht unter den Karten mittig Buttons / XXS / Inline „Alle Produkte
 * in … anzeigen“ (Hover?=False, Figma visible-base-only → md:hidden).
 */
export function CategoryPreview({
  title,
  href,
  moreProducts = true,
  children,
  forceHover,
  allLabel = 'Alle anzeigen',
  allProductsLabel,
  className,
}: CategoryPreviewProps) {
  const bottomLabel = allProductsLabel ?? (typeof title === 'string' ? `Alle Produkte in ${title} anzeigen` : allLabel)
  return (
    <Section
      className={cn('group/preview', className)}
      aria-label={typeof title === 'string' ? title : undefined}
      data-hovered={forceHover ? '' : undefined}
    >
      <div className="flex w-full flex-wrap items-center gap-md-sm">
        <HeadlineH2 width="hug" className="min-w-zero">
          {title}
        </HeadlineH2>
        {moreProducts ? (
          <div
            data-theme="purple-tint-surface-snow"
            className={cn(
              'shrink-0 opacity-0 motion-hover',
              'group-hover/preview:opacity-100 group-focus-within/preview:opacity-100 group-data-hovered/preview:opacity-100',
            )}
          >
            <Button intent="inline" size="xxs" forceHover asChild>
              <Link href={href}>{allLabel}</Link>
            </Button>
          </div>
        ) : null}
      </div>
      <CardsOrder variant="tiles" className="gap-md">
        {children}
      </CardsOrder>
      {moreProducts ? (
        <div data-theme="purple-tint-surface-snow" className="flex w-full justify-center md:hidden">
          <Button intent="inline" size="xxs" asChild>
            <Link href={href}>{bottomLabel}</Link>
          </Button>
        </div>
      ) : null}
    </Section>
  )
}
