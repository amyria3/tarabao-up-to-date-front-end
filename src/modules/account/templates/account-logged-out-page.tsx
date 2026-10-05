import { CartLogIn, type CartLogInProps } from '@modules/cart/components/cart-login'
import { HeadlineH1 } from '@/components/ui/typography'
import { Section } from '@/components/ui/section'

/**
 * Figma: Dein Account / Nicht angemeldet (Templates / Page 9845:35453, unter {Dein Account}):
 * eine Templates / Section mit Components / Cart / LogIn. Das Account-Symbol im Header zeigt
 * abgemeldet; „Anmelden“ führt zum Kundenkonto (im Code: Session).
 */
export function AccountLoggedOutPage(login: CartLogInProps) {
  return (
    <>
      <Section aria-label="Anmelden">
        <HeadlineH1>Dein Account</HeadlineH1>
        <CartLogIn {...login} />
      </Section>
    </>
  )
}
