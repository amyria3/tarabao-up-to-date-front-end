'use client'

import * as React from 'react'

import { InputField } from '@/components/design-system/inputs/input-field'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface AddressSuggestion {
  id: string
  /** Adresszeile 1, z. B. „Berliner Str. 01“ */
  address1: string
  /** Zusatz für die Liste, z. B. „10115 Berlin“ */
  detail?: string
}

export interface AddressSearchProps {
  value?: string
  onValueChange?: (value: string) => void
  /** Vorschläge zur Eingabe (Autocomplete). Leer → keine Liste. */
  suggestions?: AddressSuggestion[]
  /** Gewählte Adresse (Figma State=Selected: Feld zeigt sie als „Adresszeile 1*“ mit Häkchen). */
  selected?: AddressSuggestion | null
  onSelect?: (suggestion: AddressSuggestion) => void
  /** Figma State=Missing: Meldung aus All Input Messages/… */
  error?: string
  /** Figma-Zeile „Adresse manuell eingeben?“ · Buttons / XXS / Inline „Manuell eingeben“ */
  onManualEntry?: () => void
  manualQuestion?: string
  manualLabel?: string
  className?: string
}

const MISSING = 'Wir brauchen Deine Adresse für den Versand'

/**
 * Figma: Components / Checkout / AddressSearch (9779:30099). Spalte gap-xxs aus Input / Field
 * („Adressdaten suchen“) und der Zeile manual-entry (DefaultText MD rechtsbündig + XXS Inline).
 * State Default → Focus → Selected entsteht aus Fokus, Eingabe und Auswahl; Missing aus `error`.
 * Selected zeigt die Adresse als „Adresszeile 1*“ mit Häkchen und blendet die Zeile aus.
 */
export function AddressSearch({
  value = '',
  onValueChange,
  suggestions = [],
  selected = null,
  onSelect,
  error,
  onManualEntry,
  manualQuestion = 'Adresse manuell eingeben?',
  manualLabel = 'Manuell eingeben',
  className,
}: AddressSearchProps) {
  const listId = React.useId()
  const [open, setOpen] = React.useState(false)
  const showList = open && !selected && value.length > 0 && suggestions.length > 0

  return (
    <div data-slot="address-search" className={cn('relative flex w-full max-w-block-max flex-col gap-xxs', className)}>
      <InputField
        label={selected ? 'Adresszeile 1' : 'Adressdaten suchen'}
        name="addressSearch"
        autoComplete="street-address"
        required={Boolean(selected)}
        value={selected ? selected.address1 : value}
        readOnly={Boolean(selected)}
        valid={Boolean(selected)}
        error={selected ? undefined : error === '' ? MISSING : error}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        onChange={(e) => {
          onValueChange?.(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      />
      {showList ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-zero top-[var(--height-input-inline)] z-10 flex flex-col bg-surface shadow-card"
        >
          {suggestions.map((s) => (
            <li key={s.id} role="option" aria-selected={false}>
              <button
                type="button"
                className="flex w-full cursor-pointer flex-col items-start px-sm py-xs text-left type-default-text-md text-content-text hover:bg-input-bg-focused"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect?.(s)
                  setOpen(false)
                }}
              >
                <span>{s.address1}</span>
                {s.detail ? <span className="type-input-label-sm text-input-label">{s.detail}</span> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {selected ? null : (
        <div data-slot="manual-entry" className="flex w-full items-center justify-end gap-[0.125rem]">
          <p className="min-w-zero flex-1 text-right type-default-text-md text-input-label-focused">{manualQuestion}</p>
          <Button intent="inline" size="xxs" onClick={onManualEntry}>
            {manualLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
