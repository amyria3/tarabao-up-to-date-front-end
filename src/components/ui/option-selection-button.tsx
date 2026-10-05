import * as React from 'react'

import { IconPaperBag } from '@/components/icons/figma-icons'
import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

export interface OptionSelectionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma State=Selected. In einer Gruppe setzt Radix den Zustand (data-state). */
  selected?: boolean
  /** Figma: Instanz „Handdrawn Icons“ (Icons / PaperBag) vor dem Label. */
  showIcon?: boolean
  forceHover?: boolean
}

/**
 * Figma: Buttons / XS / OptionSelectionButton (272:2159).
 * Wurzel Hug · label & icon h36 px-md gap-sm · Button-Shape „Very oval“.
 * Varianten 0.5kg / 1kg / 5,5 kg sind Inhalte, keine eigenen Komponenten.
 */
export const OptionSelectionButton = React.forwardRef<HTMLButtonElement, OptionSelectionButtonProps>(
  function OptionSelectionButton(
    { selected, showIcon = true, forceHover, className, children, type = 'button', ...props },
    ref,
  ) {
    const stateProps = selected === undefined ? {} : { 'aria-pressed': selected, 'data-state': selected ? 'on' : 'off' }
    return (
      <button
        ref={ref}
        type={type}
        {...stateProps}
        {...(forceHover ? { 'data-hovered': '' } : {})}
        {...props}
        className={cn(
          'group relative inline-flex w-fit cursor-pointer select-none items-center justify-center',
          'pt-xxs pb-zero hovered:pt-zero hovered:pb-xxs selected:pt-xxs selected:pb-zero motion-hover',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
          'disabled:cursor-not-allowed disabled:opacity-60',
          className,
        )}
      >
        <ButtonShape
          shape="very-oval"
          className="text-btn-option-selection-bg group-hovered:text-btn-option-selection-bg-hover group-selected:text-btn-option-selection-bg-selected"
        />
        <span
          className={cn(
            'relative flex h-btn-x-sm items-center justify-center gap-sm px-md',
            'type-buttons-quantity-packaging text-btn-option-selection-label',
            'group-hovered:text-btn-option-selection-label-hover group-selected:text-btn-option-selection-label-selected',
          )}
        >
          {showIcon ? <IconPaperBag aria-hidden className="h-[1.3125rem] w-4 shrink-0" /> : null}
          <span>{children}</span>
        </span>
      </button>
    )
  },
)
OptionSelectionButton.displayName = 'OptionSelectionButton'
