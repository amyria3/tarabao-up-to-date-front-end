'use client'

import * as React from 'react'

import { CarouselNav } from '@/components/design-system/buttons/carousel-nav'
import { MegaCard, type MegaCardVariant } from '@/components/design-system/cards/mega-card'
import type { MegaCardModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type MegaCardSlide = { variant: MegaCardVariant; card: MegaCardModel }

/**
 * Figma: Sections / MegaCards (2156:4072) · Min/Max=max 1259|Min 1260. Nutzt kein Section-Template:
 * Karussell mit je einer Cards / MegaCard über die volle Breite. Ab lg (Min 1260) liegen zwei
 * Buttons / CarouselNav · Huge unten rechts. Die Folien rasten beim Wischen ein (scroll-snap).
 */
export function MegaCardsSection({ slides, className }: { slides: MegaCardSlide[]; className?: string }) {
  const track = React.useRef<HTMLDivElement>(null)
  const [index, setIndex] = React.useState(0)
  const go = (next: number) => {
    const el = track.current
    if (!el) return
    const i = (next + slides.length) % slides.length
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
    setIndex(i)
  }
  return (
    <section
      data-slot="mega-cards"
      aria-roledescription="Karussell"
      aria-label="Geschichten"
      className={cn('relative w-full overflow-hidden', className)}
    >
      <div
        ref={track}
        className="flex w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&>div]:w-full [&>div]:shrink-0 [&>div]:snap-start"
        onScroll={(e) => {
          const el = e.currentTarget
          setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)))
        }}
      >
        {slides.map((s, i) => (
          <div
            key={s.variant}
            role="group"
            aria-roledescription="Folie"
            aria-label={`${i + 1} von ${slides.length}`}
            className="flex justify-center"
          >
            <MegaCard card={s.card} variant={s.variant} />
          </div>
        ))}
      </div>
      {slides.length > 1 ? (
        <div className="absolute right-10 bottom-md-l hidden gap-2.5 lg:flex">
          <CarouselNav size="huge" direction="left" aria-label="Vorherige Geschichte" onClick={() => go(index - 1)} />
          <CarouselNav size="huge" direction="right" aria-label="Nächste Geschichte" onClick={() => go(index + 1)} />
        </div>
      ) : null}
    </section>
  )
}
