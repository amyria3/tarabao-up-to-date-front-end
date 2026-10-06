import * as React from 'react'

import { IconCheck30 } from '@/components/icons/figma-icons'
import { ButtonShape } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

export interface InformationBubbleProps extends React.HTMLAttributes<HTMLElement> {
  /** Figma Fill?=True (Standard) oder Hug. */
  fill?: boolean
  /**
   * Figma Property 1=Default | Badge (9321:70265): Badge ist Hug ohne Icon mit einzeiligem Label,
   * z. B. Rezeptangaben („Arbeitszeit 15 Min.“) und Schrittnummern („Schritt 1“).
   */
  variant?: 'default' | 'badge'
  /** Figma BOOLEAN „Show Icon“ (Icons / check, 20). */
  showIcon?: boolean
  as?: 'div' | 'li' | 'span'
}

/**
 * Figma: Information Bubble (8817:23243). Hinweis ohne Interaktion:
 * Form „Very oval“ in surface-highlighted, Inhalt p-md-sm mit Häkchen und
 * Text type-label-default.
 */
export function InformationBubble({
  fill = true,
  showIcon,
  variant = 'default',
  as: Comp = 'div',
  className,
  children,
  ...props
}: InformationBubbleProps) {
  const badge = variant === 'badge'
  const hug = badge || !fill
  const icon = showIcon ?? !badge
  return (
    <Comp
      data-slot="information-bubble"
      data-variant={variant}
      className={cn('relative flex flex-col justify-center', hug ? 'w-fit max-w-full' : 'w-full', className)}
      {...props}
    >
      <ButtonShape shape="very-oval" className="text-surface-highlighted" />
      <span
        className={cn(
          'relative flex w-full items-center gap-[0.625rem] p-md-sm text-content-text',
          badge && 'justify-center',
        )}
      >
        {icon ? <IconCheck30 aria-hidden className="size-5 shrink-0" /> : null}
        <span className={cn('type-label-default', !hug && 'flex-1 text-center', badge && 'whitespace-nowrap')}>
          {children}
        </span>
      </span>
    </Comp>
  )
}
