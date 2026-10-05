import * as React from 'react'

import { cn } from '@/lib/utils'

export interface CardsOrderProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Figma Variant=CardsRow (waagerecht scrollen) | CardsTiles (Umbruch, mittig) */
  variant?: 'row' | 'tiles'
  children: React.ReactNode
}

/**
 * Figma: Templates / Cards Order (8308:37439) · Variant=CardsRow|CardsTiles.
 * CardsRow: eine Zeile gap-sm, die waagerecht scrollt (pr/pb xs Luft für Schatten).
 * CardsTiles: Kacheln mit Umbruch, mittig, gap-md-sm. Kinder sind die Karten; jede Karte
 * steht in einem <li>.
 */
export const CardsOrder = React.forwardRef<HTMLUListElement, CardsOrderProps>(function CardsOrder(
  { variant = 'tiles', className, children, ...props },
  ref,
) {
  return (
    <ul
      ref={ref}
      data-slot="cards-order"
      data-variant={variant}
      className={cn(
        'flex w-full pr-xs pb-xs',
        variant === 'row'
          ? 'snap-x snap-mandatory items-center gap-sm overflow-x-auto [&>li]:shrink-0 [&>li]:snap-start'
          : 'flex-wrap items-start justify-center gap-md-sm',
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  )
})
CardsOrder.displayName = 'CardsOrder'
