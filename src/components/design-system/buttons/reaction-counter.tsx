import * as React from 'react'

import {
  IconFlagFilled,
  IconFlagOutline,
  IconHeartFilled,
  IconHeartOutline,
} from '@/components/design-system/icons/figma-icons'
import { cn } from '@/lib/utils'

export interface ReactionCounterProps {
  /** Anzahl „Hilfreich“ */
  likes?: number
  /** Flagge (Melden); Figma zeigt sie in beiden Varianten. */
  showReport?: boolean
  reported?: boolean
  onLike?: () => void
  onReport?: () => void
  className?: string
}

/**
 * Figma: Buttons / ReactionCounter (2070:1506) mit Icons / ReactionsCounter / Heart.
 * Variant=1: Herz als Kontur (keine Reaktion), Variant=2: Herz gefüllt mit Zahl darunter;
 * daneben die Flagge.
 */
export function ReactionCounter({
  likes = 0,
  showReport = true,
  reported = false,
  onLike,
  onReport,
  className,
}: ReactionCounterProps) {
  const item =
    'group inline-flex min-w-icon-counter-min cursor-pointer flex-col items-center gap-xxxs text-content-text hover:-translate-y-xxxs'
  return (
    <div className={cn('flex w-full items-start gap-[0.9375rem] pt-[0.625rem]', className)}>
      <button type="button" className={item} onClick={onLike} aria-label={`Hilfreich, ${likes}`}>
        {likes > 0 ? <IconHeartFilled /> : <IconHeartOutline />}
        {likes > 0 ? <span className="type-comment-name-time">{likes}</span> : null}
      </button>
      {showReport ? (
        <button type="button" className={item} onClick={onReport} aria-label="Melden" aria-pressed={reported}>
          {reported ? <IconFlagFilled /> : <IconFlagOutline />}
        </button>
      ) : null}
    </div>
  )
}
