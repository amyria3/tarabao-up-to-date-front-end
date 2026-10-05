import * as React from 'react'

import { cn } from '@/lib/utils'

/** Fünfzackiger Stern 20×19 wie Figma STAR „Star 1…5“ */
function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 19" aria-hidden="true" focusable="false" className="h-[1.1875rem] w-5 shrink-0">
      <path
        d="M10 0.8l2.7 5.9 6.4.6-4.8 4.3 1.4 6.3L10 14.6l-5.7 3.3 1.4-6.3L.9 7.3l6.4-.6z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface ReviewStarsProps {
  /** Bewertung 0–5 (ganze Sterne) */
  rating?: number
  /** Figma-Text „Gekauft von … Menschen“ */
  label?: React.ReactNode
  /** Figma Align=Align-left|align-center */
  align?: 'left' | 'center'
  /** Leere Sterne als Kontur (Primitives / ReviewStars) oder ausgeblendet (Cards / ReviewCard) */
  emptyStars?: 'outline' | 'hidden'
  className?: string
}

/**
 * Figma: Primitives / ReviewStars (8118:22969).
 * Fünf Sterne 20×19 im Abstand 5 px in content-text, darunter DefaultText MD.
 */
export function ReviewStars({
  rating = 5,
  label,
  align = 'left',
  emptyStars = 'outline',
  className,
}: ReviewStarsProps) {
  const full = Math.max(0, Math.min(5, Math.round(rating)))
  return (
    <div
      className={cn(
        'flex w-full flex-col text-content-text',
        align === 'center' ? 'items-center' : 'items-start',
        className,
      )}
    >
      <div role="img" aria-label={`${full} von 5 Sternen`} className="flex gap-[0.3125rem]">
        {Array.from({ length: emptyStars === 'hidden' ? full : 5 }, (_, i) => (
          <Star key={i} filled={i < full} />
        ))}
      </div>
      {label ? <p className="type-default-text-md">{label}</p> : null}
    </div>
  )
}
