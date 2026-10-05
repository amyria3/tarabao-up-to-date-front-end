'use client'

import * as React from 'react'

import { Breadcrumb, type BreadcrumbProps } from '@modules/common/components/breadcrumbs'
import { cn } from '@/lib/utils'

/** Header, unter dem die Breadcrumb klebt (Navigation / Header setzt data-slot="header"). */
const HEADER_SELECTOR = '[data-slot="header"]'
/** Kleinere Bewegungen zählen nicht als Richtungswechsel (Touchpad, Gummiband-Effekt). */
const SCROLL_THRESHOLD = 4

/**
 * Misst die Höhe des Headers und legt sie als --header-height am <html> ab.
 * So klebt die Breadcrumb direkt unter dem Header, auch wenn PromoBar oder
 * Breitenbereich die Höhe ändern.
 */
export function useHeaderHeight(selector: string = HEADER_SELECTOR) {
  React.useEffect(() => {
    const header = document.querySelector<HTMLElement>(selector)
    if (!header || typeof ResizeObserver === 'undefined') return
    const root = document.documentElement
    const set = () => root.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`)
    set()
    const observer = new ResizeObserver(set)
    observer.observe(header)
    return () => {
      observer.disconnect()
      root.style.removeProperty('--header-height')
    }
  }, [selector])
}

/**
 * Browser ohne CSS-Scroll-State-Abfragen (Safari, Firefox): setzt
 * data-scroll-direction="down" | "up" am <html>. Chrome und Edge lesen die
 * Richtung per scroll-state(scrolled) selbst (Variante scroll-down in globals.css).
 */
export function useScrollDirectionFallback() {
  React.useEffect(() => {
    if (typeof CSS !== 'undefined' && CSS.supports?.('container-type', 'scroll-state')) return
    const root = document.documentElement
    let lastY = Math.max(window.scrollY, 0)
    let frame = 0
    const update = () => {
      frame = 0
      const y = Math.max(window.scrollY, 0)
      if (Math.abs(y - lastY) < SCROLL_THRESHOLD) return
      root.dataset.scrollDirection = y > lastY ? 'down' : 'up'
      lastY = y
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      delete root.dataset.scrollDirection
    }
  }, [])
}

export type PageBreadcrumbProps = BreadcrumbProps

/**
 * Figma: Breadcrumb in Templates / Page (8947:37169), Annotation „Scroll-Verhalten (nur im Code)“.
 * Beim Laden sichtbar. Scrollt der Nutzer nach unten, gleitet sie unter den Sticky-Header.
 * Scrollt er nach oben, erscheint sie wieder direkt unter dem Header.
 * Bekommt ein Link den Fokus, bleibt sie sichtbar. Figma bildet das Verhalten nicht ab.
 *
 * Voraussetzung: Der Header ist sticky mit z-50 und deckender Fläche, die Breadcrumb
 * liegt als erstes Kind in <main>.
 */
export function PageBreadcrumb({ className, ...props }: PageBreadcrumbProps) {
  useHeaderHeight()
  useScrollDirectionFallback()

  return (
    <div
      data-slot="page-breadcrumb"
      className={cn(
        'sticky top-(--header-height) z-40 w-full bg-surface',
        'transition-[translate] duration-200 ease-out motion-reduce:transition-none',
        'scroll-down:-translate-y-full focus-within:translate-y-0',
        className,
      )}
    >
      <Breadcrumb {...props} />
    </div>
  )
}
