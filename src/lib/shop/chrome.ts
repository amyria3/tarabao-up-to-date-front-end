import type { PageTemplateProps } from '@/components/design-system/templates/page'
import { cartQuantity } from '@/lib/cart'
import { CART, FOOTER, NAV_GROUPS, PROMO } from '@/lib/fixtures'
import { localize, routes } from '@/lib/shop/routes'

export type Chrome = Pick<PageTemplateProps, 'header' | 'footer' | 'breadcrumb'>

/**
 * Header und Footer für alle Shop-Seiten: Navigation aus den Beispieldaten mit dem aktuellen
 * Länderkürzel, Warenkorb-Symbol mit der Summe der Mengen (Beispiel-Warenkorb), Konto-Symbol.
 * Im Shop kommen Warenkorb und Anmeldung aus der Session.
 */
export function chrome(
  countryCode: string,
  options: { loggedIn?: boolean; breadcrumb?: Chrome['breadcrumb'] } = {},
): Chrome {
  const r = routes(countryCode)
  return {
    header: {
      navGroups: localize(NAV_GROUPS, countryCode),
      promo: PROMO,
      cartCount: cartQuantity(CART),
      loggedIn: options.loggedIn ?? true,
      homeHref: r.home,
      accountHref: options.loggedIn === false ? r.login : r.account,
      cartHref: r.cart,
    },
    // Zusätzlicher Link zur Komponenten-Bibliothek (nicht in Figma), siehe docs/ABWEICHUNGEN.md
    footer: {
      ...localize(FOOTER, countryCode),
      legal: {
        ...localize(FOOTER.legal, countryCode),
        links: [...localize(FOOTER.legal.links, countryCode), { label: 'Komponenten-Bibliothek', href: r.library }],
      },
    },
    breadcrumb: options.breadcrumb,
  }
}
