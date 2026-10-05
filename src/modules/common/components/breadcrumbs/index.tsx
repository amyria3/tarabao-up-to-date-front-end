'use client'

import Link from 'next/link'
import * as React from 'react'

import { IconChevronRight14, IconDots } from '@/components/icons/figma-icons'
import { cn } from '@/lib/utils'

export type BreadcrumbItem = { label: string; href?: string }

export interface BreadcrumbProps {
  /**
   * Pfad wie in der Storefront (`modules/common/components/breadcrumbs`): Der erste Eintrag ist die
   * Startseite, der letzte die aktuelle Seite ohne Link.
   */
  items: BreadcrumbItem[]
  className?: string
}

/** Gemessene Breiten in px, aus denen hiddenStationCount die Zahl der verdeckten Stationen bildet. */
export type BreadcrumbWidths = {
  /** Breite der Zeile */
  available: number
  /** Abstand zwischen den Einträgen (gap-md-sm) */
  gap: number
  /** „Du bist hier:“ */
  lead: number
  /** Dots */
  dots: number
  /** erste Station (Startseite) ohne Pfeil */
  first: number
  /** jede weitere Station mit Pfeil, zuletzt die aktuelle Seite */
  steps: number[]
}

/**
 * Zählt, wie viele Stationen am Anfang des Pfads die Dots ersetzen, damit die Zeile passt.
 * 0 heißt: Der ganze Pfad passt, die Dots bleiben weg. Passt auch die aktuelle Seite allein nicht,
 * bleibt nur sie stehen und kürzt mit „…“.
 */
export function hiddenStationCount({ available, gap, lead, dots, first, steps }: BreadcrumbWidths): number {
  const TOLERANCE = 0.5
  const fits = (width: number) => width <= available + TOLERANCE
  const stepsFrom = (index: number) => steps.slice(index).reduce((total, width) => total + gap + width, 0)
  if (fits(lead + gap + first + stepsFrom(0))) return 0
  for (let hidden = 1; hidden < steps.length; hidden++) {
    if (fits(lead + gap + dots + stepsFrom(hidden - 1))) return hidden
  }
  return steps.length
}

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

function Station({ item, current }: { item: BreadcrumbItem; current: boolean }) {
  if (current) {
    return (
      <span aria-current="page" className="min-w-0 truncate type-navigation-endpoint text-content-weak">
        {item.label}
      </span>
    )
  }
  return item.href ? (
    <Link href={item.href} className="type-navigation-route text-content-text">
      {item.label}
    </Link>
  ) : (
    <span className="type-navigation-route text-content-text">{item.label}</span>
  )
}

/**
 * Figma: Primitives / Breadcrumb (3155:5202).
 * Zeile h20 px-md-l, rechtsbündig, max-w-content: „Du bist hier:“, danach der Pfad als
 * Navigation/Route mit Pfeil (arrow right 14), zuletzt die aktuelle Seite als Navigation/Endpoint.
 *
 * Abweichung von Figma (Daria, 05.10.): Die Dots erscheinen nur, wenn die Zeile nicht für alle
 * Stationen reicht. Dann ersetzen sie die vorderen Stationen, und die Startseite verschwindet zuerst.
 * Die Dots verlinken die letzte verdeckte Station und tragen ihren Namen im aria-label.
 * Eine unsichtbare Messzeile liefert die Breiten aller Stationen. So passt sich der Pfad beim
 * Ändern der Fensterbreite und nach dem Laden der Schriften an.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const listRef = React.useRef<HTMLOListElement>(null)
  const measureRef = React.useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = React.useState(0)
  const last = items.length - 1
  const trail = items.map((item) => item.label).join('\u0000')

  useIsomorphicLayoutEffect(() => {
    const list = listRef.current
    const measure = measureRef.current
    if (!list || !measure) return
    const update = () => {
      const [lead = 0, dots = 0, first = 0, ...steps] = Array.from(
        measure.children,
        (child) => child.getBoundingClientRect().width,
      )
      const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0
      setHidden(hiddenStationCount({ available: list.clientWidth, gap, lead, dots, first, steps }))
    }
    update()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(update)
    observer.observe(list)
    observer.observe(measure)
    return () => observer.disconnect()
  }, [trail])

  if (items.length === 0) return null
  const target = hidden > 0 ? items[hidden - 1] : undefined

  return (
    <nav aria-label="Brotkrumen" className={cn('relative flex w-full px-md-l', className)}>
      <ol
        ref={listRef}
        className="flex w-full max-w-content min-w-0 items-center justify-end gap-md-sm whitespace-nowrap"
      >
        <li className="shrink-0 type-navigation-endpoint text-content-weak">Du bist hier:</li>
        {target ? (
          <li className="flex h-5 w-4 shrink-0 items-center justify-center text-content-text">
            {target.href ? (
              <Link href={target.href} aria-label={target.label} className="flex items-center">
                <IconDots aria-hidden />
              </Link>
            ) : (
              <span role="img" aria-label={target.label} className="flex items-center">
                <IconDots aria-hidden />
              </span>
            )}
          </li>
        ) : null}
        {items.map((item, index) =>
          index < hidden ? null : (
            <li
              key={`${index}-${item.label}`}
              className={cn('flex h-5 items-center gap-sm', index === last ? 'min-w-0' : 'shrink-0')}
            >
              {index > 0 ? <IconChevronRight14 aria-hidden className="shrink-0 text-content-text" /> : null}
              <Station item={item} current={index === last} />
            </li>
          ),
        )}
      </ol>
      <div aria-hidden className="pointer-events-none invisible absolute top-0 left-0 size-0 overflow-hidden">
        <div ref={measureRef} className="flex w-max items-center whitespace-nowrap">
          <span className="type-navigation-endpoint">Du bist hier:</span>
          <span className="flex h-5 w-4 items-center justify-center">
            <IconDots />
          </span>
          {items.map((item, index) => (
            <span key={`${index}-${item.label}`} className="flex h-5 items-center gap-sm">
              {index > 0 ? <IconChevronRight14 /> : null}
              <span className={index === last ? 'type-navigation-endpoint' : 'type-navigation-route'}>
                {item.label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </nav>
  )
}
