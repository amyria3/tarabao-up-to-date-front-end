'use client'

import Link from 'next/link'

import { IconLogIn } from '@/components/icons/figma-icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CartLoginPromptProps {
  text?: string
  loginLabel?: string
  continueLabel?: string
  continueHref?: string
  onLogin?: () => void
  className?: string
}

/**
 * Figma: Components / CartLoginPrompt (3220:18844) · Logged In?=False.
 * Rahmen card-btn-hover-click, p-md-l: Hinweis (Manrope 12, ohne Textstil), darunter
 * Buttons / MD / PrimaryButton „Anmelden“ (Icon Log In) und Buttons / XXS / Inline „Weiter einkaufen“.
 */
export function CartLoginPrompt({
  text = 'Wenn du ein Konto hast, melde dich bitte an, um die zuvor hinzugefügten Artikel anzuzeigen.',
  loginLabel = 'Anmelden',
  continueLabel = 'Weiter einkaufen',
  continueHref = '/de-de/categories',
  onLogin,
  className,
}: CartLoginPromptProps) {
  return (
    <div
      data-slot="cart-login-prompt"
      className={cn('flex w-full flex-col items-center border border-card-btn-hover-click p-md-l', className)}
    >
      <div className="flex max-w-60 flex-col items-center">
        <p className="w-full pb-4 font-body text-12 text-content-text">{text}</p>
        <div className="flex flex-col items-center gap-sm">
          <Button
            intent="primary"
            size="md"
            icon={<IconLogIn aria-hidden className="size-6" />}
            className="w-60"
            onClick={onLogin}
          >
            {loginLabel}
          </Button>
          <Button asChild intent="inline" size="xxs">
            <Link href={continueHref}>{continueLabel}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
