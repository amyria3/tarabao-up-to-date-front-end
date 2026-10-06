import * as React from 'react'

import { IconPlus30 } from '@/components/icons/figma-icons'
import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

export interface ButtonCardRoundProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Der Button hat kein sichtbares Label. Deshalb braucht er ein aria-label, z. B. „In den Warenkorb: Curry-Cashews“. */
  'aria-label': string
  /** Zeigt Hover?=True statisch (Bibliothek, Storybook). */
  forceHover?: boolean
}

/**
 * Figma: Buttons / LG / Button-Card-Round (10250:54012) · Hover?=False|True.
 * Runder Schnell-Button der Produktkarten in Mobil (viewport-range=base). Ein Tipp legt die Sorte
 * der Karte in den Warenkorb, im Nutmixer in den Mix.
 * Wurzel fest 2,75rem × 2,75rem (Btns/L/fix-h), Icons / plus 30 zentriert, Button-Shape „Very oval“
 * absolut dahinter. Fläche card-btn-hover-click, beim Hover btn-icon-bg-hover; Icon card-content-text
 * bzw. card-content-text-hover.
 * Die Position bestimmt die Karte: Das Zentrum liegt auf der unteren rechten Ecke des Produktbilds.
 */
export const ButtonCardRound = React.forwardRef<HTMLButtonElement, ButtonCardRoundProps>(function ButtonCardRound(
  { forceHover, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      data-slot="button-card-round"
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group relative inline-flex h-btn-lg w-(--height-btn-lg) shrink-0 cursor-pointer items-center justify-center',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
      {...props}
    >
      <ButtonShape
        shape="very-oval"
        className="text-card-btn-hover-click motion-hover group-hovered:text-btn-icon-bg-hover"
      />
      {/* Figma: Icons / plus · Size=30 ohne Höhen-Variable → 1.875rem. */}
      <IconPlus30
        aria-hidden
        className="relative size-[1.875rem] text-card-content-text motion-hover group-hovered:text-card-content-text-hover"
      />
    </button>
  )
})
