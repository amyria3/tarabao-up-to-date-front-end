'use client'

import * as React from 'react'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

export type RadioOptionState = 'default' | 'inactive' | 'error'

export interface RadioOptionProps {
  value: string
  label: React.ReactNode
  /** Figma Content=Plain Text: Text unter dem Label. */
  description?: React.ReactNode
  /** Figma Content=Component|Address: Slot „Container“, sichtbar wenn gewählt (Component) oder immer (Address). */
  children?: React.ReactNode
  /** Slot nur bei Auswahl zeigen (Figma Content=Component). */
  childrenWhenSelected?: boolean
  /** Figma State=Inactive (op-30, nicht wählbar) bzw. State=Error (op-30 + Hinweis). */
  state?: RadioOptionState
  /** Hinweis bei State=Error, z. B. <InlineFeedbackElement />. */
  feedback?: React.ReactNode
  /** Aktueller Wert der Gruppe, für childrenWhenSelected. Setzt RadioGroupField. */
  selectedValue?: string
  className?: string
}

/**
 * Figma: Components / RadioButtonGroup (3793:15664) — eine Option.
 * Zeile gap-md-l: Icons / Radio (30) + Label type-data-blocks-summary-item-title,
 * darunter Inhalt mit pl-[3.125rem] (12.5 twuc), Manrope Medium 14.
 */
export function RadioOption({
  value,
  label,
  description,
  children,
  childrenWhenSelected = false,
  state = 'default',
  feedback,
  selectedValue,
  className,
}: RadioOptionProps) {
  const id = React.useId()
  const descriptionId = description ? `${id}-desc` : undefined
  const dim = state === 'inactive' || state === 'error'
  const showChildren = children && (!childrenWhenSelected || selectedValue === value)
  return (
    <div
      data-slot="radio-option"
      className={cn('flex w-full flex-col gap-xxs', state === 'inactive' && 'opacity-30', className)}
    >
      <div className={cn('flex h-5 w-full items-center gap-md-l', state === 'error' && 'opacity-30')}>
        <RadioGroupItem
          id={id}
          value={value}
          disabled={dim}
          aria-describedby={descriptionId}
          aria-invalid={state === 'error' || undefined}
        />
        <label
          htmlFor={id}
          className="cursor-pointer text-center type-data-blocks-summary-item-title text-content-text"
        >
          {label}
        </label>
      </div>
      {description ? (
        <p
          id={descriptionId}
          className={cn(
            'w-full pl-[3.125rem] font-body text-14 font-medium text-content-text',
            state === 'error' && 'opacity-30',
          )}
        >
          {description}
        </p>
      ) : null}
      {showChildren ? <div className="flex w-full flex-col gap-md-l pl-[3.125rem]">{children}</div> : null}
      {state === 'error' && feedback ? <div className="flex w-full pb-xxs pl-xxl">{feedback}</div> : null}
    </div>
  )
}

export type RadioFieldOption = Omit<RadioOptionProps, 'selectedValue'>

export interface RadioFieldProps {
  options: RadioFieldOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  name?: string
  className?: string
  'aria-label'?: string
}

/**
 * Figma: Switches / Radio (3795:12348) · Option 1?/Option 2?.
 * Spalte gap-md-l aus RadioButtonGroup-Optionen.
 */
export function RadioField({ options, value, defaultValue, onValueChange, name, className, ...aria }: RadioFieldProps) {
  const [inner, setInner] = React.useState(defaultValue ?? options[0]?.value ?? '')
  const current = value ?? inner
  return (
    <RadioGroup
      value={current}
      onValueChange={(next) => {
        if (value === undefined) setInner(next)
        onValueChange?.(next)
      }}
      name={name}
      aria-label={aria['aria-label']}
      className={cn('w-full', className)}
    >
      {options.map((option) => (
        <RadioOption key={option.value} {...option} selectedValue={current} />
      ))}
    </RadioGroup>
  )
}
