import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * shadcn/ui Input als nacktes Eingabeelement im Tarabao-Vokabular:
 * type-input-input-text, Farbe input-label-focused, kein eigener Rahmen.
 * Rahmen, Label und Zustände liefert InputField (Figma Input / Input Field plain).
 */
function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'min-w-zero bg-transparent type-input-input-text text-input-label-focused outline-none',
        'placeholder:text-input-placeholder disabled:cursor-not-allowed disabled:text-input-label-inactive',
        'aria-invalid:text-error-content',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
