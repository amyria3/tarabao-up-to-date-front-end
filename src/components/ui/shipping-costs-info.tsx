'use client'

import Link from 'next/link'
import * as React from 'react'

import { InformationBubble } from '@/components/ui/information-bubble'
import { cn } from '@/lib/utils'

export interface ShippingCostsInfoProps {
  /** Ziel der Links „Versandkosten“ und „Mehr über Versandkosten“ (Versandrichtlinien). */
  href?: string
  /** Text der Blase; Standard aus Figma. */
  info?: React.ReactNode
  /** Zeigt State=Hover statisch (Bibliothek, Storybook). */
  forceOpen?: boolean
  className?: string
}

const DEFAULT_INFO = '3,90 € – 4,90 € innerhalb Deutschlands, versandkostenfrei ab 49 €'

/**
 * Figma: Primitives / ShippingCostsInfo (9488:44712). Zeile DefaultText S, rechtsbündig:
 * „*inkl. MwSt. zzgl.“ und der Link „Versandkosten“. Beim Hover oder Fokus auf dem Link
 * (State=Hover) erscheint die Information Bubble (Fill, ohne Icon, w-80) rechtsbündig darüber
 * mit den Versandkosten und „Mehr über Versandkosten“.
 */
export function ShippingCostsInfo({
  href = '/de-de/page/versandrichtlinien',
  info = DEFAULT_INFO,
  forceOpen,
  className,
}: ShippingCostsInfoProps) {
  const tooltipId = React.useId()
  return (
    <p
      data-slot="shipping-costs-info"
      className={cn('flex items-baseline justify-end gap-xxs type-default-text-s text-content-text', className)}
    >
      <span>*inkl. MwSt. zzgl.</span>
      <span className="group/tip relative" data-open={forceOpen || undefined}>
        <Link
          href={href}
          aria-describedby={tooltipId}
          className="underline focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
        >
          Versandkosten
        </Link>
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute right-zero bottom-full z-10 hidden w-80 max-w-[calc(100vw-2rem)] pb-xxs',
            'group-hover/tip:block group-focus-within/tip:block group-data-open/tip:block',
          )}
        >
          <InformationBubble as="span" showIcon={false}>
            {info}
            <br />
            <Link href={href} className="underline focus-visible:outline-2 focus-visible:outline-btn-primary-bg">
              Mehr über Versandkosten
            </Link>
          </InformationBubble>
        </span>
      </span>
    </p>
  )
}
