import { AccountLoggedOutPage } from '@modules/account/templates/account-logged-out-page'

export const metadata = { title: 'Anmelden' }

/**
 * Figma {Dein Account / Nicht angemeldet} 9845:35453. Die Storefront zeigt die Anmeldung unter
 * `/account`, solange niemand angemeldet ist. Ohne Session braucht die Ansicht hier eine eigene Route.
 */
export default function LoginRoute() {
  return <AccountLoggedOutPage />
}
