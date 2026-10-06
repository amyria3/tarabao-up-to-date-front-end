'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface AccountSummaryItemProps {
  /** z. B. „Vorname:“, „Adresse 1:“, „Zahlungsart 1:“ */
  label: string
  /** Einzeiler (Vorname, E-Mail) oder Zeilen (Adresse) */
  lines: React.ReactNode[][]
  /** z. B. „Expires 06/2024“ (UserMessage/Default in content-weak) */
  note?: string
  onEdit?: () => void
  onDelete?: () => void
  /**
   * Figma Editing?=True: statt Label und Buttons stehen die passenden Eingabefelder (Input / Field),
   * z. B. das AddressFieldset für Adresse 1. Der Inhalt kommt vom Aufrufer.
   */
  editor?: React.ReactNode
  /** Figma Editing? kontrolliert; sonst öffnet „Korrigieren“ den Editor, wenn `editor` gesetzt ist. */
  editing?: boolean
  onEditingChange?: (editing: boolean) => void
  className?: string
}

/**
 * Figma: Components / Account / SummaryItem (3941:19715) · Vorname?, Nachname?, E-Mail?,
 * Addresse 1?, Adresse 2?, Zahlungsmethode 1?, Editing?. Titel DataBlocks/SummaryItemTitle in content-weak,
 * Inhalt DataBlocks/SummaryItemContent (Zeilen gap-1). Adressen und Zahlarten haben rechts
 * Buttons / XXS / Inline „Korrigieren“ und „Löschen“. Editing?=True zeigt statt Label und Buttons
 * die Eingabefelder (`editor`).
 */
export function AccountSummaryItem({
  label,
  lines,
  note,
  onEdit,
  onDelete,
  editor,
  editing: controlled,
  onEditingChange,
  className,
}: AccountSummaryItemProps) {
  const [inner, setInner] = React.useState(false)
  const editing = controlled ?? inner
  const setEditing = (next: boolean) => {
    if (controlled === undefined) setInner(next)
    onEditingChange?.(next)
  }
  const single = lines.length === 1 && !note && !onEdit && !onDelete && !editor
  if (editing && editor) {
    return (
      <div
        data-slot="account-summary-item"
        data-editing
        className={cn('flex w-full flex-col gap-md-sm text-content-text', className)}
      >
        {editor}
      </div>
    )
  }
  return (
    <div
      data-slot="account-summary-item"
      className={cn(
        'flex w-full text-content-text',
        single ? 'items-baseline gap-sm' : 'flex-col gap-md-sm',
        className,
      )}
    >
      <p className="shrink-0 whitespace-nowrap type-data-blocks-summary-item-title text-content-weak">{label}</p>
      <div className={cn('flex w-full', single ? '' : 'items-end justify-between gap-md')}>
        <div className="flex flex-col type-data-blocks-summary-item-content">
          {lines.map((parts, i) => (
            <p key={i} className="flex flex-wrap gap-x-1">
              {parts.map((part, j) => (
                <span key={j}>{part}</span>
              ))}
            </p>
          ))}
          {note ? <p className="type-user-message-default text-content-weak">{note}</p> : null}
        </div>
        {onEdit || onDelete || editor ? (
          <div className="flex flex-col items-end gap-xxxs">
            {onEdit || editor ? (
              <Button
                intent="inline"
                size="xxs"
                onClick={() => {
                  onEdit?.()
                  if (editor) setEditing(true)
                }}
              >
                Korrigieren
              </Button>
            ) : null}
            {onDelete ? (
              <Button intent="inline" size="xxs" onClick={onDelete}>
                Löschen
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export interface AccountDataBlockProps {
  title: string
  children?: React.ReactNode
  /** leer: UserMessage/LG, z. B. „Deine Wunschliste ist leer“ */
  emptyText?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

/**
 * Figma: Components / Account / DataBlock (3941:19858) · Dein Profil?, Deine Addressen?,
 * Deine Zahlungsmethoden?, Deine Wunschliste?. p-lg gap-md, surface-color, Rahmen
 * card-btn-hover-click; Titel Cards/Featured/Title, SummaryItems, Buttons / SM / SecondaryButton
 * über die volle Breite (z. B. „Abmelden“, „Ganze Liste zeigen“).
 */
export function AccountDataBlock({
  title,
  children,
  emptyText,
  actionLabel,
  onAction,
  className,
}: AccountDataBlockProps) {
  return (
    <section
      data-slot="account-data-block"
      aria-label={title}
      className={cn(
        'flex w-full max-w-block-max flex-col gap-md border border-card-btn-hover-click bg-surface p-lg text-content-text',
        className,
      )}
    >
      <h2 className="w-full type-cards-featured-title">{title}</h2>
      {children}
      {emptyText ? <p className="w-full type-user-message-lg">{emptyText}</p> : null}
      {actionLabel ? (
        <Button intent="secondary" size="md-oval" className="w-full" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </section>
  )
}
