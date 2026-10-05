'use client'

import * as React from 'react'

import { AddressFieldset, type AddressDraft } from '@modules/checkout/components/address-fieldset'
import { CheckoutBlock } from '@modules/checkout/components/checkout-block'
import { DeliveryMethodRadioGroup } from '@modules/checkout/components/delivery-method-radio-group'
import { SummaryDataset } from '@modules/checkout/components/summary-dataset'
import { addressLines } from '@/lib/checkout/address'
import { RadioField } from '@/components/ui/radio-field'
import { SwitchToggleGroup } from '@/components/ui/switch-toggle-group'
import { Button } from '@/components/ui/button'
import type { AddressModel, PickupPointModel, ShippingOptionModel } from '@/lib/view-models'

export type DeliveryMode = 'delivery' | 'pickup'

export interface CheckoutDeliveryProps {
  shippingOptions: ShippingOptionModel[]
  pickupPoints?: PickupPointModel[]
  /** Figma Delivery Address complete?=True: Adresse als SummaryDataset, danach die Versandart */
  address?: AddressModel
  /** Figma Shipping Method Complete?=True: auch die Versandart als SummaryDataset */
  shippingOptionId?: string
  defaultMode?: DeliveryMode
  defaultDraft?: AddressDraft
  onSubmitAddress?: (draft: AddressDraft, mode: DeliveryMode) => void
  onSubmitMethod?: (optionId: string) => void
  onEditAddress?: () => void
  onEditMethod?: () => void
  className?: string
}

/**
 * Figma: Components / Checkout / DeliveryAddress (3674:12341) · Variant=Delivery|Pickup|Both,
 * Delivery Address complete?, Shipping Method Complete?, Editing Shipping Address?.
 * Bearbeiten: Switches / ToggleGroup „Lieferung | Abholung“, AddressFieldset, bei Abholung die
 * Abholstellen (RadioButtonGroup, Plain Text) und „Weiter zur Bezahlung“.
 * Adresse fertig: SummaryDataset „Versand an:“, DeliveryMethodRadioGroup, „Weiter zur Bezahlung“.
 * Beides fertig: SummaryDataset „Versand an:“ und „Versandart:“.
 */
export function CheckoutDelivery({
  shippingOptions,
  pickupPoints = [],
  address,
  shippingOptionId,
  defaultMode = 'delivery',
  defaultDraft,
  onSubmitAddress,
  onSubmitMethod,
  onEditAddress,
  onEditMethod,
  className,
}: CheckoutDeliveryProps) {
  const [mode, setMode] = React.useState<DeliveryMode>(defaultMode)
  const [draft, setDraft] = React.useState<AddressDraft>(defaultDraft ?? {})
  const [pickup, setPickup] = React.useState(pickupPoints[0]?.id)
  const [method, setMethod] = React.useState(shippingOptions[0]?.id ?? '')
  const [searched, setSearched] = React.useState(false)

  if (address && shippingOptionId) {
    const option = shippingOptions.find((o) => o.id === shippingOptionId)
    return (
      <CheckoutBlock gap="xl" className={className} aria-label="Versand">
        <SummaryDataset label="Versand an:" lines={addressLines(address)} onEdit={onEditAddress} />
        <SummaryDataset label="Versandart:" lines={[[option?.label ?? shippingOptionId]]} onEdit={onEditMethod} />
      </CheckoutBlock>
    )
  }
  if (address) {
    return (
      <CheckoutBlock gap="xl" className={className} aria-label="Versand">
        <SummaryDataset label="Versand an:" lines={addressLines(address)} onEdit={onEditAddress} />
        <div className="flex w-full flex-col gap-md-l">
          <DeliveryMethodRadioGroup options={shippingOptions} value={method} onValueChange={setMethod} />
          <Button intent="primary" size="md" className="w-full" onClick={() => onSubmitMethod?.(method)}>
            Weiter zur Bezahlung
          </Button>
        </div>
      </CheckoutBlock>
    )
  }
  return (
    <CheckoutBlock gap="xl" className={className} aria-label="Versand">
      <form
        className="flex w-full flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmitAddress?.(mode === 'pickup' ? { ...draft, address1: pickup } : draft, mode)
        }}
      >
        <SwitchToggleGroup
          aria-label="Lieferung oder Abholung"
          options={[
            { value: 'delivery', label: 'Lieferung' },
            { value: 'pickup', label: 'Abholung' },
          ]}
          value={mode}
          onValueChange={(v) => setMode(v as DeliveryMode)}
        />
        <AddressFieldset
          variant={mode}
          value={draft}
          onValueChange={setDraft}
          legend={mode === 'pickup' ? 'Abholung' : 'Lieferadresse'}
          onSearchPickup={() => setSearched(true)}
        />
        {mode === 'pickup' && searched && pickupPoints.length > 0 ? (
          <RadioField
            aria-label="Abholstelle"
            value={pickup}
            onValueChange={setPickup}
            className="gap-md-l"
            options={pickupPoints.map((p) => ({ value: p.id, label: p.name, description: p.addressLabel }))}
          />
        ) : null}
        <Button type="submit" intent="primary" size="md" className="w-full">
          Weiter zur Bezahlung
        </Button>
      </form>
    </CheckoutBlock>
  )
}
