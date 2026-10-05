import Link from 'next/link'

import {
  IconAccount,
  IconAccountLoggedIn,
  IconBurger,
  IconCartEmpty,
  IconCartLive,
  IconClose30,
  IconSearch,
  LogoTarabao,
} from '@/components/icons/figma-icons'
import { cn } from '@/lib/utils'

const TOOL =
  'inline-flex size-7.5 shrink-0 cursor-pointer items-center justify-center text-content-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg'

export interface NavBarProps {
  homeHref?: string
  accountHref?: string
  cartHref?: string
  /** Figma Icons / CartLive: Summe der Mengen im Warenkorb — 0 → leer, 1 bis 9 → Zahl, ab 10 → „9+“ */
  cartCount?: number
  loggedIn?: boolean
  menuOpen?: boolean
  searchOpen?: boolean
  menuId?: string
  searchId?: string
  onToggleMenu?: () => void
  onToggleSearch?: () => void
  className?: string
}

/**
 * Figma Icons / CartLive (3466:6770): Korb ohne Gitter mit der Zahl (BROWN NOW ONE 21) in
 * card-content-text. Der leere Korb (Zero Items?=True) zeigt das Gitter.
 */
function CartIcon({ count }: { count: number }) {
  if (count <= 0) return <IconCartEmpty />
  return (
    <span className="relative inline-flex size-7.5" data-slot="cart-live">
      <IconCartLive />
      <span
        aria-hidden
        className="absolute inset-[43.33%_30.66%_13.33%_32.67%] flex items-center justify-center font-accent-one text-[1.3125rem] leading-none text-card-content-text"
      >
        {count > 9 ? '9+' : count}
      </span>
    </span>
  )
}

/**
 * Figma: Navigation / NavBar (3175:6184) · viewport-range=base|md|lg.
 * Zeile surface-color, base h14 (56 px), md/lg h20 (80 px): links das Logo (122 × 28, py 2.5),
 * rechts Icons / Tools mit gap-md-l: Lupe, Burger, Konto, Warenkorb (Icons 30 px).
 * Offenes Menü zeigt statt des Burgers das Kreuz (State=Open), offene Suche statt der Lupe.
 * Die Versandzeile der Tools („Noch … bis zur kostenlosen Lieferung“) ist in Figma ausgeblendet.
 */
export function NavBar({
  homeHref = '/',
  accountHref = '/account',
  cartHref = '/cart',
  cartCount = 0,
  loggedIn = false,
  menuOpen = false,
  searchOpen = false,
  menuId,
  searchId,
  onToggleMenu,
  onToggleSearch,
  className,
}: NavBarProps) {
  const cartLabel = cartCount === 1 ? 'Warenkorb, 1 Artikel' : `Warenkorb, ${cartCount} Artikel`
  // Das Account-Symbol zeigt angemeldet oder abgemeldet (Figma: user-logged-in, nur Prototyp).
  return (
    <div data-slot="nav-bar" className={cn('flex h-14 w-full items-center gap-md-l bg-surface md:h-20', className)}>
      <div className="flex min-w-zero flex-1 flex-col justify-center py-2.5">
        <Link
          href={homeHref}
          aria-label="tarabao – zur Startseite"
          className="inline-flex w-fit text-content-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg"
        >
          <LogoTarabao className="h-7 w-auto" />
        </Link>
      </div>
      <div className="flex items-center justify-end gap-md-l">
        <button
          type="button"
          className={TOOL}
          aria-label={searchOpen ? 'Suche schließen' : 'Suche öffnen'}
          aria-expanded={searchOpen}
          aria-controls={searchId}
          onClick={onToggleSearch}
        >
          {searchOpen ? <IconClose30 /> : <IconSearch />}
        </button>
        <button
          type="button"
          className={TOOL}
          aria-label={menuOpen ? 'Navigation schließen' : 'Navigation öffnen'}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={onToggleMenu}
        >
          {menuOpen ? <IconClose30 /> : <IconBurger className="h-3 w-auto" />}
        </button>
        <Link href={accountHref} className={TOOL} aria-label={loggedIn ? 'Mein Konto' : 'Anmelden'}>
          {loggedIn ? <IconAccountLoggedIn /> : <IconAccount />}
        </Link>
        <Link href={cartHref} className={TOOL} aria-label={cartLabel}>
          <CartIcon count={cartCount} />
        </Link>
      </div>
    </div>
  )
}
