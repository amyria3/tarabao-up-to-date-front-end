'use client'

import * as React from 'react'

import { IconClose14, IconSearch } from '@/components/design-system/icons/figma-icons'
import { cn } from '@/lib/utils'

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Zugänglicher Name, da Figma keinen sichtbaren Platzhalter zeigt */
  label?: string
  className?: string
}

/**
 * Figma: Components / Search / Input (2339:2155) · Hover?, Active?, Input?, Eingabe?.
 * Zeile h14 (56 px), px-1.5, max-w-search-max, Fläche search-bg mit innerem Schatten;
 * Hover search-bg-hover und „Search on-hover“; aktiv search-bg-focused, Kontur
 * search-stroke-focused 6 px und „Filter-Chips on-hover“. Innen px-3 gap-md-sm: Lupe 30,
 * Eingabe Input/InputText in search-input-text, mit Eingabe ein Kreuz (Touch-Fläche 44 px).
 */
export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { value: controlled, defaultValue = '', onValueChange, label = 'Suche', className, ...props },
  forwardedRef,
) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement)
  const [inner, setInner] = React.useState(defaultValue)
  const value = controlled ?? inner
  const setValue = (next: string) => {
    if (controlled === undefined) setInner(next)
    onValueChange?.(next)
  }
  return (
    <div
      data-slot="search-field"
      data-filled={value ? '' : undefined}
      className={cn(
        'flex h-14 w-full max-w-search-max items-center gap-md-sm bg-search-bg px-1.5 inset-shadow-search',
        'hover:bg-search-bg-hover hover:shadow-search-hover',
        'focus-within:bg-search-bg-focused focus-within:shadow-filter-hover focus-within:inset-ring-6 focus-within:inset-ring-search-stroke-focused',
        // Figma kennt Eingabe nur zusammen mit Active?=True: befüllt bleibt die aktive Fläche stehen
        'data-filled:bg-search-bg-focused data-filled:inset-ring-6 data-filled:inset-ring-search-stroke-focused',
        className,
      )}
    >
      <div className="flex h-11 min-w-zero flex-1 items-center gap-md-sm px-3">
        <IconSearch aria-hidden className="shrink-0 text-search-icon" />
        <input
          ref={inputRef}
          type="search"
          aria-label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            'min-w-zero flex-1 bg-transparent type-input-input-text text-search-input-text caret-search-input-text outline-none',
            '[&::-webkit-search-cancel-button]:hidden',
          )}
          {...props}
        />
      </div>
      {value ? (
        <button
          type="button"
          aria-label="Suche leeren"
          onClick={() => {
            setValue('')
            inputRef.current?.focus()
          }}
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-search-close-icon focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
        >
          <IconClose14 aria-hidden />
        </button>
      ) : null}
    </div>
  )
})
