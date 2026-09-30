'use client'

import Link from 'next/link'
import type * as React from 'react'

import { IconButton } from '@/components/design-system/buttons/icon-button'
import { DefaultParagraph } from '@/components/design-system/primitives/typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface CartMessageProps {
  variant?: 'huge' | 'small'
  children: React.ReactNode
  actionLabel?: string
  actionHref?: string
  onClose?: () => void
  /** Schließen-Button zeigen; Standard: wenn onClose gesetzt ist */
  closable?: boolean
  closeLabel?: string
  className?: string
}

/**
 * Figma: Components / Cart / Message (3480:19750) · Visible?, Variant=Huge|Small.
 * Fläche card-surface-hover, Rahmen card-btn-hover-click, Schatten „Cards default“, p-md-l.
 * Huge: IconButton „Schließen“, Text UserMessage/LG mittig, darunter Buttons / XXS / Inline.
 * Small: Primitives / DefaultParagraph MD. Visible?=False klappt die Meldung auf h0 zusammen —
 * hier rendert der Aufrufer die Meldung einfach nicht.
 */
export function CartMessage({
  variant = 'huge',
  children,
  actionLabel,
  actionHref,
  onClose,
  closable = Boolean(onClose),
  closeLabel = 'Schließen',
  className,
}: CartMessageProps) {
  return (
    <div
      role="status"
      data-slot="cart-message"
      data-variant={variant}
      className={cn(
        'flex w-full flex-col border border-card-btn-hover-click bg-card-surface-hover p-md-l text-content-text shadow-card',
        variant === 'huge' ? 'items-center gap-md' : 'gap-md-sm',
        className,
      )}
    >
      {closable ? (
        <div className="flex w-full items-center">
          <IconButton label={closeLabel} onClick={onClose} />
        </div>
      ) : null}
      {variant === 'huge' ? (
        <div className="flex w-full flex-col items-center px-md">
          <p className="w-full text-center type-user-message-lg">{children}</p>
          {actionLabel ? (
            <Button asChild={Boolean(actionHref)} intent="inline" size="xxs">
              {actionHref ? <Link href={actionHref}>{actionLabel}</Link> : actionLabel}
            </Button>
          ) : null}
        </div>
      ) : (
        <DefaultParagraph size="md">{children}</DefaultParagraph>
      )}
    </div>
  )
}
