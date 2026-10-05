'use client'

import * as React from 'react'

import { InputField } from '@/components/ui/input-field'
import { Button } from '@/components/ui/button'

export interface NewsletterFormProps {
  inputLabel?: string
  submitLabel?: string
  /** Wird mit der E-Mail-Adresse aufgerufen; die Anbindung (z. B. Server Action) liegt beim Aufrufer. */
  onSubscribe?: (email: string) => void | Promise<void>
}

/**
 * Formularteil von Components / BlockElement · Variant=Newsletter:
 * Input / Input Field plain (E-mail, Remote Validation required) und Buttons / MD / PrimaryButton
 * über die volle Breite.
 */
export function NewsletterForm({
  inputLabel = 'E-Mail',
  submitLabel = 'In Verbindung bleiben',
  onSubscribe,
}: NewsletterFormProps) {
  const [pending, setPending] = React.useState(false)
  return (
    <form
      className="flex w-full flex-col gap-md-l"
      onSubmit={async (event) => {
        event.preventDefault()
        const email = String(new FormData(event.currentTarget).get('email') ?? '')
        setPending(true)
        try {
          await onSubscribe?.(email)
        } finally {
          setPending(false)
        }
      }}
    >
      <InputField label={inputLabel} type="email" name="email" autoComplete="email" required />
      <div className="flex w-full flex-col gap-xxs">
        <Button type="submit" intent="primary" size="md" disabled={pending} className="w-full">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
