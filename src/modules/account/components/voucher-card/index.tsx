'use client'

import * as React from 'react'

import { IconCartEmpty } from '@/components/icons/figma-icons'
import { Button } from '@/components/ui/button'
import type { SpecialTheme } from '@/lib/design-system/themes'
import type { VoucherModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface VoucherCardProps {
  voucher: VoucherModel
  onApply?: (code: string) => void
  applyLabel?: string
  /** Clrs / Special: forest (Standard) oder lilac */
  specialTheme?: SpecialTheme
  forceHover?: boolean
  className?: string
}

/**
 * Figma: Cards / VoucherCard (3912:19811) · Hover?=False|True.
 * 144 px hoch, 256–384 px breit (Cards/VoucherCard/…). Rand 8 px (frame), Code auf
 * special-surface-color-voucher (BROWN NOW TWO 40) füllt die freie Höhe, darunter Bedingungen
 * Cards/Light und Buttons / MD / Button-Card (content 8 px seitlich und unten). Hover hebt die Karte
 * um xxs an (Polster wandert von oben nach unten) und nutzt card-surface-hover.
 */
export function VoucherCard({
  voucher,
  onApply,
  applyLabel = 'Gutschein anwenden',
  specialTheme,
  forceHover,
  className,
}: VoucherCardProps) {
  return (
    <article
      data-slot="voucher-card"
      {...(specialTheme ? { 'data-special-theme': specialTheme } : {})}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      className={cn(
        'group/card flex h-card-voucher w-full min-w-card-voucher-min max-w-card-voucher-max flex-col pt-xxs',
        'hover:pt-zero hover:pb-xxs data-hovered:pt-zero data-hovered:pb-xxs motion-hover',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-full w-full flex-col gap-card-voucher-frame border border-card-btn-hover-click bg-card-surface p-card-voucher-frame shadow-card',
          'group-hover/card:bg-card-surface-hover group-data-hovered/card:bg-card-surface-hover',
        )}
      >
        <div className="min-h-zero w-full flex-1">
          <p className="flex size-full items-center justify-center bg-special-surface-color-voucher p-[0.625rem] font-accent-two text-40 leading-none uppercase text-card-surface">
            {voucher.code}
          </p>
        </div>
        <div className="flex flex-col items-center px-card-voucher-content pb-card-voucher-content">
          <p className="w-full type-cards-light text-card-content-text group-hover/card:text-card-content-text-hover group-data-hovered/card:text-card-content-text-hover">
            {voucher.conditions}
          </p>
          <Button
            intent="card"
            size="md"
            icon={<IconCartEmpty aria-hidden className="h-icon-btn w-auto" />}
            onClick={() => onApply?.(voucher.code)}
          >
            {applyLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}
