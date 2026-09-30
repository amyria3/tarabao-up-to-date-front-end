import * as React from 'react'

import { ArrowUpOrDown } from '@/components/design-system/primitives/arrow-up-or-down'
import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

export interface DisclosureToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Figma Open?=True: „zuklappen“ + Pfeil hoch; False: „aufklappen“ + Pfeil runter. */
  open: boolean
  openLabel?: string
  closedLabel?: string
  /** Zeigt State=Hover statisch (Bibliothek, Storybook). */
  forceHover?: boolean
}

/**
 * Figma: Buttons / DisclosureToggle (9734:30031). Kleinster Button mit Label (Label/default,
 * content-text) und ArrowUpOrDown 14 in einer Icon-Fläche 5 × 5. Wurzel Hug, h-5, pl-sm pr-xxxs,
 * gap-xxs. Hover: Button-Shape (Very oval) in btn-icon-bg-hover hinter dem Label.
 * Nutzung: ContentModules / CMS / RecipeStep. Im Code trägt er aria-expanded.
 */
export const DisclosureToggle = React.forwardRef<HTMLButtonElement, DisclosureToggleProps>(function DisclosureToggle(
  { open, openLabel = 'zuklappen', closedLabel = 'aufklappen', forceHover, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-expanded={open}
      data-hovered={forceHover ? '' : undefined}
      className={cn(
        'group relative inline-flex h-5 w-fit max-w-full cursor-pointer items-center gap-xxs pr-xxxs pl-sm select-none',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
      {...props}
    >
      <ButtonShape shape="very-oval" className="text-btn-icon-bg-hover opacity-0 group-hovered:opacity-100" />
      <span className="relative type-label-default text-content-text uppercase">{open ? openLabel : closedLabel}</span>
      <span aria-hidden className="relative inline-flex size-5 items-center justify-center">
        <ArrowUpOrDown variant={open ? 'up' : 'down'} size={14} />
      </span>
    </button>
  )
})
DisclosureToggle.displayName = 'DisclosureToggle'
