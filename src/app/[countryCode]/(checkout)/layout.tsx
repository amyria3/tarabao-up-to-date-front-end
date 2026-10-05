import { countryCode as rootCountryCode } from 'next/root-params'

import { PageTemplate } from '@modules/layout/templates/page-template'
import { chrome } from '@/lib/shop/chrome'

/**
 * Wie `(checkout)/layout.tsx` in apps/medusa-storefront: eigene Routengruppe für die Kasse.
 * Die Storefront zeigt dort nur die Nav. Figma {Check-Out Workflow} zeigt Header und Footer,
 * deshalb nutzt die Kasse hier dasselbe Templates / Page wie die übrigen Seiten.
 */
export default async function CheckoutLayout(props: { children: React.ReactNode }) {
  const countryCode = (await rootCountryCode()) ?? 'de-de'
  return <PageTemplate {...chrome(countryCode)}>{props.children}</PageTemplate>
}
