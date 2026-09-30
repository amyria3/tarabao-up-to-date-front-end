'use client'

import * as React from 'react'

import { IconCartEmpty } from '@/components/design-system/icons/figma-icons'
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
 * h36 (144 px), Code auf special-surface-color-voucher (BROWN NOW TWO 40),
 * Bedingungen Cards/Light, Buttons / SM / Button-Card. Hover hebt die Karte
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
        'group/card flex h-36 w-full min-w-card-small-min max-w-card-max flex-col pt-xxs',
        'hover:pt-zero hover:pb-xxs data-hovered:pt-zero data-hovered:pb-xxs',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-full w-full flex-col border border-card-btn-hover-click bg-card-surface shadow-card',
          'group-hover/card:bg-card-surface-hover group-data-hovered/card:bg-card-surface-hover',
        )}
      >
        <div className="h-[4.25rem] w-full border-8 border-card-surface group-hover/card:border-card-surface-hover group-data-hovered/card:border-card-surface-hover">
          <p className="flex size-full items-center justify-center bg-special-surface-color-voucher p-[0.625rem] font-accent-two text-40 leading-none uppercase text-card-surface">
            {voucher.code}
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center justify-between px-md pb-md">
          <p className="w-full type-cards-light text-card-content-text group-hover/card:text-card-content-text-hover group-data-hovered/card:text-card-content-text-hover">
            {voucher.conditions}
          </p>
          <Button
            intent="card"
            size="sm"
            icon={<IconCartEmpty aria-hidden className="size-5" />}
            onClick={() => onApply?.(voucher.code)}
            className="w-[17.25rem] max-w-full"
          >
            {applyLabel}
          </Button>
        </div>
      </div>
    </article>
  )
}
