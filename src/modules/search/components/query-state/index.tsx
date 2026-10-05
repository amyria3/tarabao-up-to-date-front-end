import type * as React from 'react'

import { cn } from '@/lib/utils'

export type QueryStateKind = 'idle' | 'empty' | 'results'

export interface QueryStateProps {
  state: QueryStateKind
  /** state="results": Trefferliste (Figma Sections / CardRow) */
  children?: React.ReactNode
  idleText?: string
  emptyText?: string
  /** Ansage bei Treffern, z. B. „3 Treffer“ (nur für Screenreader) */
  resultsText?: string
  className?: string
}

/**
 * Figma: Components / Search / QueryState (2216:2060) · Search-Request or Filter?, Results?.
 * Ohne Anfrage „Noch keine Suchanfrage :)“, ohne Treffer „Leider nichts gefunden“ —
 * UserMessage/LG, mittig, pb-xxxl. Mit Treffern folgt die Kartenreihe.
 * Die Meldung steht in einer Live-Region, damit Screenreader den Wechsel ansagen.
 */
export function QueryState({
  state,
  children,
  idleText = 'Noch keine Suchanfrage :)',
  emptyText = 'Leider nichts gefunden',
  resultsText,
  className,
}: QueryStateProps) {
  return (
    <div data-slot="query-state" data-state={state} className={cn('flex w-full flex-col', className)}>
      <p
        role="status"
        className={cn(
          'w-full pb-xxxl text-center type-user-message-lg text-content-text',
          state === 'results' && 'sr-only',
        )}
      >
        {state === 'idle' ? idleText : state === 'empty' ? emptyText : resultsText}
      </p>
      {state === 'results' ? children : null}
    </div>
  )
}
