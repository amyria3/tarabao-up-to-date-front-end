'use client'

import * as React from 'react'

import { CheckboxField } from '@modules/checkout/components/checkbox-field'
import { CheckoutBlock, CheckoutHeadline } from '@modules/checkout/components/checkout-block'
import { WelcomeDataset } from '@modules/checkout/components/welcome-dataset'
import { FormField } from '@/components/ui/form-field'
import { DefaultParagraph, InlineQuestion } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'

const NEWSLETTER =
  'In unserem Newsletter schreiben wir über neue Produkte, informieren über befristete Aktionen und teilen unsere Lieblingsrezepte oder erzählen über unsere Partnerschaften.'
const ADS =
  'Erteilst Du uns die Erlaubnis, Dir personalisierte Werbung zu schicken, wie beispielsweise einen Gutschein zu Deinem Geburtstag oder Empfehlungen auf Grundlage Deiner Einkäufe?'

export type IdentificationResult = {
  email: string
  password?: string
  newsletter: boolean
  personalizedAds: boolean
}

export interface CheckoutIdentificationProps {
  /** Figma Variant=Guest | ReturningCustomer (LogIn?=True) */
  variant?: 'guest' | 'returning'
  /** Figma State=Completed: WelcomeDataset statt Formular */
  completed?: { name?: string; email: string }
  /** Figma State=Error: Hinweis am Passwortfeld */
  error?: string
  defaultEmail?: string
  onVariantChange?: (variant: 'guest' | 'returning') => void
  onSubmit?: (result: IdentificationResult) => void
  onEdit?: () => void
  onForgotPassword?: () => void
  className?: string
}

/**
 * Figma: Components / Checkout / Identification (6617:16895) · Variant=Guest|ReturningCustomer,
 * State=Initial|Filled|Error|Completed. Titel „Wer gibt die Bestellung auf?“, E-Mail, beim
 * Anmelden Passwort und „Passwort vergessen? · Hier clicken“, zwei Einwilligungen (CheckBox +
 * DefaultParagraph MD) und Buttons / MD / PrimaryButton („Weiter zum Versand“ bzw. „Anmelden“).
 * Anmelden bietet darunter „Ohne Anmeldung als Gast bezahlen?“ mit SecondaryButton „Als Gast einkaufen“.
 */
export function CheckoutIdentification({
  variant = 'guest',
  completed,
  error,
  defaultEmail,
  onVariantChange,
  onSubmit,
  onEdit,
  onForgotPassword,
  className,
}: CheckoutIdentificationProps) {
  const [newsletter, setNewsletter] = React.useState(false)
  const [ads, setAds] = React.useState(false)
  if (completed) {
    return (
      <CheckoutBlock className={className} aria-label="Bestellerin oder Besteller">
        <WelcomeDataset name={completed.name} email={completed.email} onEdit={onEdit} />
      </CheckoutBlock>
    )
  }
  const returning = variant === 'returning'
  return (
    <CheckoutBlock className={className} aria-labelledby="checkout-identification-title">
      <form
        className="flex w-full flex-col gap-md"
        onSubmit={(event) => {
          event.preventDefault()
          const data = new FormData(event.currentTarget)
          onSubmit?.({
            email: String(data.get('email') ?? ''),
            password: returning ? String(data.get('password') ?? '') : undefined,
            newsletter,
            personalizedAds: ads,
          })
        }}
      >
        <CheckoutHeadline id="checkout-identification-title">Wer gibt die Bestellung auf?</CheckoutHeadline>
        <FormField label="E-Mail" name="email" type="email" autoComplete="email" required defaultValue={defaultEmail} />
        {returning ? (
          <>
            <FormField
              label="Passwort"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              remoteError={error}
            />
            <InlineQuestion question="Passwort vergessen?" action="Hier clicken" onAction={onForgotPassword} />
          </>
        ) : (
          <InlineQuestion
            question="Hast Du schon einen Account?"
            action="Anmelden"
            onAction={() => onVariantChange?.('returning')}
          />
        )}
        <CheckboxField label={NEWSLETTER} checked={newsletter} onCheckedChange={(c) => setNewsletter(c === true)} />
        <CheckboxField label={ADS} checked={ads} onCheckedChange={(c) => setAds(c === true)} />
        {returning ? (
          <div className="flex w-full flex-col gap-md">
            <Button type="submit" intent="primary" size="md" className="w-full">
              Anmelden
            </Button>
            <div className="flex w-full flex-col gap-0.5">
              <DefaultParagraph size="md">Ohne Anmeldung als Gast bezahlen?</DefaultParagraph>
              <Button intent="secondary" size="md" className="w-full" onClick={() => onVariantChange?.('guest')}>
                Als Gast einkaufen
              </Button>
            </div>
          </div>
        ) : (
          <Button type="submit" intent="primary" size="md" className="w-full">
            Weiter zum Versand
          </Button>
        )}
      </form>
    </CheckoutBlock>
  )
}
