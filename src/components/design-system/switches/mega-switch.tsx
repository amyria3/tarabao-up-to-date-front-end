'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as React from 'react'

import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

export interface MegaSwitchProps extends Omit<React.ComponentProps<typeof SwitchPrimitive.Root>, 'children'> {
  /** Figma Text-Variable Texts & Headlines/Abo/Order once */
  offLabel?: string
  /** Figma TEXT-Property „Order in subscription“ */
  onLabel?: string
  forceHover?: boolean
  /**
   * Figma: Switches / MegaSwitch (Standard, Labels h-10, Buttons/MD) oder
   * Switches / MegaSwitch / XXSM (9481:45126): Labels h-7, Buttons/XX-SM, Track 29 px,
   * Padding 2/2; im Warenkorb (Components / Cart / ProductItem).
   */
  size?: 'md' | 'xxsm'
}

/**
 * Figma: Switches / MegaSwitch (8847:23405) · Switched?=False|True, State=Default|Hover.
 * Wurzel Fill min-w-btn-min max-w-btn-max, Form „Oval“ in switch-segment-bg,
 * gewählte Hälfte als zweites Oval (h40) in switch-segment-bg-selected.
 * Hover nur auf der nicht gewählten Hälfte (Figma: While hovering am Label, ohne Animation):
 * „Right Label Surface“ legt dort ein zweites Oval in switch-segment-bg-selected, beide Labels
 * in switch-segment-label-selected.
 * Semantik: role="switch" (Radix Switch), aria-checked = Abo gewählt.
 */
export const MegaSwitch = React.forwardRef<HTMLButtonElement, MegaSwitchProps>(function MegaSwitch(
  { offLabel, onLabel, forceHover, size = 'md', className, ...props },
  ref,
) {
  const xxsm = size === 'xxsm'
  const off = offLabel ?? (xxsm ? 'einmal bestellen' : '1-malig bestellen')
  const on = onLabel ?? (xxsm ? 'im Abo' : 'im Abo bestellen')
  const half = cn('flex flex-1 items-center justify-center text-center', xxsm ? 'h-7' : 'h-10')
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="mega-switch"
      data-size={size}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group relative flex w-full cursor-pointer select-none items-center',
        xxsm ? 'min-w-fieldset-min max-w-block-max' : 'min-w-btn-min max-w-btn-max',
        'py-xxxs free-hovered:pt-zero free-hovered:pb-xxs',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    >
      <ButtonShape
        shape="oval"
        className="text-switch-segment-bg group-free-hovered:text-switch-bg-hover"
        outlineClassName="text-switch-segment-label"
      />
      <SwitchPrimitive.Thumb
        data-slot="mega-switch-thumb"
        className="absolute inset-y-zero left-zero w-1/2 py-xxxs transition-transform duration-200 data-[state=checked]:translate-x-full motion-reduce:transition-none"
      >
        <span className="relative block h-full">
          <ButtonShape shape="oval" className="text-switch-segment-bg-selected" />
        </span>
      </SwitchPrimitive.Thumb>
      <span
        aria-hidden
        data-slot="mega-switch-preview"
        className="absolute inset-y-zero left-1/2 hidden w-1/2 py-xxxs group-selected:left-zero group-free-hovered:block"
      >
        <span className="relative block h-full">
          <ButtonShape shape="oval" className="text-switch-segment-bg-selected" />
        </span>
      </span>
      <span
        className={cn(
          'relative flex w-full items-center justify-between',
          xxsm ? 'type-buttons-xx-sm uppercase' : 'type-buttons-md',
        )}
      >
        <span
          data-half="off"
          className={cn(
            half,
            'text-switch-segment-label-selected group-selected:text-switch-segment-label group-free-hovered:text-switch-segment-label-selected',
          )}
        >
          {off}
        </span>
        <span
          data-half="on"
          className={cn(
            half,
            'text-switch-segment-label group-selected:text-switch-segment-label-selected group-free-hovered:text-switch-segment-label-selected',
          )}
        >
          {on}
        </span>
      </span>
    </SwitchPrimitive.Root>
  )
})
MegaSwitch.displayName = 'MegaSwitch'
