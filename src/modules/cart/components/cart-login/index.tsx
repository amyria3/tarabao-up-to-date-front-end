'use client'

import * as React from 'react'

import { IconLogIn } from '@/components/icons/figma-icons'
import { FormField } from '@/components/ui/form-field'
import { InlineFeedbackElement } from '@/components/ui/inline-feedback-element'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CartLogInProps {
  /** Figma Error?=True */
  error?: string
  onSubmit?: (credentials: { email: string; password: string }) => void | Promise<void>
  submitLabel?: string
  className?: string
}

/**
 * Figma: Components / Cart / LogIn (3238:10265) · State=Default|Input1|Input2, All valid?, Error?.
 * Spalte gap-md, rechtsbündig: Input / Component E-Mail und Passwort, bei Fehler
 * Primitives / InlineFeedbackElement (Warnung) „E-Mail oder Passwort falsch“,
 * Buttons / MD / PrimaryButton „Anmelden“ (Icon Log In, 240 px).
 */
export function CartLogIn({ error, onSubmit, submitLabel = 'Anmelden', className }: CartLogInProps) {
  const [pending, setPending] = React.useState(false)
  return (
    <form
      data-slot="cart-login"
      className={cn('flex w-full flex-col items-end gap-md', className)}
      onSubmit={async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        setPending(true)
        try {
          await onSubmit?.({ email: String(data.get('email') ?? ''), password: String(data.get('password') ?? '') })
        } finally {
          setPending(false)
        }
      }}
    >
      <FormField label="E-Mail" name="email" type="email" autoComplete="email" required />
      <FormField label="Passwort" name="password" type="password" autoComplete="current-password" required />
      {error ? (
        <InlineFeedbackElement tone="warning" className="w-full max-w-block-max">
          {error}
        </InlineFeedbackElement>
      ) : null}
      <Button
        type="submit"
        intent="primary"
        size="md"
        disabled={pending}
        icon={<IconLogIn aria-hidden className="size-6" />}
        className="w-60"
      >
        {submitLabel}
      </Button>
    </form>
  )
}
