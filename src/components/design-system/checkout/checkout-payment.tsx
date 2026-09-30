'use client'

import * as React from 'react'

import { AddressFieldset, type AddressDraft } from '@/components/design-system/checkout/address-fieldset'
import { CheckoutBlock, CheckoutHeadline } from '@/components/design-system/checkout/checkout-block'
import { SummaryDataset } from '@/components/design-system/checkout/summary-dataset'
import { addressLines } from '@/lib/checkout/address'
import { InputField } from '@/components/design-system/inputs/input-field'
import { RadioField } from '@/components/design-system/switches/radio'
import { Button } from '@/components/ui/button'
import type { AddressModel, PaymentMethodModel } from '@/lib/view-models'

export interface CheckoutPaymentProps {
  shippingAddress: AddressModel
  paymentMethods: PaymentMethodModel[]
  countries?: { value: string; label: string }[]
  /** Figma New invoice address complete?=True: Rechnungsadresse steht fest, es folgen die Zahlarten */
  billingAddress?: AddressModel
  /** Figma Payment method selected?=True: alles als SummaryDataset */
  paymentMethodId?: string
  onSubmitBilling?: (billing: { sameAsShipping: boolean; draft?: AddressDraft; country: string }) => void
  onSubmitMethod?: (methodId: string) => void
  onEditBilling?: () => void
  onEditMethod?: () => void
  className?: string
}

/**
 * Figma: Components / Checkout / Payment (3773:14405) mit ShippingAddressFormRadioButton (3782:14948).
 * „Zahlung“ (MainHeadline), Input / Component „Land“, Auswahl „Wie Versandadresse“
 * (RadioButtonGroup · Address) oder „Rechnung an eine andere Adresse“ (öffnet AddressFieldset),
 * „Weiter zur Bezahlung“. Danach SummaryDataset „Rechnung an:“ und die Zahlarten
 * (RadioButtonGroup, gap-5) mit „Bestellung prüfen“; zuletzt „Rechnung an:“ und „Zahlen mit:“.
 */
export function CheckoutPayment({
  shippingAddress,
  paymentMethods,
  countries = [{ value: 'DE', label: 'Deutschland' }],
  billingAddress,
  paymentMethodId,
  onSubmitBilling,
  onSubmitMethod,
  onEditBilling,
  onEditMethod,
  className,
}: CheckoutPaymentProps) {
  const [same, setSame] = React.useState<'same' | 'other'>('same')
  const [draft, setDraft] = React.useState<AddressDraft>({})
  const [country, setCountry] = React.useState(countries[0]?.value ?? 'DE')
  const [method, setMethod] = React.useState(paymentMethods[0]?.id ?? '')

  if (billingAddress && paymentMethodId) {
    const m = paymentMethods.find((p) => p.id === paymentMethodId)
    return (
      <CheckoutBlock gap="xl" className={className} aria-label="Zahlung">
        <SummaryDataset label="Rechnung an:" lines={addressLines(billingAddress, true)} onEdit={onEditBilling} />
        <SummaryDataset label="Zahlen mit:" lines={[[m?.label ?? paymentMethodId]]} onEdit={onEditMethod} />
      </CheckoutBlock>
    )
  }
  if (billingAddress) {
    return (
      <CheckoutBlock gap="xl" className={className} aria-labelledby="checkout-payment-title">
        <CheckoutHeadline id="checkout-payment-title">Zahlung</CheckoutHeadline>
        <SummaryDataset label="Rechnung an:" lines={addressLines(billingAddress, true)} onEdit={onEditBilling} />
        <RadioField
          aria-label="Zahlart"
          value={method}
          onValueChange={setMethod}
          className="gap-5"
          options={paymentMethods.map((p) => ({ value: p.id, label: p.label, description: p.description }))}
        />
        <Button intent="primary" size="md" className="w-full" onClick={() => onSubmitMethod?.(method)}>
          Bestellung prüfen
        </Button>
      </CheckoutBlock>
    )
  }
  return (
    <CheckoutBlock gap="xl" className={className} aria-labelledby="checkout-payment-title">
      <CheckoutHeadline id="checkout-payment-title">Zahlung</CheckoutHeadline>
      <InputField
        type="select"
        label="Land"
        name="country"
        required
        options={countries}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <RadioField
        aria-label="Rechnungsadresse"
        value={same}
        onValueChange={(v) => setSame(v as 'same' | 'other')}
        className="gap-md-l"
        options={[
          {
            value: 'same',
            label: 'Wie Versandadresse',
            children: (
              <div className="flex flex-col type-data-blocks-summary-item-content text-content-text">
                {addressLines(shippingAddress).map((parts, i) => (
                  <p key={i} className="flex flex-wrap gap-x-sm">
                    {parts.map((p, j) => (
                      <span key={j}>{p}</span>
                    ))}
                  </p>
                ))}
              </div>
            ),
          },
          {
            value: 'other',
            label: 'Rechnung an eine andere Adresse',
            childrenWhenSelected: true,
            children: <AddressFieldset value={draft} onValueChange={setDraft} legend="Rechnungsadresse" />,
          },
        ]}
      />
      <Button
        intent="primary"
        size="md"
        className="w-full"
        onClick={() =>
          onSubmitBilling?.({ sameAsShipping: same === 'same', draft: same === 'other' ? draft : undefined, country })
        }
      >
        Weiter zur Bezahlung
      </Button>
    </CheckoutBlock>
  )
}
