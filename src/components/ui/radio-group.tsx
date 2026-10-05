'use client'

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import * as React from 'react'

import { IconRadioOff, IconRadioOn } from '@/components/icons/figma-icons'
import { cn } from '@/lib/utils'

/**
 * shadcn/ui RadioGroup. RadioGroupItem = Figma Icons / Radio (30×30,
 * Selected?=False/True), Farbe content-text.
 */
function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root data-slot="radio-group" className={cn('flex flex-col gap-md-l', className)} {...props} />
  )
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'group relative inline-flex size-[1.875rem] shrink-0 cursor-pointer items-center justify-center text-content-text',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        'disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    >
      <IconRadioOff aria-hidden className="size-full group-data-[state=checked]:hidden" />
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="absolute inset-0">
        <IconRadioOn aria-hidden className="size-full" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
