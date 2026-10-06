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
   * Figma: Switches / MegaSwitch (Standard, Labels und Pillen so hoch wie Btns/MD/fix-h, Buttons/MD)
   * oder Switches / MegaSwitch / XXSM (9481:45126): Labels und Pillen so hoch wie Btns/XX-SM/fix-h,
   * Buttons/XX-SM; im Warenkorb (Components / Cart / ProductItem). Beide mit Padding 2/2, der Track ist
   * die Wurzel (40 bzw. 24 px).
   */
  size?: 'md' | 'xxsm'
}

/**
 * Figma: Switches / MegaSwitch (8847:23405) · Switched?=False|True, State=Default|Hover.
 * Wurzel Fill min-w-btn-min max-w-btn-max, Form „Oval“ in switch-segment-bg,
 * gewählte Hälfte als zweites Oval (so hoch wie das Label) in switch-segment-bg-selected.
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
  const off = offLabel ?? 'einmal bestellen'
  const on = onLabel ?? (xxsm ? 'im Abo' : 'im Abo bestellen')
  // Labelfarben wechseln im Takt des Schiebers (motion-long), damit das Label
  // erst hell wird, wenn die dunkle Pille darunter liegt.
  const half = cn(
    'flex flex-1 items-center justify-center text-center',
    'transition-colors duration-(--smart-animate-duration-long) ease-(--smart-animate-easing) motion-reduce:transition-none',
    // Hover blendet nur kurz über (wie Dissolve in Figma); der Klick behält die lange Dauer.
    'group-free-hovered:duration-(--smart-animate-duration-short)',
    xxsm ? 'h-btn-xx-sm' : 'h-btn-md',
  )
  return (
    <SwitchPrimitive.Root
      ref={ref}
      data-slot="mega-switch"
      data-size={size}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group relative flex w-full cursor-pointer select-none items-center',
        'min-w-btn-min max-w-btn-max',
        // Padding 2/2 in allen Zuständen wie in Figma (29.09.): Der Switch hebt sich beim Hover nicht an.
        'py-xxxs',
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
        className="absolute inset-y-zero left-zero w-1/2 py-xxxs motion-long data-[state=checked]:translate-x-full"
      >
        <span className="relative block h-full">
          <ButtonShape shape="oval" className="text-switch-segment-bg-selected" />
        </span>
      </SwitchPrimitive.Thumb>
      <span
        aria-hidden
        data-slot="mega-switch-preview"
        // Blendet an Ort und Stelle ein und aus (wie die geparkte Right Label Surface in Figma):
        // Nach einem Klick bleibt die Fläche auf der neu gewählten Hälfte, bis der Schieber dort
        // ankommt; erst danach springt sie unsichtbar auf die freie Hälfte.
        className="absolute inset-y-zero left-1/2 w-1/2 py-xxxs opacity-0 [transition:opacity_var(--smart-animate-duration-long)_var(--smart-animate-easing),left_0s_var(--smart-animate-duration-long)] group-free-hovered:[transition:opacity_var(--smart-animate-duration-short)_var(--smart-animate-easing),left_0s_var(--smart-animate-duration-long)] group-selected:left-zero group-free-hovered:opacity-100 motion-reduce:transition-none"
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
