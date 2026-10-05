'use client'

import * as React from 'react'

import { IconEye } from '@/components/icons/figma-icons'
import { ArrowUpOrDown } from '@/components/ui/arrow-up-or-down'
import { InlineFeedbackElement } from '@/components/ui/inline-feedback-element'
import { ValidationSign } from '@/components/ui/validation-sign'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/**
 * Figma-Achse Type von Input / Field (9563:39197): Text, Password, Select, Textarea.
 * E-Mail, Telefon und Zahl sind Type=Text mit anderem HTML-Attribut (2.10).
 */
export type InputFieldType = 'text' | 'email' | 'tel' | 'number' | 'search' | 'password' | 'select' | 'textarea'

type NativeProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'>

export interface InputFieldProps extends NativeProps {
  /** Figma-Property Label (All Input Labels/…). Ein „*“ für Pflichtfelder folgt aus `required`. */
  label: string
  type?: InputFieldType
  /**
   * Figma State=Missing (leer) bzw. State=Invalid (befüllt): aria-invalid, rote Linie und
   * die Meldung (Primitives / InlineFeedbackElement, Warnung) unter dem Feld.
   * Text aus All Input Messages/….
   */
  error?: string
  /** Figma Show message=False blendet die Meldung aus; aria-invalid bleibt. */
  showMessage?: boolean
  /** Figma State=Valid: Häkchen hinter dem Wert. */
  valid?: boolean
  /** Optionen für type="select" */
  options?: { value: string; label: string }[]
  /** Präfix vor dem Wert, z. B. „#“ bei der Bestellnummer. */
  prefix?: string
  /** Zeigt State=Focus statisch (Bibliothek, Storybook). */
  forceActive?: boolean
  /** Zeilen für type="textarea"; das Feld wächst mit dem Text (field-sizing). */
  rows?: number
  className?: string
  /** Klassen für die Ebene `field` (Linie, Höhe). */
  fieldClassName?: string
}

/**
 * Figma: Input / Field (9563:39197), Doku 2-tarabao/2.10-eingabefelder-aufbau.md.
 * Wurzel flex-col gap-xxs, min-w-fieldset-min, max-w-block-max. Ebene `field`:
 * Höhe Input/Inline/fix-h (Textarea: Mindesthöhe Input/Textarea/min-h), Linie unten 1 px,
 * im Fokus 2 px und Fläche input-bg-focused. Leer und ohne Fokus steht das Label als
 * Platzhalter in der Zeile (Input/LabelDefault), sonst klein darüber (Input/Label SM).
 * Die Zustände entstehen aus Fokus, Eingabe und `error`; es gibt keine Prop `state`.
 */
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    label,
    type = 'text',
    error,
    showMessage = true,
    valid,
    options = [],
    prefix,
    forceActive,
    rows = 6,
    className,
    fieldClassName,
    id,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    disabled,
    required,
    'aria-describedby': describedByProp,
    ...props
  },
  forwardedRef,
) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const messageId = `${inputId}-message`
  const innerRef = React.useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null)
  React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement)

  const [focused, setFocused] = React.useState(false)
  const [innerFilled, setInnerFilled] = React.useState(() => String(defaultValue ?? '').length > 0)
  const [reveal, setReveal] = React.useState(false)

  const filled = value !== undefined ? String(value).length > 0 : innerFilled
  const active = forceActive || focused
  const invalid = Boolean(error)
  // Figma: Missing = Pflichtfeld leer (Label bleibt Platzhalter, rot); Invalid = Eingabe falsch.
  const missing = invalid && !filled
  const labelUp = active || filled
  const isTextarea = type === 'textarea'
  const isSelect = type === 'select'
  const describedBy =
    [invalid && showMessage ? messageId : undefined, describedByProp].filter(Boolean).join(' ') || undefined

  const handlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true)
      onFocus?.(e)
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false)
      onBlur?.(e)
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setInnerFilled(e.target.value.length > 0)
      onChange?.(e)
    },
  }

  const shared = {
    id: inputId,
    disabled,
    required,
    'aria-invalid': invalid || undefined,
    'aria-describedby': describedBy,
    value,
    defaultValue,
    ...handlers,
  }

  let control: React.ReactNode
  if (isSelect) {
    control = (
      <select
        ref={innerRef as unknown as React.Ref<HTMLSelectElement>}
        {...(shared as unknown as React.SelectHTMLAttributes<HTMLSelectElement>)}
        {...(props as unknown as React.SelectHTMLAttributes<HTMLSelectElement>)}
        className="min-w-zero flex-1 cursor-pointer appearance-none bg-transparent type-input-input-text text-input-label-focused outline-none disabled:cursor-not-allowed aria-invalid:text-error-content"
      >
        {!filled ? <option value="" hidden /> : null}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    )
  } else if (isTextarea) {
    control = (
      <textarea
        ref={innerRef as unknown as React.Ref<HTMLTextAreaElement>}
        rows={rows}
        {...(shared as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        {...(props as unknown as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        className={cn(
          'min-w-zero flex-1 resize-none bg-transparent [field-sizing:content] type-input-textarea-text text-input-label-focused outline-none',
          'aria-invalid:text-error-content disabled:cursor-not-allowed',
          !labelUp && 'opacity-0',
        )}
      />
    )
  } else {
    const inputType = type === 'password' ? (reveal ? 'text' : 'password') : type
    control = (
      <Input
        ref={innerRef}
        type={inputType}
        {...shared}
        {...props}
        className="max-w-full [field-sizing:content] min-w-[1ch]"
      />
    )
  }

  return (
    <div
      data-slot="input-field"
      className={cn('flex w-full min-w-fieldset-min max-w-block-max flex-col gap-xxs', className)}
    >
      <div
        data-slot="input-field-field"
        data-active={active || undefined}
        data-filled={filled || undefined}
        data-invalid={invalid || undefined}
        onClick={() => innerRef.current?.focus()}
        className={cn(
          'group/field relative flex w-full cursor-text flex-col justify-end border-b border-input-label pb-xs',
          isTextarea ? 'min-h-input-textarea pt-md' : 'h-input-inline',
          'data-active:border-b-2 data-active:bg-input-bg-focused data-active:border-input-label-focused data-filled:border-input-label-focused',
          'data-invalid:border-error-content',
          disabled && 'cursor-not-allowed border-input-label-inactive',
          fieldClassName,
        )}
      >
        <label
          htmlFor={inputId}
          className={cn(
            'pointer-events-none absolute left-zero truncate transition-all duration-150 motion-reduce:transition-none',
            labelUp
              ? 'top-zero type-input-label-sm text-input-label-focused group-data-invalid/field:text-error-content'
              : cn(
                  'flex h-5 items-center type-input-label-default text-input-label',
                  isTextarea ? 'top-md' : 'bottom-xs',
                  missing && 'text-error-content',
                ),
            disabled && 'text-input-label-inactive',
          )}
        >
          {label}
          {required && !label.trimEnd().endsWith('*') ? <span aria-hidden>*</span> : null}
        </label>

        <div
          data-slot="input-field-value-row"
          className={cn(
            'relative flex w-full min-w-zero justify-between',
            isTextarea ? 'items-start' : 'h-5 items-center',
            isSelect ? 'gap-xxs' : type === 'password' ? 'gap-md' : 'gap-xxs',
            !labelUp && !isSelect && !isTextarea && 'opacity-0 group-data-active/field:opacity-100',
          )}
        >
          {prefix && labelUp ? (
            <span aria-hidden className="-mr-xxxs type-input-input-text text-input-label-focused">
              {prefix}
            </span>
          ) : null}
          {control}
          {valid && filled && !invalid ? <ValidationSign variant="valid" aria-label="Gültig" role="img" /> : null}
          {invalid && filled ? <ValidationSign variant="error" aria-label="Fehlerhaft" role="img" /> : null}
          {type === 'password' ? (
            <button
              type="button"
              aria-label={reveal ? 'Passwort verbergen' : 'Passwort anzeigen'}
              aria-pressed={reveal}
              onClick={(e) => {
                e.stopPropagation()
                setReveal((r) => !r)
              }}
              className={cn(
                'inline-flex size-5 shrink-0 cursor-pointer items-center justify-center text-content-text',
                'focus-visible:outline-2 focus-visible:outline-btn-primary-bg',
                invalid && 'text-error-content',
                !labelUp && 'hidden',
              )}
            >
              <IconEye aria-hidden className="size-5" />
            </button>
          ) : null}
          {isSelect ? <ArrowUpOrDown variant="down" size={14} className="pointer-events-none shrink-0" /> : null}
        </div>
      </div>

      {invalid && showMessage ? (
        <div data-slot="input-field-message" className="flex w-full pb-xxs">
          <InlineFeedbackElement id={messageId} tone="warning" closable>
            {error}
          </InlineFeedbackElement>
        </div>
      ) : null}
    </div>
  )
})
InputField.displayName = 'InputField'
