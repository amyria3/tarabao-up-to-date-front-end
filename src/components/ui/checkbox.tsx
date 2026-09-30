'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

import { IconCheck30 } from '@/components/design-system/icons/figma-icons'
import type { GlobalTheme } from '@/lib/design-system/themes'
import { cn } from '@/lib/utils'

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  /** Figma pinnt die Komponente auf cole-tint-surface-snow. */
  theme?: GlobalTheme | null
}

/**
 * shadcn/ui Checkbox = Figma Buttons / CheckBox (3517:8647).
 * 28×28 (size-7), Fläche surface-color, Kontur 1px content-text,
 * Häkchen Icons / check (Size=30) in 20×20 bei On?=True.
 */
function Checkbox({ className, theme = 'cole-tint-surface-snow', ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      {...(theme ? { 'data-theme': theme } : {})}
      className={cn(
        'peer inline-flex size-7 shrink-0 cursor-pointer items-center justify-center border border-content-text bg-surface text-content-text',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        'disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-error-content',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center">
        <IconCheck30 className="size-5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
