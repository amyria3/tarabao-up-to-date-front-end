'use client'

import * as React from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

/**
 * Zeile aus Buttons / CheckBox und Primitives / DefaultParagraph MD (Figma „fr“ gap-md bzw.
 * gap-sm), wie in Checkout / Identification und AddressFieldset.
 */
export function CheckboxField({
  label,
  gap = 'md',
  className,
  ...props
}: React.ComponentProps<typeof Checkbox> & { label: React.ReactNode; gap?: 'sm' | 'md' }) {
  const id = React.useId()
  return (
    <div className={cn('flex w-full items-start', gap === 'md' ? 'gap-md' : 'gap-sm', className)}>
      <Checkbox id={id} {...props} />
      <label
        htmlFor={id}
        className="min-w-block-inline-min flex-1 cursor-pointer pt-1 type-default-text-md text-content-text"
      >
        {label}
      </label>
    </div>
  )
}
