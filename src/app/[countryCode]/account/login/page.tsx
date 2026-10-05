import { AccountLoggedOutPage } from '@/components/design-system/pages/shop-pages'
import { chrome } from '@/lib/shop/chrome'

export const metadata = { title: 'Anmelden' }

/** Figma {Dein Account / Nicht angemeldet} 9845:35453. */
export default async function LoginRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  return <AccountLoggedOutPage chrome={chrome(countryCode, { loggedIn: false })} />
}
