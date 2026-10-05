/** Wie in der Storefront: Platzhalter, solange die Kasse den Schritt aus `?step=` liest. */
export default function CheckoutLoading() {
  return <div aria-busy="true" className="min-h-dvh w-full bg-surface" />
}
