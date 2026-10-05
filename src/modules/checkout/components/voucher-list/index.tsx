'use client'

import { IconDeleteSmall } from '@/components/icons/figma-icons'
import { cn } from '@/lib/utils'

/**
 * Figma: Components / Checkout / VoucherUIPattern (2406:2720).
 * „Gültige Gutscheine:“ und je Code eine Zeile (Input/LabelDefault, gap-md-sm) mit Icons / Delete · Small.
 */
export function VoucherList({
  codes,
  title = 'Gültige Gutscheine:',
  onRemove,
  className,
}: {
  codes: string[]
  title?: string
  onRemove?: (code: string) => void
  className?: string
}) {
  if (codes.length === 0) return null
  return (
    <div data-slot="voucher-list" className={cn('flex flex-col items-start gap-1 text-content-text', className)}>
      <p className="type-input-label-default">{title}</p>
      <ul className="flex flex-col gap-1">
        {codes.map((code) => (
          <li key={code} className="flex items-center gap-md-sm type-input-label-default">
            <span>{code}</span>
            <button
              type="button"
              aria-label={`Gutschein ${code} entfernen`}
              onClick={() => onRemove?.(code)}
              className="inline-flex size-4 cursor-pointer items-center justify-center p-0.5 focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
            >
              <IconDeleteSmall aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
