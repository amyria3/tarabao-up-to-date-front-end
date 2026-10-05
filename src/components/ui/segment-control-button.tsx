import * as React from 'react'

import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

export interface SegmentControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma Selected?=True. In Tabs/ToggleGroup setzt Radix den Zustand (data-state). */
  selected?: boolean
  /** Figma: ausgeblendete Instanz Icons / Flag / 30 bzw. Icons / check hinter dem Label. */
  icon?: React.ReactNode
  /** Hug (Standard, TabBar) oder Fill (ToggleGroup). */
  width?: 'hug' | 'fill'
  forceHover?: boolean
  /** Rendert das einzige Kind (z. B. next/link) mit Form und Label, wie Button asChild. */
  asChild?: boolean
}

/**
 * Figma: Buttons / XS / SegmentControlButton (3925:20314).
 * Wurzel Hug · label & icon h36 px-md-sm · Button-Shape „Oblong“, Tokens segmented-*.
 */
export const SegmentControlButton = React.forwardRef<HTMLButtonElement, SegmentControlButtonProps>(
  function SegmentControlButton(
    { selected, icon, width = 'hug', forceHover, asChild = false, className, children, type = 'button', ...props },
    ref,
  ) {
    const stateProps = selected === undefined ? {} : { 'aria-pressed': selected, 'data-state': selected ? 'on' : 'off' }
    const rootClassName = cn(
      'group relative cursor-pointer select-none flex-col items-center justify-center',
      width === 'fill' ? 'flex w-full' : 'inline-flex w-fit',
      'pt-xxs pb-zero hovered:pt-zero hovered:pb-xxs selected:pt-xxs selected:pb-zero motion-hover',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
      'disabled:cursor-not-allowed disabled:opacity-60',
      className,
    )
    const inner = (content: React.ReactNode) => (
      <>
        <ButtonShape
          shape="oblong"
          className="text-segmented-bg group-hovered:text-segmented-bg-hover group-selected:text-segmented-bg-selected"
        />
        <span
          className={cn(
            'relative flex h-btn-x-sm w-full items-center justify-center px-md-sm text-center',
            'type-buttons-x-sm text-segmented-label group-hovered:text-segmented-label-hover group-selected:text-segmented-label-selected',
          )}
        >
          <span className={cn(width === 'fill' && 'truncate')}>{content}</span>
          {icon}
        </span>
      </>
    )
    const hoverProps = forceHover ? { 'data-hovered': '' } : {}
    if (asChild && React.isValidElement<{ className?: string; children?: React.ReactNode }>(children)) {
      return React.cloneElement(
        children,
        { ...stateProps, ...hoverProps, ...props, className: cn(rootClassName, children.props.className) } as never,
        inner(children.props.children),
      )
    }
    return (
      <button ref={ref} type={type} {...stateProps} {...hoverProps} {...props} className={rootClassName}>
        {inner(children)}
      </button>
    )
  },
)
SegmentControlButton.displayName = 'SegmentControlButton'
