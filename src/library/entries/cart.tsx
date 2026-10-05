import { AddToBasketMobile } from '@modules/products/components/add-to-basket-mobile'
import { AddedToCartMessage } from '@modules/common/components/added-to-cart-overlay/added-to-cart-message'
import { CartCalculation } from '@modules/cart/components/cart-calculation'
import { CartLogIn } from '@modules/cart/components/cart-login'
import { CartLoginPrompt } from '@modules/cart/components/cart-login-prompt'
import { CartMessage } from '@modules/cart/components/cart-message'
import { CartPage, CheckoutCartOverview } from '@modules/cart/templates/cart-page'
import { CartProductItem } from '@modules/cart/components/cart-product-item'
import { CartSummary } from '@modules/cart/components/cart-summary'
import { VoucherInput } from '@modules/cart/components/voucher-input'
import { CART, EMPTY_CART, PRODUCTS } from '@/lib/fixtures'
import { Specimen, ThemeMatrix } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const VOUCHER_NOTE =
  'Es ist Ostern, und weil Alica und Julia aus unserem Marketing-Team so gern Marmelade kochen, packen wir Dir ab einem Einkaufswert von 70,- gern ein Mehrwegglas als kleines Geschenk ein :)'
const MESSAGE = 'Schön, dass Du wieder vorbeikommst! Wir haben *** Gutschein für Dich :)'

export const cartEntries: LibraryEntry[] = [
  {
    id: 'components-cart-product-item',
    figma: 'Components / Cart / ProductItem',
    nodeId: '3280:9437',
    code: '<CartProductItem item={item} onQuantityChange={…} onRemove={…} onSubscriptionChange={…} />',
    note: 'Buttons / Counter zählt 1 bis 9, Switches / MegaSwitch / XXSM wechselt die Bestellart. Editable?=False kürzt unter md die Zeile „Menge und Preis“ per Truncate (viewport-range=base).',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Editable?=True · im Abo">
              <CartProductItem item={CART.items[0]!} />
            </Specimen>
            <Specimen label="Editable?=True · einmal bestellen">
              <CartProductItem item={CART.items[1]!} />
            </Specimen>
            <Specimen label="Editable?=False">
              <CartProductItem item={CART.items[1]!} editable={false} />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'components-cart-calculation',
    figma: 'Components / Cart / Calculation',
    nodeId: '2260:4084',
    code: '<CartCalculation totals={cart.totals} />',
    note: 'Figma zeigt 0 € und blendet Beispielwerte aus; die Bibliothek zeigt die ausgeblendeten Werte.',
    render: () => <ThemeMatrix columns={2}>{() => <CartCalculation totals={CART.totals} />}</ThemeMatrix>,
  },
  {
    id: 'components-cart-summary',
    figma: 'Components / Cart / Summary',
    nodeId: '3307:5882',
    code: '<CartSummary cart={cart} onSubscriptionChange={…} />',
    note: 'Zwei Blöcke nach Bestellart in einer Wrap-Reihe: „Wiederkehrende Lieferungen“ (mit Hinweis) und „Einmalige Lieferungen“. Ein Block existiert nur mit Artikeln seiner Bestellart; der Schalter am Artikel verschiebt ihn.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Cart is empty?=False">
              <CartSummary cart={CART} />
            </Specimen>
            <Specimen label="Cart is empty?=True">
              <CartSummary cart={EMPTY_CART} />
            </Specimen>
            <Specimen label="Logging In?=True">
              <CartSummary cart={CART} login={<CartLogIn />} />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'components-cart-login',
    figma: 'Components / Cart / LogIn',
    nodeId: '3238:10265',
    code: '<CartLogIn onSubmit={…} error={error} />',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="State=Default">
              <CartLogIn />
            </Specimen>
            <Specimen label="Error?=True">
              <CartLogIn error="E-Mail oder Passwort falsch" />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'components-cart-login-prompt',
    figma: 'Components / CartLoginPrompt',
    nodeId: '3220:18844',
    code: '<CartLoginPrompt onLogin={…} />',
    render: () => <ThemeMatrix columns={2}>{() => <CartLoginPrompt />}</ThemeMatrix>,
  },
  {
    id: 'components-cart-voucher-input',
    figma: 'Components / Cart / VoucherInput',
    nodeId: '3325:5910',
    code: '<VoucherInput note={note} onRedeem={…} />',
    note: '„Einlösen“ bleibt inaktiv, solange das Feld leer ist. Figma zeigt als Label „default label“.',
    render: () => <ThemeMatrix columns={2}>{() => <VoucherInput note={VOUCHER_NOTE} />}</ThemeMatrix>,
  },
  {
    id: 'components-cart-message',
    figma: 'Components / Cart / Message',
    nodeId: '3480:19750',
    code: '<CartMessage actionLabel="In den Warenkorb" onClose={…}>…</CartMessage>',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Variant=Huge">
              <CartMessage actionLabel="In den Warenkorb" closable>
                {MESSAGE}
              </CartMessage>
            </Specimen>
            <Specimen label="Variant=Small">
              <CartMessage variant="small">{VOUCHER_NOTE}</CartMessage>
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'components-cart-page',
    figma: 'Components / Cart / CartPage',
    nodeId: '3155:6091',
    code: '<CartPage cart={cart} recommendations={…} />',
    note: '„Anmelden“ zeigt Cart / LogIn in der Summary. „Zur Kasse“ erscheint nur mit Artikeln (in Figma ausgeblendet, ohne Label).',
    render: () => (
      <div className="flex flex-col gap-xl">
        <Specimen label="Destination=Navigation · leer">
          <div className="w-full max-w-128">
            <CartPage
              cart={EMPTY_CART}
              message={{ text: MESSAGE, actionLabel: 'In den Warenkorb' }}
              recommendations={[{ title: 'Deine Favoriten:', products: PRODUCTS }]}
            />
          </div>
        </Specimen>
        <Specimen label="Destination=Navigation · mit Artikel">
          <div className="w-full max-w-128">
            <CartPage cart={CART} loggedIn voucherNote={VOUCHER_NOTE} />
          </div>
        </Specimen>
        <Specimen label="Destination=Checkout · Closed?=True / False">
          <div className="flex w-full max-w-128 flex-col gap-md">
            <CheckoutCartOverview cart={CART} />
            <CheckoutCartOverview cart={CART} defaultOpen />
          </div>
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-add-to-basket-mobile',
    figma: 'Components / AddToBasket / Mobile',
    nodeId: '3986:23589',
    code: '<AddToBasketMobile count={1} onClick={…} />',
    render: () => (
      <div className="flex flex-wrap gap-md">
        <Specimen label="Zero Items">
          <AddToBasketMobile />
        </Specimen>
        <Specimen label="Zero Items · Hover">
          <AddToBasketMobile forceHover />
        </Specimen>
        <Specimen label="One Item">
          <AddToBasketMobile count={1} />
        </Specimen>
        <Specimen label="Two Items · gerade hinzugefügt">
          <AddToBasketMobile count={2} justAdded />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-overlay-message',
    figma: 'Components / OverlayComponents / Message · overlay/ADDED TO CARD',
    nodeId: '2784:3621',
    code: '<AddedToCartMessage productTitle="…" priceLabel="19.99€" onClose={…} />',
    render: () => (
      <div className="w-full max-w-[24.375rem]">
        <AddedToCartMessage productTitle="Schokolierte Himbeeren" priceLabel="19.99€" />
      </div>
    ),
  },
]
