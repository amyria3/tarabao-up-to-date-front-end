'use client'

import * as React from 'react'

import { IconClose6 } from '@/components/icons/figma-icons'
import { cn } from '@/lib/utils'

export type InlineFeedbackTone = 'success' | 'warning'

export interface InlineFeedbackElementProps {
  /** Figma Success?=True bzw. Warning?=True */
  tone?: InlineFeedbackTone
  /** Figma Close allowed?=True: Schließen-Symbol, Text in content-text. */
  closable?: boolean
  /** Kontrolliert: Figma Closed?=True blendet das Element aus. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * Figma: Primitives / InlineFeedbackElement (2337:1353).
 * Zeile px-sm py-xs gap-md-sm, Radius 0.5 twuc, Fläche success-bg / error-bg,
 * Text type-user-message-default in success-content / error-content.
 * Warnungen sind role="alert", Erfolg role="status".
 */
export function InlineFeedbackElement({
  tone = 'success',
  closable = false,
  open,
  onOpenChange,
  children,
  className,
  id,
}: InlineFeedbackElementProps) {
  const [inner, setInner] = React.useState(true)
  const isOpen = open ?? inner
  if (!isOpen) return null
  const warning = tone === 'warning'
  return (
    <div
      id={id}
      data-slot="inline-feedback"
      role={warning ? 'alert' : 'status'}
      className={cn(
        'flex w-full items-center gap-md-sm rounded-[0.125rem] px-sm py-xs',
        warning ? 'bg-error-bg' : 'bg-success-bg',
        className,
      )}
    >
      <p
        className={cn(
          'flex-1 type-user-message-default',
          closable ? 'text-content-text' : warning ? 'text-error-content' : 'text-success-content',
        )}
      >
        {children}
      </p>
      {closable ? (
        <button
          type="button"
          aria-label="Hinweis schließen"
          onClick={() => {
            if (open === undefined) setInner(false)
            onOpenChange?.(false)
          }}
          className="inline-flex size-3 shrink-0 cursor-pointer items-center justify-center text-content-text focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
        >
          <IconClose6 aria-hidden className="size-full" />
        </button>
      ) : null}
    </div>
  )
}
