'use client'

import * as React from 'react'

import { InputField, type InputFieldProps } from '@/components/design-system/inputs/input-field'
import { InlineFeedbackElement } from '@/components/design-system/primitives/inline-feedback-element'
import { cn } from '@/lib/utils'

export interface FormFieldProps extends InputFieldProps {
  /** Meldung des Servers (InlineFeedbackElement, Warnung) über dem Feld, z. B. „Hast Du ein Passwort?“. */
  remoteError?: string
  /** Schließbarer Hinweis unter dem Feld, der die Eingabe nicht als falsch markiert. */
  warning?: string
  /** Inhalt über dem Feld, z. B. eingelöste Gutscheine. */
  hint?: React.ReactNode
  /** Aktion rechts neben dem Feld, unten bündig (2.10: „So baust Du Felder mit Button“). */
  action?: React.ReactNode
  /** Inhalt unter dem Feld, z. B. die Zeile „Adresse manuell eingeben?“. */
  footer?: React.ReactNode
}

/**
 * Kombination aus Input / Field und Zusatzinhalten (2.10 Eingabefelder, „Felder mit Button“):
 * Spalte gap-xxs mit [remoteError] [hint] Feld + [action] [warning] [footer].
 * Fehler des Felds selbst rendert Input / Field (`error`).
 */
export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { remoteError, warning, hint, action, footer, className, id, ...props },
  ref,
) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const remoteId = remoteError ? `${inputId}-remote` : undefined
  const warningId = warning ? `${inputId}-warning` : undefined
  const describedBy = [remoteId, warningId, props['aria-describedby']].filter(Boolean).join(' ') || undefined

  return (
    <div data-slot="form-field" className={cn('flex w-full max-w-block-max flex-col gap-xxs', className)}>
      {remoteError ? (
        <InlineFeedbackElement id={remoteId} tone="warning">
          {remoteError}
        </InlineFeedbackElement>
      ) : null}
      {hint ? <div className="flex w-full flex-col gap-xxs">{hint}</div> : null}
      <div className="flex w-full items-end gap-sm">
        <InputField ref={ref} id={inputId} {...props} aria-describedby={describedBy} className="min-w-zero flex-1" />
        {action ? <div className="flex shrink-0 items-end pb-xs">{action}</div> : null}
      </div>
      {warning ? (
        <InlineFeedbackElement id={warningId} tone="warning" closable>
          {warning}
        </InlineFeedbackElement>
      ) : null}
      {footer}
    </div>
  )
})
FormField.displayName = 'FormField'
