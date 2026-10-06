import * as React from 'react'

import { IconClose14 } from '@/components/icons/figma-icons'
import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma-Varianten Warenkorb? · Search? · Menu?: „Warenkorb schließen“, „Suche schließen“, „Navigation schließen“ */
  label: string
  icon?: React.ReactNode
  forceHover?: boolean
}

/**
 * Figma: Buttons / IconButton (2588:2421). Schließen-Button mit Icon und Label,
 * Hover zeigt die Form „Very oval“ in card-btn-hover-click.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, icon = <IconClose14 />, forceHover, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        // Figma: Wurzel Hug, 20 px hoch (nicht an Btns/XXXX-SM/fix-h gebunden).
        'group relative inline-flex h-5 cursor-pointer items-center gap-xxs pr-sm pl-xxxs text-content-text',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
      {...props}
    >
      <ButtonShape shape="very-oval" className="text-card-btn-hover-click opacity-0 group-hovered:opacity-100" />
      <span className="relative inline-flex">{icon}</span>
      <span className="relative type-label-default">{label}</span>
    </button>
  )
})
