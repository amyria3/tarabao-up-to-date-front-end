import Link from 'next/link'

import { InlineMarkup } from '@/components/ui/inline-markup'
import { ProductImage } from '@modules/products/components/product-image'
import { Button } from '@/components/ui/button'
import { MEGACARD_VARIANT_TO_LIVELY, type LivelyTheme } from '@/lib/design-system/themes'
import type { MegaCardModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export type MegaCardVariant = 'orange-black' | 'blue-green' | 'happy-yellow' | 'purple-black'

export interface MegaCardProps {
  card: MegaCardModel
  /** Figma-Variante (Clrs / Mega Cards) → data-lively-theme und Aufbau */
  variant?: MegaCardVariant
  headingLevel?: 'h2' | 'h3'
  className?: string
}

type Cta = 'inline' | 'primary' | 'primary-then-inline'

type VariantLayout = {
  root: string
  image: string
  block: string
  content: string
  group: string
  title: string
  banner: string
  body: string
  /** blue-green: Fließtext in eigener Fläche megacard-text-span-bg */
  bodyBox?: string
  cta: Cta
  ctaWrapper?: string
}

/*
 * Figma: Cards / MegaCard (2143:2061) · Variant × Min/Max (min 1260 | max 1259).
 * „max 1259“ ist hier der Grundzustand, „min 1260“ gilt ab lg (Designsystem kennt nur md/lg).
 * Grundzustand: Karte max 512 px (Blöcke 472 px), Bild oben (min-h 32, max-h 160, füllt den
 * Rest bis min-h 160 der Karte), Textblock darunter, alles zentriert.
 * ab lg: orange-black und happy-yellow stellen Bild und Textblock nebeneinander,
 * purple-black und blue-green legen den Textblock (h 128) über das vollflächige Bild.
 */
const SIDE_ROOT = 'lg:flex-row lg:items-stretch lg:justify-center'
const SIDE_IMAGE = 'lg:max-h-none lg:min-w-zero lg:max-w-none'
const SIDE_BLOCK = 'lg:max-w-224 lg:flex-1 lg:px-24 lg:py-md-l'
const OVERLAY_IMAGE = 'lg:max-h-none lg:max-w-none'
const OVERLAY_BLOCK = 'lg:absolute lg:h-128 lg:w-auto lg:px-24 lg:py-md-l'
const BODY = 'type-cards-mega-card-body text-megacard-default-text'
// Figma: Fließtext w500 in einem Hug-Rahmen (max-w 160) → hier max-w-125, damit Bild und Text
// ab lg gleich breit bleiben, auch wenn die Karte schmaler als 1400 px ist.
const JUSTIFIED = 'w-full text-justify hyphens-auto'

const LAYOUTS: Record<MegaCardVariant, VariantLayout> = {
  'orange-black': {
    root: cn('pt-zero lg:pt-md-l', SIDE_ROOT),
    image: SIDE_IMAGE,
    block: cn('pt-xl', SIDE_BLOCK),
    content: 'min-w-60 max-w-128 gap-md-l lg:max-w-125 lg:gap-8',
    group: 'gap-md-l lg:gap-4',
    title: 'w-full items-center',
    banner: 'py-xxs',
    body: cn(BODY, JUSTIFIED),
    cta: 'inline',
  },
  'happy-yellow': {
    root: SIDE_ROOT,
    image: SIDE_IMAGE,
    block: SIDE_BLOCK,
    content: 'gap-8 lg:max-w-125',
    group: 'gap-8 lg:gap-4',
    title: 'w-full items-center lg:items-end',
    banner: 'py-xxs lg:py-xxxs',
    body: cn(BODY, JUSTIFIED),
    cta: 'primary-then-inline',
  },
  'purple-black': {
    root: '',
    image: OVERLAY_IMAGE,
    block: cn(OVERLAY_BLOCK, 'lg:bottom-xxl lg:left-xxl lg:max-w-none'),
    content: 'gap-md-l lg:w-auto',
    group: 'gap-md-l',
    // Fließtext bestimmt die Breite nicht mit: Titel und Button geben sie vor (Figma: Hug)
    title: 'w-full items-center lg:items-end',
    banner: 'py-xxs lg:py-xs',
    body: cn(BODY, 'w-full lg:[contain:inline-size]'),
    cta: 'inline',
  },
  'blue-green': {
    root: '',
    image: OVERLAY_IMAGE,
    block: cn(OVERLAY_BLOCK, 'lg:top-16 lg:right-md lg:min-w-megacard-min lg:max-w-megacard-max'),
    content: 'gap-md-l lg:w-auto lg:justify-start lg:gap-md',
    group: 'gap-md-l lg:gap-md',
    title: 'w-fit items-center self-center lg:items-end',
    banner: 'py-xxs lg:py-xs',
    body: 'type-megacard-fliesstext text-megacard-default-text',
    bodyBox: 'w-full bg-megacard-text-span-bg py-xl pr-2.5 pl-xl lg:w-126',
    cta: 'primary',
    ctaWrapper: 'flex w-full flex-col items-center lg:w-126',
  },
}

function CtaButton({
  kind,
  href,
  label,
  className,
}: {
  kind: 'inline' | 'primary'
  href: string
  label: string
  className?: string
}) {
  return (
    <Button asChild intent={kind} size="lg" className={cn(kind === 'primary' && 'w-[22.125rem] max-w-full', className)}>
      <Link href={href}>{label}</Link>
    </Button>
  )
}

/**
 * Figma: Cards / MegaCard (2143:2061) · Variant=orange-black|blue-green|happy-yellow|purple-black,
 * Min/Max=min 1260|max 1259. Fläche megacard-section-bg, Textblock megacard-span-bg,
 * Titelzeilen als Banner (megacard-title-span-bg, Cards/MegaCard/Lumo), Fließtext
 * Cards/MegaCard/Body mit **fett** und [Link](href), CTA Buttons / LG / Inline bzw.
 * Buttons / LG / PrimaryButton (blue-green; happy-yellow unter lg).
 */
export function MegaCard({ card, variant = 'orange-black', headingLevel: Heading = 'h2', className }: MegaCardProps) {
  const lively: LivelyTheme = MEGACARD_VARIANT_TO_LIVELY[variant]
  const l = LAYOUTS[variant]
  const body = <InlineMarkup text={card.body} />
  return (
    <article
      data-slot="mega-card"
      data-variant={variant}
      data-lively-theme={lively}
      className={cn(
        'relative flex min-h-160 w-full min-w-megacard-min max-w-128 flex-col items-center bg-megacard-section-bg p-md-l lg:max-w-none',
        l.root,
        className,
      )}
    >
      <div className={cn('relative min-h-32 w-full max-w-118 flex-1', l.image)}>
        <ProductImage image={card.image} sizes="(min-width: 64rem) 60vw, 30rem" className="absolute inset-0" />
      </div>
      <div
        className={cn('flex w-full max-w-118 flex-col items-center justify-center bg-megacard-span-bg p-md-l', l.block)}
      >
        <div className={cn('flex w-full flex-col items-center justify-center', l.content)}>
          <div className={cn('flex w-full flex-col lg:w-auto', l.group)}>
            <Heading className={cn('flex flex-col', l.title)}>
              {card.titleLines.map((line, i) => (
                <span
                  key={line}
                  className={cn(
                    'bg-megacard-title-span-bg text-center type-cards-mega-card-lumo text-megacard-title-text',
                    l.banner,
                  )}
                >
                  {i > 0 ? ' ' : null}
                  {line}
                </span>
              ))}
            </Heading>
            {l.bodyBox ? (
              <div className={l.bodyBox}>
                <p className={l.body}>{body}</p>
              </div>
            ) : (
              <p className={l.body}>{body}</p>
            )}
          </div>
          <div className={l.ctaWrapper ?? 'contents'}>
            {l.cta === 'primary-then-inline' ? (
              <>
                <CtaButton kind="primary" href={card.href} label={card.ctaLabel} className="lg:hidden" />
                <CtaButton kind="inline" href={card.href} label={card.ctaLabel} className="max-lg:hidden" />
              </>
            ) : (
              <CtaButton kind={l.cta} href={card.href} label={card.ctaLabel} />
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
