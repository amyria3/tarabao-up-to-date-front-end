'use client'

import * as React from 'react'
import Link from 'next/link'

import { IconCheckout, IconDelivery, IconLogIn } from '@/components/icons/figma-icons'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { DefaultParagraph } from '@/components/ui/typography'
import { CheckoutBlock, CheckoutHeadline } from '@modules/checkout/components/checkout-block'

/** Mindestlänge laut Figma-Text „Dein neues Passwort braucht mindestens 8 Zeichen.“ */
export const PASSWORD_MIN_LENGTH = 8

const TEXTS = {
  reset: {
    title: 'Lege ein neues Passwort fest',
    text: 'Dein neues Passwort braucht mindestens 8 Zeichen.',
    passwordLabel: 'Neues Passwort',
    doneTitle: 'Dein neues Passwort ist gespeichert',
    doneText: 'Du bist jetzt mit Deinem neuen Passwort angemeldet.',
  },
  'new-account': {
    title: 'Lege ein Passwort fest, wenn Du magst',
    text: 'Ein Konto brauchst Du nicht. Über den Link in unseren E-Mails erreichst Du Deine Bestellungen und Dein Abo. Mit einem Passwort meldest Du Dich jederzeit selbst an.',
    passwordLabel: 'Passwort',
    doneTitle: 'Dein Konto ist angelegt',
    doneText: 'Ab jetzt meldest Du Dich mit Deiner E-Mail-Adresse und Deinem Passwort an.',
  },
} as const

const MISMATCH = 'Die Passwörter stimmen nicht überein'

const RETURN_ICONS = { delivery: IconDelivery, checkout: IconCheckout } as const

export interface SetPasswordReturnTo {
  /** Text des gespeicherten Check-out-Schritts, z. B. „Weiter zum Versand“ */
  label: string
  href: string
  icon?: keyof typeof RETURN_ICONS
}

export interface SetPasswordProps {
  /** Figma Variant=Reset (nach „Passwort vergessen?“) | NewAccount (Bestellbestätigung für Gäste) */
  variant?: 'reset' | 'new-account'
  /** Die E-Mail steht nur zum Lesen im Formular (autocomplete="username"). */
  email: string
  /** Figma State=Completed: gespeichert und angemeldet */
  completed?: boolean
  /**
   * Figma Checkout in progress?=True (nur Variant=Reset, State=Completed): Button zum gespeicherten
   * Check-out-Schritt. Ohne returnTo zeigt die Karte keinen Button.
   */
  returnTo?: SetPasswordReturnTo
  /** Vorbelegung (Bibliothek, Storybook: State=Filled bzw. State=Error) */
  defaultPassword?: string
  defaultRepeat?: string
  /** Prüft die Vorbelegung sofort (Bibliothek, Storybook: State=Error). */
  validateOnMount?: boolean
  onSubmit?: (password: string) => void
  className?: string
}

/**
 * Figma: Components / Checkout / SetPassword (10302:51632) · Variant=Reset|NewAccount,
 * State=Initial|Filled|Error|Completed, Checkout in progress?.
 * Rahmen wie die Check-out-Schritte (CheckoutBlock), Titel ShoppingCart & Checkout/MainHeadline,
 * DefaultParagraph, E-Mail (readonly), Passwort und Wiederholung (autocomplete="new-password"),
 * Buttons / MD / PrimaryButton „Passwort speichern“ mit Icon Log In.
 * Filled: beide Passwörter gültig (Häkchen). Error: Die Wiederholung stimmt nicht überein,
 * das Feld bekommt aria-invalid und die Meldung. Completed: Titel und Text wechseln; Reset zeigt den
 * Button zum gespeicherten Check-out-Schritt nur mit returnTo.
 */
export function SetPassword({
  variant = 'reset',
  email,
  completed,
  returnTo,
  defaultPassword = '',
  defaultRepeat = '',
  validateOnMount,
  onSubmit,
  className,
}: SetPasswordProps) {
  const texts = TEXTS[variant]
  const titleId = React.useId()
  const [password, setPassword] = React.useState(defaultPassword)
  const [repeat, setRepeat] = React.useState(defaultRepeat)
  const [submitted, setSubmitted] = React.useState(Boolean(validateOnMount))

  if (completed) {
    const ReturnIcon = returnTo ? RETURN_ICONS[returnTo.icon ?? 'delivery'] : null
    return (
      <CheckoutBlock className={className} aria-labelledby={titleId}>
        <CheckoutHeadline id={titleId}>{texts.doneTitle}</CheckoutHeadline>
        <DefaultParagraph>{texts.doneText}</DefaultParagraph>
        {variant === 'reset' && returnTo && ReturnIcon ? (
          <Button
            asChild
            intent="primary"
            size="md"
            className="w-full"
            icon={<ReturnIcon aria-hidden className="h-btn-md-icon w-auto" />}
          >
            <Link href={returnTo.href}>{returnTo.label}</Link>
          </Button>
        ) : null}
      </CheckoutBlock>
    )
  }

  const passwordValid = password.length >= PASSWORD_MIN_LENGTH
  const mismatch = submitted && repeat !== password
  const repeatValid = passwordValid && repeat === password

  return (
    <CheckoutBlock className={className} aria-labelledby={titleId}>
      <form
        className="flex w-full flex-col gap-md"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          setSubmitted(true)
          if (passwordValid && repeat === password) onSubmit?.(password)
        }}
      >
        <CheckoutHeadline id={titleId}>{texts.title}</CheckoutHeadline>
        <DefaultParagraph>{texts.text}</DefaultParagraph>
        <FormField
          label="E-Mail"
          name="email"
          type="email"
          required
          readOnly
          autoComplete="username"
          value={email}
          valid
        />
        <FormField
          label={texts.passwordLabel}
          name="password"
          type="password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          valid={passwordValid}
          error={submitted && !passwordValid ? texts.text : undefined}
        />
        <FormField
          label="Passwort wiederholen"
          name="password-repeat"
          type="password"
          required
          autoComplete="new-password"
          value={repeat}
          onChange={(event) => setRepeat(event.target.value)}
          valid={repeatValid}
          error={mismatch ? MISMATCH : undefined}
        />
        <Button
          type="submit"
          intent="primary"
          size="md"
          className="w-full"
          icon={<IconLogIn aria-hidden className="h-btn-md-icon w-auto" />}
        >
          Passwort speichern
        </Button>
      </form>
    </CheckoutBlock>
  )
}
