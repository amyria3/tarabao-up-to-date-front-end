'use client'

import Link from 'next/link'
import * as React from 'react'
import { ReviewStars } from '@/components/ui/review-stars'
import { BulletedList, DefaultParagraph, HeadlineH2 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
