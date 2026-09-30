import type * as React from 'react'

import { cn } from '@/lib/utils'

export type IngredientRowProps =
  | { variant?: 'ingredient'; amount: React.ReactNode; name: React.ReactNode; className?: string }
  | { variant: 'group'; title: React.ReactNode; className?: string }

const CELL = 'bg-surface px-2.5 py-2 align-middle type-table-cell text-content-text'

/**
 * Figma: Primitives / IngredientRow (9559:38929) · Variant=Zutat|Gruppe. Zeile der Zutaten-Tabelle
 * im Portionsrechner: Zelle Menge (128 px) und Zelle Zutat (Fill), Textstil Table/Cell. Die Linien
 * entstehen aus der Zeilenfläche (content-text) und 1 px Abstand zwischen den Zellen, wie bei
 * ContentModules / NutritionTable. Gruppe ist eine Zwischenüberschrift über die ganze Breite.
 */
export function IngredientRow(props: IngredientRowProps) {
  if (props.variant === 'group') {
    return (
      <tr data-slot="ingredient-row" data-variant="group" className={cn('bg-content-text', props.className)}>
        <th scope="colgroup" colSpan={2} className={cn(CELL, 'text-left font-semibold')}>
          {props.title}
        </th>
      </tr>
    )
  }
  return (
    <tr data-slot="ingredient-row" data-variant="ingredient" className={cn('bg-content-text', props.className)}>
      <td className={cn(CELL, 'w-32 whitespace-nowrap')}>{props.amount}</td>
      <td className={CELL}>{props.name}</td>
    </tr>
  )
}

/**
 * Tabelle für IngredientRow: Fläche content-text, 1 px Abstand zwischen Zellen und Zeilen (Linien).
 */
export function IngredientTable({ className, children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      data-slot="ingredient-table"
      className={cn('w-full border-separate border-spacing-px bg-content-text', className)}
      {...props}
    >
      <tbody>{children}</tbody>
    </table>
  )
}
