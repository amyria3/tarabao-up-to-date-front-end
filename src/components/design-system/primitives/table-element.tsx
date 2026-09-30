import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TableElementProps {
  /** Figma Property 1=Table-row Überschrift */
  head: React.ReactNode[]
  /** Figma Property 1=Table-row Content, je Zeile */
  rows: React.ReactNode[][]
  caption?: React.ReactNode
  /** Linien zwischen Zeilen und Spalten in content-text (ContentModules / NutritionTable) */
  lines?: boolean
  className?: string
}

const CELL = 'px-[0.625rem] py-sm text-left align-middle hyphens-auto'

/**
 * Figma: Primitives / TableElement (2040:1345).
 * Zeilen ohne Linien, Zellen p 2 twuc / 2.5 twuc, Abstand 1 px zwischen Zellen.
 * Kopf Table/<th>, Inhalt Table/Cell, Farbe content-text.
 */
export function TableElement({ head, rows, caption, lines = false, className }: TableElementProps) {
  // Schmale Viewports: Die Tabelle scrollt waagerecht, statt die Seite zu verbreitern.
  return (
    <div data-slot="table-element" className="w-full overflow-x-auto">
      <table
        data-lines={lines || undefined}
        className={cn(
          'w-full text-content-text',
          lines
            ? 'border-collapse [&_tbody>tr>*]:border-t [&_tr>*+*]:border-l [&_tr>*]:border-content-text'
            : 'border-separate border-spacing-x-px border-spacing-y-zero',
          className,
        )}
      >
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            {head.map((cell, i) => (
              <th key={i} scope="col" className={cn(CELL, 'type-table-th')}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className={cn(CELL, 'type-table-cell font-normal')}>
                    {cell}
                  </th>
                ) : (
                  <td key={i} className={cn(CELL, 'type-table-cell')}>
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
