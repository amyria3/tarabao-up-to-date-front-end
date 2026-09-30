'use client'

import * as React from 'react'

import { ValidationSign } from '@/components/design-system/primitives/validation-sign'
import { cn } from '@/lib/utils'

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Figma Default Search Text */
  placeholder?: string
  onClear?: () => void
  className?: string
}

/**
 * Figma: Primitives / SearchInput (2171:2737) · Input?=False|True.
 * Zeile pl-md-l gap-sm. Leer: Platzhalter in input-placeholder (Label/default).
 * Mit Eingabe: Text in btn-inline-label und Löschen-Kreuz (ValidationSign X?=True).
 * Baustein von Components / Search / Input.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { placeholder = 'Hier tippen, was Du suchst', onClear, className, value, defaultValue, onChange, ...props },
  forwardedRef,
) {
  const innerRef = React.useRef<HTMLInputElement>(null)
  React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement)
  const [innerFilled, setInnerFilled] = React.useState(() => String(defaultValue ?? '').length > 0)
  const filled = value !== undefined ? String(value).length > 0 : innerFilled
  return (
    <div data-slot="search-input" className={cn('flex w-full items-center gap-sm pl-md-l', className)}>
      <input
        ref={innerRef}
        type="search"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          setInnerFilled(e.target.value.length > 0)
          onChange?.(e)
        }}
        className={cn(
          'min-w-zero flex-1 bg-transparent type-label-default text-btn-inline-label outline-none',
          'placeholder:text-input-placeholder [&::-webkit-search-cancel-button]:hidden',
        )}
        {...props}
      />
      {filled ? (
        <button
          type="button"
          aria-label="Suche leeren"
          onClick={() => {
            if (innerRef.current && value === undefined) {
              innerRef.current.value = ''
              setInnerFilled(false)
            }
            onClear?.()
            innerRef.current?.focus()
          }}
          className="inline-flex shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
        >
          <ValidationSign variant="clear" className="text-btn-inline-label" />
        </button>
      ) : null}
    </div>
  )
})
SearchInput.displayName = 'SearchInput'
