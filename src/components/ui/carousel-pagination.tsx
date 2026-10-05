'use client'

import { CarouselNav } from '@/components/ui/carousel-nav'
import { cn } from '@/lib/utils'

/**
 * Figma: Primitives / PaginationDot (9321:70281) · Active?. Punkt 8 px (size-2), rund,
 * aktiv btn-primary-bg, sonst surface-highlighted.
 */
export function PaginationDot({ active = false, className }: { active?: boolean; className?: string }) {
  return (
    <span
      data-slot="pagination-dot"
      data-active={active || undefined}
      aria-hidden
      className={cn('size-2 shrink-0 rounded-full', active ? 'bg-btn-primary-bg' : 'bg-surface-highlighted', className)}
    />
  )
}

export interface CarouselPaginationProps {
  /** Anzahl der Seiten; die Punkte ergeben sich daraus. */
  pages: number
  /** Sichtbare Seite, ab 0 */
  page: number
  onPageChange?: (page: number) => void
  /** Endlos blättern (Standard: an den Enden inaktiv) */
  loop?: boolean
  className?: string
  'aria-label'?: string
}

/**
 * Figma: Primitives / CarouselPagination (9324:45197). Zeile: Buttons / CarouselNav SM zurück,
 * Punkte (gap-sm, px-md-sm) und CarouselNav SM vor. Der aktive Punkt zeigt die sichtbare Seite.
 */
export function CarouselPagination({
  pages,
  page,
  onPageChange,
  loop = false,
  className,
  'aria-label': ariaLabel = 'Seiten',
}: CarouselPaginationProps) {
  const last = Math.max(0, pages - 1)
  const prev = page > 0 ? page - 1 : loop ? last : null
  const next = page < last ? page + 1 : loop ? 0 : null
  return (
    <div
      data-slot="carousel-pagination"
      role="group"
      aria-label={ariaLabel}
      className={cn('flex items-center', className)}
    >
      <CarouselNav
        size="sm"
        direction="left"
        disabled={prev === null}
        onClick={() => prev !== null && onPageChange?.(prev)}
      />
      <span className="flex items-center gap-sm px-md-sm" aria-hidden>
        {Array.from({ length: pages }, (_, i) => (
          <PaginationDot key={i} active={i === page} />
        ))}
      </span>
      <span className="sr-only" aria-live="polite">
        Seite {page + 1} von {pages}
      </span>
      <CarouselNav
        size="sm"
        direction="right"
        disabled={next === null}
        onClick={() => next !== null && onPageChange?.(next)}
      />
    </div>
  )
}
