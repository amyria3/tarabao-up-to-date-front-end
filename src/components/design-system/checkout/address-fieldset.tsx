'use client'

import * as React from 'react'

import { AddressSearch, type AddressSuggestion } from '@/components/design-system/checkout/address-search'
import { CheckboxField } from '@/components/design-system/checkout/checkbox-field'
import { FormField } from '@/components/design-system/inputs/form-field'
import { Button } from '@/components/ui/button'
import type { AddressModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type AddressDraft = Partial<AddressModel> & { save?: boolean; search?: string; country?: string }

export interface AddressFieldsetProps {
  /** Figma Variant=Delivery (Lieferadresse) | Pickup (Abholung) */
  variant?: 'delivery' | 'pickup'
  value?: AddressDraft
  defaultValue?: AddressDraft
  onValueChange?: (value: AddressDraft) => void
  /** Figma Enter address manually?=True */
  defaultManual?: boolean
  /** Pickup: Suche nach Abholstellen */
  onSearchPickup?: (postalCode: string) => void
  /** Delivery: Vorschläge der Adresssuche (Components / Checkout / AddressSearch) */
  suggestions?: AddressSuggestion[]
  /** Figma State=Missing der Adresssuche */
  searchError?: string
  /** Länder für das Feld „Land“ der manuellen Eingabe (Variante 9695:31743) */
  countries?: { value: string; label: string }[]
  legend?: string
  className?: string
}

const SHORT_NAME = 'Hast Du Dich vertippt oder ist Dein Name besonders kurz?'
const DEFAULT_COUNTRIES = [{ value: 'DE', label: 'Deutschland' }]

/**
 * Figma: Components / Checkout / AddressFieldset (3685:13778). Spalte gap-md aus Input / Component:
 * Vorname, Nachname (bei sehr kurzem Nachnamen die Warnung „Hast Du Dich vertippt …“).
 * Delivery: Components / Checkout / AddressSearch („Adressdaten suchen“ mit „Adresse manuell
 * eingeben?“); manuell (Variante 9695:31743): Adresszeile 1 und 2, Postleitzahl (112 px) + Stadt,
 * Land (Input / Field Type=Select), Telefonnummer, CheckBox „Adresse für später speichern“. Pickup: Vorname, Nachname,
 * Telefonnummer, Postleitzahl und „Abholstelle suchen“.
 */
export function AddressFieldset({
  variant = 'delivery',
  value: controlled,
  defaultValue = {},
  onValueChange,
  defaultManual = false,
  onSearchPickup,
  suggestions,
  searchError,
  countries = DEFAULT_COUNTRIES,
  legend,
  className,
}: AddressFieldsetProps) {
  const [inner, setInner] = React.useState<AddressDraft>(defaultValue)
  const value = controlled ?? inner
  const set = (patch: AddressDraft) => {
    const next = { ...value, ...patch }
    if (controlled === undefined) setInner(next)
    onValueChange?.(next)
  }
  const [manual, setManual] = React.useState(defaultManual || Boolean(value.address1))
  const lastName = value.lastName ?? ''
  const field = (key: keyof AddressModel) => ({
    value: (value[key] as string | undefined) ?? '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set({ [key]: e.target.value }),
  })
  return (
    <fieldset data-slot="address-fieldset" className={cn('flex w-full min-w-zero flex-col gap-md', className)}>
      {legend ? <legend className="sr-only">{legend}</legend> : null}
      <FormField label="Vorname" name="firstName" autoComplete="given-name" required {...field('firstName')} />
      <FormField
        label="Nachname"
        name="lastName"
        autoComplete="family-name"
        required
        {...field('lastName')}
        warning={lastName.length > 0 && lastName.length < 3 ? SHORT_NAME : undefined}
      />
      {variant === 'pickup' ? (
        <>
          <FormField label="Telefonnummer" name="phone" type="tel" autoComplete="tel" required {...field('phone')} />
          <FormField
            label="Postleitzahl"
            name="postalCode"
            inputMode="numeric"
            autoComplete="postal-code"
            required
            {...field('postalCode')}
            action={
              <Button
                intent="inline"
                size="xxs"
                disabled={!value.postalCode}
                onClick={() => onSearchPickup?.(value.postalCode ?? '')}
              >
                Abholstelle suchen
              </Button>
            }
          />
        </>
      ) : manual ? (
        <>
          <FormField
            label="Adresszeile 1"
            name="address1"
            autoComplete="address-line1"
            required
            {...field('address1')}
          />
          <FormField label="Adresszeile 2" name="address2" autoComplete="address-line2" {...field('address2')} />
          <div className="flex w-full flex-wrap gap-md-sm">
            <FormField
              label="Postleitzahl"
              name="postalCode"
              inputMode="numeric"
              autoComplete="postal-code"
              required
              className="w-28"
              {...field('postalCode')}
            />
            <FormField
              label="Stadt"
              name="city"
              autoComplete="address-level2"
              required
              className="w-auto min-w-40 flex-1"
              {...field('city')}
            />
          </div>
          <FormField
            label="Land"
            name="country"
            type="select"
            autoComplete="country"
            required
            options={countries}
            value={value.country ?? countries[0]?.value ?? ''}
            onChange={(e) => set({ country: e.target.value })}
          />
          <FormField label="Telefonnummer" name="phone" type="tel" autoComplete="tel" required {...field('phone')} />
          <CheckboxField
            gap="sm"
            label="Adresse für später speichern"
            checked={value.save ?? true}
            onCheckedChange={(checked) => set({ save: checked === true })}
          />
        </>
      ) : (
        <AddressSearch
          value={value.search ?? ''}
          onValueChange={(search) => set({ search })}
          suggestions={suggestions}
          error={searchError}
          onSelect={(s) => {
            setManual(true)
            set({ search: s.address1, address1: s.address1 })
          }}
          onManualEntry={() => setManual(true)}
        />
      )}
    </fieldset>
  )
}
