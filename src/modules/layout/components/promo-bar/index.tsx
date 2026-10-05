import type { PromoModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface PromoBarProps {
  promo: PromoModel
  className?: string
}

/**
 * Figma: Layout / PromoBar (8882:27232) · viewport-range=base|md|lg.
 * Versandhinweis über dem Header: Fläche special-surface-color-voucher, Text DefaultText S
 * in special-content-text, zentriert, p-sm. Clrs / Special ist in Figma auf „lilac“ gepinnt.
 * base zeigt den Kurztext, md und lg den Langtext.
 */
export function PromoBar({ promo, className }: PromoBarProps) {
  return (
    <div
      data-slot="promo-bar"
      data-special-theme="lilac"
      className={cn(
        'flex w-full items-center justify-center bg-special-surface-color-voucher p-sm text-center type-default-text-s text-special-content-text',
        className,
      )}
    >
      <p>
        {promo.shortText ? (
          <>
            <span className="md:hidden">{promo.shortText}</span>
            <span className="max-md:hidden">{promo.text}</span>
          </>
        ) : (
          promo.text
        )}
      </p>
    </div>
  )
}
