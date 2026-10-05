import { AddressFieldset } from '@modules/checkout/components/address-fieldset'
import { CheckoutContact } from '@modules/checkout/components/checkout-contact'
import { CheckoutDelivery } from '@modules/checkout/components/checkout-delivery'
import { CheckoutIdentification } from '@modules/checkout/components/checkout-identification'
import { CheckoutPayment } from '@modules/checkout/components/checkout-payment'
import { DeliveryMethodRadioGroup } from '@modules/checkout/components/delivery-method-radio-group'
import { FinalCheckout } from '@modules/checkout/components/final-checkout'
import { OrderConfirmation } from '@modules/order/components/order-confirmation'
import { SummaryDataset } from '@modules/checkout/components/summary-dataset'
import { addressLines } from '@/lib/checkout/address'
import { VoucherList } from '@modules/checkout/components/voucher-list'
import { WelcomeDataset } from '@modules/checkout/components/welcome-dataset'
import {
  ADDRESS,
  CART,
  CUSTOMER,
  PAYMENT_METHODS,
  PICKUP_POINTS,
  SHIPPING_OPTIONS,
  VALID_VOUCHERS,
} from '@/lib/fixtures'
import { Specimen } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const grid = 'grid w-full grid-cols-1 items-start gap-md lg:grid-cols-2'

export const checkoutEntries: LibraryEntry[] = [
  {
    id: 'components-checkout-identification',
    figma: 'Components / Checkout / Identification',
    nodeId: '6617:16895',
    code: '<CheckoutIdentification variant="guest" onSubmit={…} />',
    note: '„Anmelden“ bzw. „Als Gast einkaufen“ melden den Wechsel über onVariantChange; die Seite hält den Zustand.',
    render: () => (
      <div className={grid}>
        <Specimen label="Variant=Guest, State=Initial">
          <CheckoutIdentification />
        </Specimen>
        <Specimen label="Variant=ReturningCustomer, State=Error">
          <CheckoutIdentification variant="returning" defaultEmail={CUSTOMER.email} error="Hast Du ein Passwort?" />
        </Specimen>
        <Specimen label="Variant=ReturningCustomer, State=Completed">
          <CheckoutIdentification completed={{ name: CUSTOMER.firstName, email: CUSTOMER.email }} />
        </Specimen>
        <Specimen label="Variant=Guest, State=Completed">
          <CheckoutIdentification completed={{ email: CUSTOMER.email }} />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-checkout-address-fieldset',
    figma: 'Components / Checkout / AddressFieldset',
    nodeId: '3685:13778',
    code: '<AddressFieldset variant="delivery" value={draft} onValueChange={setDraft} />',
    note: 'Nachname kürzer als 3 Zeichen zeigt die Warnung aus Figma („Hast Du Dich vertippt …“).',
    render: () => (
      <div className={grid}>
        <Specimen label="Variant=Delivery · Suche">
          <AddressFieldset />
        </Specimen>
        <Specimen label="Variant=Delivery · manuell, befüllt">
          <AddressFieldset defaultValue={{ ...ADDRESS, lastName: 'W' }} />
        </Specimen>
        <Specimen label="Variant=Pickup">
          <AddressFieldset variant="pickup" />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-checkout-delivery',
    figma: 'Components / Checkout / DeliveryAddress · DeliveryMethodRadioGroup',
    nodeId: '3674:12341',
    code: '<CheckoutDelivery shippingOptions={options} address={address} />',
    render: () => (
      <div className={grid}>
        <Specimen label="Editing Shipping Address?=True">
          <CheckoutDelivery shippingOptions={SHIPPING_OPTIONS} pickupPoints={PICKUP_POINTS} />
        </Specimen>
        <Specimen label="Delivery Address complete?=True">
          <CheckoutDelivery shippingOptions={SHIPPING_OPTIONS} address={ADDRESS} />
        </Specimen>
        <Specimen label="Shipping Method Complete?=True">
          <CheckoutDelivery shippingOptions={SHIPPING_OPTIONS} address={ADDRESS} shippingOptionId="standard" />
        </Specimen>
        <Specimen label="DeliveryMethodRadioGroup">
          <DeliveryMethodRadioGroup options={SHIPPING_OPTIONS} />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-checkout-payment',
    figma: 'Components / Checkout / Payment · ShippingAddressFormRadioButton',
    nodeId: '3773:14405',
    code: '<CheckoutPayment shippingAddress={address} paymentMethods={methods} />',
    render: () => (
      <div className={grid}>
        <Specimen label="Payment address equal to shipping address?=True">
          <CheckoutPayment shippingAddress={ADDRESS} paymentMethods={PAYMENT_METHODS} />
        </Specimen>
        <Specimen label="New invoice address complete?=True">
          <CheckoutPayment shippingAddress={ADDRESS} paymentMethods={PAYMENT_METHODS} billingAddress={ADDRESS} />
        </Specimen>
        <Specimen label="Payment method selected?=True">
          <CheckoutPayment
            shippingAddress={ADDRESS}
            paymentMethods={PAYMENT_METHODS}
            billingAddress={ADDRESS}
            paymentMethodId="paypal"
          />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-checkout-summary-dataset',
    figma: 'Components / Checkout / SummaryDataset · WelcomeDataset · VoucherUIPattern',
    nodeId: '3773:11559',
    code: '<SummaryDataset label="Versand an:" lines={addressLines(address)} onEdit={…} />',
    render: () => (
      <div className={grid}>
        <Specimen label="Lieferadresse?=True">
          <SummaryDataset label="Versand an:" lines={addressLines(ADDRESS)} />
        </Specimen>
        <Specimen label="Rechnungsadresse?=True">
          <SummaryDataset label="Rechnung an:" lines={addressLines(ADDRESS, true)} />
        </Specimen>
        <Specimen label="E-Mail?=True · Versandmethode?=True · Zahlungsmethode?=True">
          <div className="flex w-full flex-col gap-md">
            <SummaryDataset label="E-Mail:" lines={[[CUSTOMER.email]]} />
            <SummaryDataset label="Versandart:" lines={[['Standardversand']]} />
            <SummaryDataset label="Zahlen mit:" lines={[['PayPal']]} />
          </div>
        </Specimen>
        <Specimen label="WelcomeDataset · Logged In?=True">
          <WelcomeDataset name={CUSTOMER.firstName} email={CUSTOMER.email} />
        </Specimen>
        <Specimen label="VoucherUIPattern">
          <VoucherList codes={VALID_VOUCHERS} />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-checkout-final',
    figma: 'Components / Checkout / FinalCheckout · OrderConfirmation · Contact',
    nodeId: '3807:19305',
    code: '<FinalCheckout cart={cart} paymentLabel="PayPal" onPlaceOrder={…} />',
    render: () => (
      <div className={grid}>
        <Specimen label="FinalCheckout · Variant=Delivery">
          <FinalCheckout cart={CART} />
        </Specimen>
        <div className="flex flex-col gap-md">
          <Specimen label="OrderConfirmation">
            <OrderConfirmation deliveryDateLabel="10.11.2025" />
          </Specimen>
          <Specimen label="Contact">
            <CheckoutContact />
          </Specimen>
        </div>
      </div>
    ),
  },
]
