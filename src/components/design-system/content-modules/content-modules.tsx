'use client'

import Link from 'next/link'
import * as React from 'react'

import { ModuleHeadline, type ModuleHeadlineType } from '@/components/design-system/content-modules/module-headline'
import { FormField } from '@/components/design-system/inputs/form-field'
import { ArrowUpOrDown } from '@/components/design-system/primitives/arrow-up-or-down'
import { ReviewStars } from '@/components/design-system/primitives/review-stars'
import {
  BulletedList,
  DefaultParagraph,
  HeadlineH2,
  HeadlineH3,
  UserMessageExplanation,
} from '@/components/design-system/primitives/typography'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import { Button } from '@/components/ui/button'
import type { ImageModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

/* ---- ContentModules / Basic ---- */

export interface ContentBasicProps {
  headline?: React.ReactNode
  headlineType?: ModuleHeadlineType
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4'
  /** höchstens 3 Absätze (Figma-Beschreibung) */
  paragraphs: React.ReactNode[]
  paragraphSize?: 'lg' | 'md'
  className?: string
}

/**
 * Figma: ContentModules / Basic (7715:19490) · TypeOfHeadline, TypeOfParagraph, Has Headline?.
 * Spalte gap-md-l, min/max block: Slot „Headline“ (höchstens 1) und Slot „Paragraph“
 * (Primitives / DefaultParagraph LG oder MD, höchstens 3). Die Slots bekommen kein Element,
 * die Inhalte folgen direkt in der Spalte.
 */
export function ContentBasic({
  headline,
  headlineType = 'h2',
  headingLevel,
  paragraphs,
  paragraphSize = 'lg',
  className,
}: ContentBasicProps) {
  return (
    <div
      data-slot="content-basic"
      className={cn('flex w-full min-w-block-min max-w-block-max flex-col gap-md-l', className)}
    >
      {headline ? (
        <ModuleHeadline type={headlineType} as={headingLevel}>
          {headline}
        </ModuleHeadline>
      ) : null}
      {paragraphs.slice(0, 3).map((p, i) => (
        <DefaultParagraph key={i} size={paragraphSize}>
          {p}
        </DefaultParagraph>
      ))}
    </div>
  )
}

/* ---- ContentModules / CTA ---- */

export interface ContentCtaProps {
  title: React.ReactNode
  text?: React.ReactNode
  /** Figma Product Benefits?=True: BulletedList statt Absatz, darunter ReviewStars */
  benefits?: React.ReactNode[]
  rating?: { value: number; label?: React.ReactNode }
  actionLabel: string
  href: string
  headingLevel?: 'h2' | 'h3'
  className?: string
}

/**
 * Figma: ContentModules / CTA (7598:20727) · Product Benefits?. Spalte gap-md-l, min/max block:
 * H2, DefaultParagraph LG oder Primitives / BulletedList, Buttons / MD / PrimaryButton
 * (Fill bis btn-max) und bei Benefits Primitives / ReviewStars (links).
 */
export function ContentCta({
  title,
  text,
  benefits,
  rating,
  actionLabel,
  href,
  headingLevel = 'h2',
  className,
}: ContentCtaProps) {
  return (
    <div
      data-slot="content-cta"
      className={cn('flex w-full min-w-block-min max-w-block-max flex-col gap-md-l', className)}
    >
      <HeadlineH2 as={headingLevel}>{title}</HeadlineH2>
      {benefits?.length ? (
        <BulletedList items={benefits} />
      ) : text ? (
        <DefaultParagraph size="lg">{text}</DefaultParagraph>
      ) : null}
      <Button asChild intent="primary" size="md" className="w-full min-w-btn-min max-w-btn-max">
        <Link href={href}>{actionLabel}</Link>
      </Button>
      {benefits?.length && rating ? <ReviewStars rating={rating.value} label={rating.label} className="w-50" /> : null}
    </div>
  )
}

/* ---- ContentModules / ContactForm ---- */

export type ContactRequest = { message: string; name: string; email: string }

/**
 * Figma: ContentModules / ContactForm (7988:22598) · State=Default|Success. Spalte gap-md, min/max
 * block: H2 „Schreib uns!“. Default: Input / Field Type=Textarea „Deine Nachricht oder Frage hier“,
 * „Name“, „E-Mail“ (gap-2.5) und Buttons / MD / PrimaryButton „Nachricht abschicken“.
 * Success (Zustand nach dem Absenden, keine Prop): Primitives / UserMessage & Explanation
 * „Danke für Deine Nachricht!“ und Buttons / SM / SecondaryButton „Neue Nachricht schreiben“.
 */
export function ContactForm({
  title = 'Schreib uns!',
  submitLabel = 'Nachricht abschicken',
  successTitle = 'Danke für Deine Nachricht!',
  successText = 'Wir antworten in der Regel am Montag und Donnerstag.',
  resetLabel = 'Neue Nachricht schreiben',
  defaultSent = false,
  onSubmit,
  className,
}: {
  title?: string
  submitLabel?: string
  successTitle?: string
  successText?: string
  resetLabel?: string
  /** Zeigt State=Success statisch (Bibliothek, Storybook). */
  defaultSent?: boolean
  onSubmit?: (request: ContactRequest) => void | Promise<void>
  className?: string
}) {
  const [sent, setSent] = React.useState(defaultSent)
  const root = cn('flex w-full min-w-block-min max-w-block-max flex-col gap-md', className)
  if (sent) {
    return (
      <div data-slot="contact-form" data-state="success" className={root}>
        <HeadlineH2>{title}</HeadlineH2>
        <div role="status" className="flex w-full flex-col items-center gap-sm pt-md-l text-center">
          <UserMessageExplanation title={successTitle} as="h3" className="text-center">
            {successText}
          </UserMessageExplanation>
          <Button intent="secondary" size="sm" className="w-full" onClick={() => setSent(false)}>
            {resetLabel}
          </Button>
        </div>
      </div>
    )
  }
  return (
    <form
      data-slot="contact-form"
      data-state="default"
      className={root}
      onSubmit={async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        await onSubmit?.({
          message: String(data.get('message') ?? ''),
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
        })
        setSent(true)
      }}
    >
      <HeadlineH2>{title}</HeadlineH2>
      <div className="flex w-full flex-col gap-md-sm">
        <div className="flex w-full flex-col gap-2.5">
          <FormField label="Deine Nachricht oder Frage hier" name="message" type="textarea" required />
          <FormField label="Name" name="name" autoComplete="name" required />
          <FormField label="E-Mail" name="email" type="email" autoComplete="email" required />
        </div>
        <Button type="submit" intent="primary" size="md" className="w-full min-w-btn-min max-w-btn-max">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

/* ---- ContentModules / BasicWithDisclosure ---- */

export interface BasicWithDisclosureProps {
  title: React.ReactNode
  text: React.ReactNode
  /** Figma Slot „Signets [A.1 Zertifizierungen]“: Anzahl Platzhalter 50 × 50 oder eigene Inhalte */
  signets?: number | React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  headingLevel?: 'h3' | 'h4'
  className?: string
}

/**
 * Figma: ContentModules / BasicWithDisclosure (8141:22208) · State=Default|Open, Show Slot Signets.
 * Spalte gap-sm, min/max block: H3 mit ArrowUpOrDown (22), darunter DefaultParagraph MD.
 * Zu: Absatz auf 3 Zeilen gekürzt. Offen: voller Absatz und Signets (Platzhalter, gap-md-sm).
 */
export function BasicWithDisclosure({
  title,
  text,
  signets,
  open: controlled,
  defaultOpen = false,
  onOpenChange,
  headingLevel = 'h3',
  className,
}: BasicWithDisclosureProps) {
  const [inner, setInner] = React.useState(defaultOpen)
  const open = controlled ?? inner
  const id = React.useId()
  const toggle = () => {
    if (controlled === undefined) setInner(!open)
    onOpenChange?.(!open)
  }
  return (
    <div
      data-slot="basic-with-disclosure"
      data-state={open ? 'open' : 'closed'}
      className={cn('flex w-full min-w-block-min max-w-block-max flex-col gap-sm', className)}
    >
      <HeadlineH3 as={headingLevel}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-text`}
          onClick={toggle}
          className="flex w-full cursor-pointer items-start justify-between gap-sm text-left [text-transform:inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg"
        >
          <span>{title}</span>
          <span className="flex h-5 w-5.5 shrink-0 items-center justify-center">
            <ArrowUpOrDown variant={open ? 'up' : 'down'} size={22} />
          </span>
        </button>
      </HeadlineH3>
      <div id={`${id}-text`} className="flex w-full flex-col gap-md-sm">
        <DefaultParagraph size="md" className={cn(!open && 'line-clamp-3')}>
          {text}
        </DefaultParagraph>
        {open && signets ? (
          <ul className="flex w-full flex-wrap justify-center gap-md-sm" aria-label="Zertifizierungen">
            {typeof signets === 'number'
              ? Array.from({ length: signets }, (_, i) => (
                  <li key={i} className="size-12.5">
                    <ProductImage image={{ src: '', alt: `Siegel ${i + 1}` }} />
                  </li>
                ))
              : signets}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

/* ---- ContentModules / CMS / MediaText ---- */

/**
 * Figma: ContentModules / CMS / MediaText (7565:24424) · DisplayText?. Spalte py-md-l gap-md-l,
 * max-w-content: H2, Bildfläche h-104.5 (Platzhalter) und DefaultParagraph LG bis block-double-max.
 */
export function MediaText({
  title,
  text,
  image,
  showText = true,
  className,
}: {
  title: React.ReactNode
  text?: React.ReactNode
  image?: ImageModel
  showText?: boolean
  className?: string
}) {
  return (
    <div data-slot="media-text" className={cn('flex w-full max-w-content flex-col gap-md-l py-md-l', className)}>
      <HeadlineH2>{title}</HeadlineH2>
      <div className="h-104.5 w-full">
        <ProductImage image={image} sizes="(min-width: 80rem) 80rem, 100vw" />
      </div>
      {showText && text ? (
        <DefaultParagraph size="lg" className="max-w-block-double-max">
          {text}
        </DefaultParagraph>
      ) : null}
    </div>
  )
}

/* ---- ContentModules / CMS / CustomContentWithImg · CustomContentWithText ---- */

// Die Spalten sind Figma-Slots und bekommen kein Element. Ihre Maße (Fill, min/max block)
// setzt die Zeile auf ihre direkten Kinder.
const TWO_COLUMNS =
  'flex w-full min-w-block-min max-w-block-double-max flex-wrap items-center justify-center gap-xl [&>*]:min-w-block-min [&>*]:max-w-block-max [&>*]:flex-1'

/**
 * Figma: ContentModules / CMS / CustomContentWithImg (7660:20273) · LeftColumnSlotVariant=Basic|CTA|
 * CTA & ProductBenefits|ContactForm. Zeile mit Umbruch, gap-xl, max-w-block-double-max: links das
 * ContentModule, rechts die Bildfläche h-96 (Platzhalter), beide min/max block.
 */
export function CustomContentWithImg({
  children,
  image,
  imageFirst = false,
  className,
}: {
  /** genau ein ContentModule (Slot LeftColumn) */
  children: React.ReactNode
  image?: ImageModel
  /** Bild links (für abwechselnde CMS-Abschnitte) */
  imageFirst?: boolean
  className?: string
}) {
  return (
    <div data-slot="custom-content-with-img" className={cn(TWO_COLUMNS, className)}>
      {children}
      <div className={cn('h-96', imageFirst && 'order-first')}>
        <ProductImage image={image} sizes="(min-width: 64rem) 32rem, 100vw" />
      </div>
    </div>
  )
}

/**
 * Figma: ContentModules / CMS / CustomContentWithText (7988:22954) · LeftColumnSlotVariant=Basic|
 * ContactForm, RightColumnSlotVariant=DefaultParagraph|CTA|Ingredients|BulletList.
 * Zeile mit Umbruch, gap-xl, max-w-block-double-max, zwei Spalten min/max block.
 */
export function CustomContentWithText({
  left,
  right,
  className,
}: {
  /** je genau ein Element (Slots LeftColumn, RightColumn) */
  left: React.ReactNode
  right: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="custom-content-with-text" className={cn(TWO_COLUMNS, className)}>
      {left}
      {right}
    </div>
  )
}

/* ---- ContentModules / CMS / Editorial ---- */

/**
 * Figma: ContentModules / CMS / Editorial (3164:4506) · DisplayHeadline?, Display Footnote,
 * Display Second Column, TypeOfHeadline=H1|H2|H3, TypeOfParagraph=MD|LG. Spalte gap-md-l bis
 * block-double-max: Überschrift, zwei Spalten DefaultParagraph (Umbruch, gap-lg) und Footnote.
 */
export function Editorial({
  headline,
  headlineType = 'h1',
  columns,
  paragraphSize = 'lg',
  footnote,
  className,
}: {
  headline?: React.ReactNode
  headlineType?: 'h1' | 'h2' | 'h3'
  /** eine oder zwei Spalten */
  columns: React.ReactNode[]
  paragraphSize?: 'lg' | 'md'
  footnote?: React.ReactNode
  className?: string
}) {
  return (
    <div data-slot="editorial" className={cn('flex w-full max-w-block-double-max flex-col gap-md-l', className)}>
      {headline ? <ModuleHeadline type={headlineType}>{headline}</ModuleHeadline> : null}
      <div className="flex w-full flex-wrap justify-center gap-lg">
        {columns.slice(0, 2).map((c, i) => (
          <DefaultParagraph key={i} size={paragraphSize} className="flex-1">
            {c}
          </DefaultParagraph>
        ))}
      </div>
      {footnote ? <p className="w-full text-center type-default-text-s text-content-text">{footnote}</p> : null}
    </div>
  )
}
