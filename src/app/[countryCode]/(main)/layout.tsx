import { countryCode as rootCountryCode } from 'next/root-params'

import { PageTemplate } from '@modules/layout/templates/page-template'
import { chrome } from '@/lib/shop/chrome'

/**
 * Wie `(main)/layout.tsx` in apps/medusa-storefront: Header, Seiteninhalt und Footer aller Shop-Seiten.
 * Die Storefront setzt dafür Nav, Footer und AddedToCartOverlay ein. Hier übernimmt Figma
 * Templates / Page (PageTemplate) dieselbe Aufgabe. Die Seiten liefern nur ihre Sections und,
 * wo die Storefront eine zeigt, die Breadcrumb.
 */
export default async function MainLayout(props: { children: React.ReactNode }) {
  // Wie in der Storefront: Root-Param, nicht `await params`, in gemeinsamen Layouts.
  const countryCode = (await rootCountryCode()) ?? 'de-de'
  return <PageTemplate {...chrome(countryCode)}>{props.children}</PageTemplate>
}
