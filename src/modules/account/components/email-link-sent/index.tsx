'use client'

import * as React from 'react'

import { InputField } from '@/components/ui/input-field'
import { DefaultParagraph, InlineQuestion } from '@/components/ui/typography'
import { CheckoutBlock, CheckoutHeadline } from '@modules/checkout/components/checkout-block'

const TEXTS = {
  'password-reset': 'Wir haben Dir einen Link geschickt. Mit dem Link legst Du ein neues Passwort fest.',
  'magic-link': 'Wir haben Dir einen Link geschickt. Mit dem Link meldest Du Dich ohne Passwort an.',
} as const

/** Sperre nach „Erneut senden“ gegen schnelles Wiederholen */
export const RESEND_COOLDOWN_MS = 30_000

export interface EmailLinkSentProps {
  /** Figma Variant=PasswordReset (nach „Passwort vergessen?“) | MagicLink (nach „Link per E-Mail schicken“) */
  variant?: 'password-reset' | 'magic-link'
  /** Die Adresse, an die der Link ging */
  email: string
  /** „Erneut senden“: schickt denselben Link noch einmal */
  onResend?: () => void
  className?: string
}

/**
 * Figma: Components / Account / EmailLinkSent (10351:54980) · Variant=PasswordReset|MagicLink.
 * Rahmen wie die Check-out-Schritte (CheckoutBlock), Titel „Schau in Dein Postfach“
 * (ShoppingCart & Checkout/MainHeadline), DefaultParagraph, die E-Mail im Feld (readonly, gültig)
 * und rechts „Keine E-Mail bekommen? · Erneut senden“ (Buttons / XXS / Inline).
 * Die Karte zeigt immer dieselbe Bestätigung, auch wenn es zur E-Mail kein Konto gibt. So verrät die
 * Seite nicht, welche Adressen registriert sind. Nach „Erneut senden“ ist der Button 30 s gesperrt.
 */
export function EmailLinkSent({ variant = 'password-reset', email, onResend, className }: EmailLinkSentProps) {
  const titleId = React.useId()
  const [locked, setLocked] = React.useState(false)

  React.useEffect(() => {
    if (!locked) return
    const timer = window.setTimeout(() => setLocked(false), RESEND_COOLDOWN_MS)
    return () => window.clearTimeout(timer)
  }, [locked])

  return (
    <CheckoutBlock className={className} aria-labelledby={titleId}>
      <CheckoutHeadline id={titleId}>Schau in Dein Postfach</CheckoutHeadline>
      <DefaultParagraph>{TEXTS[variant]}</DefaultParagraph>
      <InputField label="E-Mail" type="email" required readOnly value={email} valid />
      <InlineQuestion
        question="Keine E-Mail bekommen?"
        action="Erneut senden"
        disabled={locked}
        onAction={() => {
          setLocked(true)
          onResend?.()
        }}
      />
    </CheckoutBlock>
  )
}
