'use client'

import * as React from 'react'

/** So lange zählt nach dem Öffnen kein Scrollversuch (Nachlauf eines Trackpads). */
export const SEARCH_SCROLL_GRACE_MS = 300
/** Mindestweg beim Wischen, damit ein Tipp auf einen Filter-Chip nicht zählt. */
const TOUCH_THRESHOLD_PX = 10

/**
 * Repo 2-tarabao/2.7-layout.md · „So schließt sich die Suche beim Scrollen“.
 * Als Scrollversuch zählen wheel, touchmove und scroll, jeweils nur senkrecht. Die Listener sind
 * passiv und rufen kein preventDefault auf, die Seite scrollt also weiter.
 * Gibt die Aufräumfunktion zurück.
 */
export function closeEmptySearchOnScroll({
  isSearchEmpty,
  closeSearch,
}: {
  isSearchEmpty: () => boolean
  closeSearch: () => void
}) {
  const openedAt = performance.now()
  let start: { x: number; y: number } | null = null

  const tryClose = () => {
    if (performance.now() - openedAt < SEARCH_SCROLL_GRACE_MS) return
    if (isSearchEmpty()) closeSearch()
  }
  const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) tryClose()
  }
  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    start = touch ? { x: touch.clientX, y: touch.clientY } : null
  }
  const onTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0]
    if (!start || !touch) return
    const dx = Math.abs(touch.clientX - start.x)
    const dy = Math.abs(touch.clientY - start.y)
    if (dy > TOUCH_THRESHOLD_PX && dy > dx) tryClose()
  }

  const passive = { passive: true } as const
  window.addEventListener('wheel', onWheel, passive)
  window.addEventListener('touchstart', onTouchStart, passive)
  window.addEventListener('touchmove', onTouchMove, passive)
  window.addEventListener('scroll', tryClose, passive)

  return () => {
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('scroll', tryClose)
  }
}

/**
 * Der Header gibt hier den Handler von „Suche schließen“ an den Suchbereich weiter.
 * Ohne Header (Bibliothek, Storybook) fehlt er, dann schließt auch kein Scrollversuch.
 */
export const SearchPanelContext = React.createContext<{ closeSearch: () => void } | null>(null)

/**
 * Schließt die offene Suche beim Scrollversuch, solange sie leer ist.
 * Wird die Suche leer (Suchbegriff gelöscht, letzter Filter abgewählt), beginnen die 300 ms neu.
 * So schließt ein Scroll-Ereignis, das nur aus der kürzeren Trefferliste entsteht, die Suche nicht.
 */
export function useCloseEmptySearchOnScroll(isEmpty: boolean) {
  const panel = React.useContext(SearchPanelContext)
  React.useEffect(() => {
    if (!panel || !isEmpty) return
    return closeEmptySearchOnScroll({ isSearchEmpty: () => true, closeSearch: panel.closeSearch })
  }, [panel, isEmpty])
}
