'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'

import { Header, type HeaderProps } from '@modules/layout/components/header'
import { SearchAndFilter } from '@modules/search/components/search-and-filter'
import { FILTER_OPTIONS } from '@/lib/fixtures'
import { CATALOG, productCard } from '@/lib/shop/catalog'

/**
 * Header des Shops wie `modules/layout/templates/nav` in der Storefront. Dort kommt die Anmeldung
 * aus der Session. Hier zeigt nur `/account/login` den abgemeldeten Zustand (Figma
 * {Dein Account / Nicht angemeldet}). Das Konto-Symbol führt dann zur Anmeldung.
 * Die offene Suche zeigt Sections / Search & Filter (Figma Header State=Search) und sucht in den
 * Beispielprodukten des Shops; im Shop liefert die Suche die Treffer.
 */
export function Nav({ loggedIn, accountHref, search, ...props }: HeaderProps) {
  const pathname = usePathname() ?? ''
  const loggedOut = pathname.endsWith('/account/login')
  const countryCode = pathname.split('/')[1] ?? ''
  const products = React.useMemo(() => CATALOG.map((p) => productCard(p, countryCode)), [countryCode])
  return (
    <Header
      {...props}
      loggedIn={loggedOut ? false : loggedIn}
      accountHref={loggedOut && accountHref ? `${accountHref}/login` : accountHref}
      search={search ?? <SearchAndFilter filterOptions={FILTER_OPTIONS} products={products} />}
    />
  )
}
