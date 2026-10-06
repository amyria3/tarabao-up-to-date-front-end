'use client'

import * as React from 'react'

import { AccountSummaryItem } from '@modules/account/components/account-data-block'
import { FormField } from '@/components/ui/form-field'
import { addressLines } from '@/lib/checkout/address'
import type { AddressModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

const DEFAULT_COUNTRIES = [{ value: 'DE', label: 'Deutschland' }]

/** Teilt „Berliner Str. 01“ in Straße und Hausnummer (Figma zeigt zwei Felder). */
export function splitStreet(address1: string): { street: string; houseNumber: string } {
  const match = address1.match(/^(.*\S)\s+(\d[\w/-]*)$/)
  return match ? { street: match[1]!, houseNumber: match[2]! } : { street: address1, houseNumber: '' }
}

type AddressEditorDraft = {
  country: string
  firstName: string
  lastName: string
  street: string
  houseNumber: string
  postalCode: string
  city: string
  phone: string
}

export interface AccountAddressEditorProps {
  defaultValue: AddressModel
  /** Figma Adresse 2?=True: Feld „Land“ steht oben. */
  withCountry?: boolean
  countries?: { value: string; label: string }[]
  legend?: string
  className?: string
}

/**
 * Figma: Components / Account / SummaryItem · Addresse 1?=True bzw. Adresse 2?=True, Editing?=True
 * (9695:31833, 9695:31896). Spalte gap-md-sm aus Input / Field: [Land], Vorname, Nachname, Straße,
 * Hausnummer, Postleitzahl, Stadt, Telefonnummer, alle über die volle Breite.
 */
export function AccountAddressEditor({
  defaultValue,
  withCountry = false,
  countries = DEFAULT_COUNTRIES,
  legend,
  className,
}: AccountAddressEditorProps) {
  const [draft, setDraft] = React.useState<AddressEditorDraft>(() => {
    const { street, houseNumber } = splitStreet(defaultValue.address1)
    const country = countries.find((c) => c.label === defaultValue.countryLabel)?.value ?? countries[0]?.value ?? ''
    return {
      country,
      firstName: defaultValue.firstName,
      lastName: defaultValue.lastName,
      street,
      houseNumber,
      postalCode: defaultValue.postalCode,
      city: defaultValue.city,
      phone: defaultValue.phone ?? '',
    }
  })
  const field = (key: keyof AddressEditorDraft) => ({
    value: draft[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDraft((d) => ({ ...d, [key]: e.target.value })),
  })
  return (
    <fieldset data-slot="account-address-editor" className={cn('flex w-full min-w-zero flex-col gap-md-sm', className)}>
      {legend ? <legend className="sr-only">{legend}</legend> : null}
      {withCountry ? (
        <FormField
          label="Land"
          name="country"
          type="select"
          autoComplete="country"
          required
          options={countries}
          {...field('country')}
        />
      ) : null}
      <FormField label="Vorname" name="firstName" autoComplete="given-name" required {...field('firstName')} />
      <FormField label="Nachname" name="lastName" autoComplete="family-name" required {...field('lastName')} />
      <FormField label="Straße" name="street" autoComplete="address-line1" required {...field('street')} />
      <FormField label="Hausnummer" name="houseNumber" {...field('houseNumber')} />
      <FormField
        label="Postleitzahl"
        name="postalCode"
        inputMode="numeric"
        autoComplete="postal-code"
        required
        {...field('postalCode')}
      />
      <FormField label="Stadt" name="city" autoComplete="address-level2" required {...field('city')} />
      <FormField label="Telefonnummer" name="phone" type="tel" autoComplete="tel" required {...field('phone')} />
    </fieldset>
  )
}

export type PaymentMethodDraft = { brand: string; number: string; expiry: string }

const PAYMENT_BRANDS = [
  { value: 'visa', label: 'Visa' },
  { value: 'mastercard', label: 'Mastercard' },
]

export interface AccountPaymentEditorProps {
  defaultValue: PaymentMethodDraft
  brands?: { value: string; label: string }[]
  legend?: string
  className?: string
}

/**
 * Figma: Components / Account / SummaryItem · Zahlungsmethode 1?=True, Editing?=True (9695:31969).
 * Spalte gap-md-sm: Zahlungsart (Select), Kartennummer, Gültig bis.
 */
export function AccountPaymentEditor({
  defaultValue,
  brands = PAYMENT_BRANDS,
  legend,
  className,
}: AccountPaymentEditorProps) {
  const [draft, setDraft] = React.useState<PaymentMethodDraft>(defaultValue)
  const field = (key: keyof PaymentMethodDraft) => ({
    value: draft[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDraft((d) => ({ ...d, [key]: e.target.value })),
  })
  return (
    <fieldset data-slot="account-payment-editor" className={cn('flex w-full min-w-zero flex-col gap-md-sm', className)}>
      {legend ? <legend className="sr-only">{legend}</legend> : null}
      <FormField label="Zahlungsart" name="brand" type="select" required options={brands} {...field('brand')} />
      <FormField
        label="Kartennummer"
        name="cardNumber"
        inputMode="numeric"
        autoComplete="cc-number"
        required
        {...field('number')}
      />
      <FormField label="Gültig bis" name="expiry" autoComplete="cc-exp" required {...field('expiry')} />
    </fieldset>
  )
}

/** Liest die Felder von AccountAddressEditor aus dem FormData von „Speichern“. */
export function addressFromForm(
  data: FormData,
  previous: AddressModel,
  countries: { value: string; label: string }[] = DEFAULT_COUNTRIES,
): AddressModel {
  const text = (key: string, fallback = '') => {
    const value = data.get(key)
    return typeof value === 'string' ? value.trim() : fallback
  }
  const street = text('street')
  const houseNumber = text('houseNumber')
  const country = data.get('country')
  return {
    ...previous,
    firstName: text('firstName'),
    lastName: text('lastName'),
    address1: [street, houseNumber].filter(Boolean).join(' '),
    postalCode: text('postalCode'),
    city: text('city'),
    phone: text('phone'),
    countryLabel:
      typeof country === 'string'
        ? (countries.find((c) => c.value === country)?.label ?? previous.countryLabel)
        : previous.countryLabel,
  }
}

export interface AccountAddressItemProps {
  /** z. B. „Adresse 1:“ */
  label: string
  address: AddressModel
  /** Figma Adresse 2?=True: Land in Zeile 1 und als erstes Feld. */
  withCountry?: boolean
  className?: string
}

/**
 * Adresse im Account (Figma SummaryItem · Addresse 1? / Adresse 2?): „Korrigieren“ öffnet
 * AccountAddressEditor, „Speichern“ übernimmt die Eingaben in die Anzeige, „Löschen“ blendet aus.
 */
export function AccountAddressItem({
  label,
  address: initial,
  withCountry = false,
  className,
}: AccountAddressItemProps) {
  const [address, setAddress] = React.useState(initial)
  return (
    <AccountSummaryItem
      label={label}
      lines={addressLines(address, withCountry)}
      editor={
        <AccountAddressEditor defaultValue={address} withCountry={withCountry} legend={label.replace(/:$/, '')} />
      }
      onSave={(data) => setAddress((prev) => addressFromForm(data, prev))}
      deletable
      className={className}
    />
  )
}

/** Liest die Felder von AccountPaymentEditor aus dem FormData von „Speichern“. */
export function paymentFromForm(data: FormData, previous: PaymentMethodDraft): PaymentMethodDraft {
  const text = (key: string, fallback: string) => {
    const value = data.get(key)
    return typeof value === 'string' && value.trim() ? value.trim() : fallback
  }
  return {
    brand: text('brand', previous.brand),
    number: text('cardNumber', previous.number),
    expiry: text('expiry', previous.expiry),
  }
}

export interface AccountPaymentItemProps {
  /** z. B. „Zahlungsart 1:“ */
  label: string
  payment: PaymentMethodDraft
  brands?: { value: string; label: string }[]
  className?: string
}

/**
 * Zahlungsart im Account (Figma SummaryItem · Zahlungsmethode 1?): Zeile „Visa ****1234“,
 * Hinweis „Expires 06/2027“; „Korrigieren“ öffnet AccountPaymentEditor, „Speichern“ übernimmt.
 */
export function AccountPaymentItem({
  label,
  payment: initial,
  brands = PAYMENT_BRANDS,
  className,
}: AccountPaymentItemProps) {
  const [payment, setPayment] = React.useState(initial)
  const brandLabel = brands.find((b) => b.value === payment.brand)?.label ?? payment.brand
  const last4 = payment.number.replace(/\D/g, '').slice(-4)
  return (
    <AccountSummaryItem
      label={label}
      lines={[[`${brandLabel} ****${last4}`]]}
      note={`Expires ${payment.expiry}`}
      editor={<AccountPaymentEditor defaultValue={payment} brands={brands} legend={label.replace(/:$/, '')} />}
      onSave={(data) => setPayment((prev) => paymentFromForm(data, prev))}
      deletable
      className={className}
    />
  )
}
