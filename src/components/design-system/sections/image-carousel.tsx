'use client'

import * as React from 'react'

import { IconClose30, IconEye } from '@/components/design-system/icons/figma-icons'
import { CarouselPagination } from '@/components/design-system/primitives/carousel-pagination'
import { HeadlineH2 } from '@/components/design-system/primitives/typography'
import { CardsOrder } from '@/components/design-system/templates/cards-order'
import { Section } from '@/components/design-system/templates/section'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import type { ImageCardModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

/* ---- Cards / ImageCard ---- */

export interface ImageCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  card: ImageCardModel
  forceHover?: boolean
}

/**
 * Figma: Cards / ImageCard (9324:45224). Spalte gap-sm, w-60: Bild 240 × 144 (Platzhalter) und
 * Bildunterschrift (Cards/Blog/Title, card-content-text). Hover zeigt das Auge über dem Bild,
 * ein Klick öffnet Components / OverlayComponents / Image.
 */
export const ImageCard = React.forwardRef<HTMLButtonElement, ImageCardProps>(function ImageCard(
  { card, forceHover, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      data-slot="image-card"
      data-hovered={forceHover ? '' : undefined}
      aria-label={`${card.caption} groß anzeigen`}
      className={cn(
        'group flex w-60 cursor-pointer flex-col items-start gap-sm text-left',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
        className,
      )}
      {...props}
    >
      <span className="relative block h-36 w-full overflow-hidden">
        <ProductImage image={card.image} sizes="15rem" />
        <span
          aria-hidden
          className="absolute inset-zero hidden items-center justify-center bg-surface/50 text-content-text group-hovered:flex group-focus-visible:flex"
        >
          <IconEye className="size-7.5" />
        </span>
      </span>
      <span className="w-full type-cards-blog-title text-card-content-text">{card.caption}</span>
    </button>
  )
})
ImageCard.displayName = 'ImageCard'

/* ---- Components / OverlayComponents / Image ---- */

export interface ImageOverlayProps {
  cards: ImageCardModel[]
  /** Index des gezeigten Bilds; `null` schließt das Overlay. */
  index: number | null
  onIndexChange: (index: number | null) => void
  className?: string
}

/**
 * Figma: Components / OverlayComponents / Image (9325:70380). Dialog max-w-block-max, surface,
 * p-lg/md-l: Zeile mit Bildunterschrift (Caption, DefaultText LG) und Icons / close 30, großes Bild
 * (h-112) und darunter mittig Primitives / CarouselPagination zum Blättern durch die Karten.
 */
export function ImageOverlay({ cards, index, onIndexChange, className }: ImageOverlayProps) {
  const ref = React.useRef<HTMLDialogElement>(null)
  const open = index !== null
  React.useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])
  const card = index !== null ? cards[index] : undefined
  return (
    <dialog
      ref={ref}
      data-slot="image-overlay"
      onClose={() => onIndexChange(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onIndexChange(null)
      }}
      className={cn(
        'm-auto w-full max-w-block-max bg-surface p-zero text-content-text backdrop:bg-content-text/40',
        className,
      )}
    >
      {card ? (
        <div className="flex w-full flex-col gap-md-l px-lg py-md-l">
          <div className="flex w-full items-center gap-md">
            <p className="min-w-zero flex-1 type-default-text-lg">{card.caption}</p>
            <button
              type="button"
              aria-label="Schließen"
              onClick={() => onIndexChange(null)}
              className="inline-flex size-7.5 shrink-0 cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
            >
              <IconClose30 aria-hidden />
            </button>
          </div>
          <div className="h-112 w-full">
            <ProductImage image={card.image} sizes="(min-width: 64rem) 48rem, 100vw" />
          </div>
          <div className="flex w-full justify-center">
            <CarouselPagination
              pages={cards.length}
              page={index ?? 0}
              onPageChange={(p) => onIndexChange(p)}
              loop
              aria-label="Bilder"
            />
          </div>
        </div>
      ) : null}
    </dialog>
  )
}

/* ---- Sections / ImageCarousel ---- */

export interface ImageCarouselSectionProps {
  title: React.ReactNode
  cards: ImageCardModel[]
  className?: string
}

/**
 * Figma: Sections / ImageCarousel (9334:47556), aufgebaut wie Sections / BlogCards: H2 in Slot 00,
 * Templates / Cards Order (CardsRow, scrollt waagerecht, gap-sm) mit Cards / ImageCard in Slot 01,
 * Primitives / CarouselPagination mittig in Slot 02. Die Pfeile blättern die Reihe seitenweise
 * (scroll-snap), ein Klick auf eine Karte öffnet Components / OverlayComponents / Image.
 */
export function ImageCarouselSection({ title, cards, className }: ImageCarouselSectionProps) {
  const listRef = React.useRef<HTMLUListElement>(null)
  const [page, setPage] = React.useState(0)
  const [pages, setPages] = React.useState(1)
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  React.useEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const count = Math.max(1, Math.ceil(list.scrollWidth / Math.max(1, list.clientWidth)))
      setPages(count)
      setPage(Math.min(count - 1, Math.round(list.scrollLeft / Math.max(1, list.clientWidth))))
    }
    measure()
    list.addEventListener('scroll', measure, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => {
      list.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [cards.length])

  const goTo = (next: number) => {
    const list = listRef.current
    if (!list) return
    list.scrollTo({ left: next * list.clientWidth, behavior: 'smooth' })
    setPage(next)
  }

  return (
    <Section className={className} aria-label={typeof title === 'string' ? title : undefined}>
      <HeadlineH2>{title}</HeadlineH2>
      <CardsOrder ref={listRef} variant="row" className="gap-sm">
        {cards.map((card, i) => (
          <li key={card.id}>
            <ImageCard card={card} onClick={() => setOpenIndex(i)} />
          </li>
        ))}
      </CardsOrder>
      <div className="flex w-full justify-center">
        <CarouselPagination pages={pages} page={page} onPageChange={goTo} />
      </div>
      <ImageOverlay cards={cards} index={openIndex} onIndexChange={setOpenIndex} />
    </Section>
  )
}
