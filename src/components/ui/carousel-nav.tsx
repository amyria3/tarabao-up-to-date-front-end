import * as React from 'react'

import {
  CarouselArrowHugeLeft,
  CarouselArrowHugeRight,
  CarouselArrowSmLeft,
  CarouselArrowSmRight,
  CarouselNavShapeHuge,
  CarouselNavShapeSm,
} from '@/components/icons/figma-shapes'
import { cn } from '@/lib/utils'

export type CarouselNavSize = 'huge' | 'sm'
export type CarouselNavDirection = 'left' | 'right'

export interface CarouselNavProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: CarouselNavSize
  direction?: CarouselNavDirection
  forceHover?: boolean
}

const ARROWS = {
  huge: { left: CarouselArrowHugeLeft, right: CarouselArrowHugeRight },
  sm: { left: CarouselArrowSmLeft, right: CarouselArrowSmRight },
} as const

/**
 * Figma: Buttons / CarouselNav (2038:4884) · Size Huge (74 × 68) | SM (46 × 44),
 * Direction left | right, Hover?. Eigene Form, nicht Button-Shape.
 */
export const CarouselNav = React.forwardRef<HTMLButtonElement, CarouselNavProps>(function CarouselNav(
  { size = 'huge', direction = 'left', forceHover, className, type = 'button', ...props },
  ref,
) {
  const Shape = size === 'huge' ? CarouselNavShapeHuge : CarouselNavShapeSm
  const Arrow = ARROWS[size][direction]
  return (
    <button
      ref={ref}
      type={type}
      aria-label={props['aria-label'] ?? (direction === 'left' ? 'Zurück' : 'Weiter')}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group relative inline-flex shrink-0 cursor-pointer items-center justify-center',
        size === 'huge' ? 'h-[4.25rem] w-[4.625rem]' : 'h-btn-md w-[2.875rem]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    >
      <Shape className="absolute inset-0 size-full text-btn-primary-bg group-hovered:text-btn-primary-bg-hover" />
      <Arrow className="relative motion-hover text-btn-primary-label group-hovered:-translate-y-xxs group-hovered:text-btn-primary-label-hover" />
    </button>
  )
})
