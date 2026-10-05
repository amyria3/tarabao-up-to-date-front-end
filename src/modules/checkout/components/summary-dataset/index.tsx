'use client'

import type * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface SummaryDatasetProps {
  /** z. B. „Versand an:“, „Rechnung an:“, „E-Mail:“, „Versandart:“, „Zahlen mit:“ */
  label: string
  /** Zeilen; jede Zeile ist eine Liste von Teilen (Figma: Texte in Zeilen mit gap-sm) */
  lines: React.ReactNode[][]
  onEdit?: () => void
  editLabel?: string
  className?: string
}

/**
 * Figma: Components / Checkout / SummaryDataset (3773:11559) · E-Mail?, Lieferadresse?,
 * Rechnungsadresse?, Versandmethode?, Zahlungsmethode?. Spalte gap-md-sm: Titel
 * DataBlocks/SummaryItemTitle, Inhalt DataBlocks/SummaryItemContent (Zeilen, gap-sm),
 * rechts unten Buttons / XXS / Inline „Korrigieren“. Einzeilige Angaben stehen in einer Zeile.
 */
export function SummaryDataset({ label, lines, onEdit, editLabel = 'Korrigieren', className }: SummaryDatasetProps) {
  const single = lines.length === 1
  const edit = (
    <Button intent="inline" size="xxs" onClick={onEdit} aria-label={`${label.replace(/:$/, '')} korrigieren`}>
      {editLabel}
    </Button>
  )
  return (
    <div
      data-slot="summary-dataset"
      className={cn(
        'flex w-full text-content-text',
        single ? 'flex-wrap items-end gap-sm' : 'flex-col gap-md-sm',
        className,
      )}
    >
      <p className="type-data-blocks-summary-item-title">{label}</p>
      <div className={cn('flex flex-col type-data-blocks-summary-item-content', single && 'flex-1')}>
        {lines.map((parts, i) => (
          <p key={i} className="flex flex-wrap gap-x-sm">
            {parts.map((part, j) => (
              <span key={j}>{part}</span>
            ))}
          </p>
        ))}
      </div>
      <div className={cn('flex justify-end', !single && 'w-full')}>{edit}</div>
    </div>
  )
}
