import Link from 'next/link'
import type * as React from 'react'

import { NewsletterForm, type NewsletterFormProps } from '@/components/design-system/components/newsletter-form'
import { DefaultParagraph } from '@/components/design-system/primitives/typography'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type BaseProps = {
  /** Figma Padding?=True: p-lg */
  padding?: boolean
  /** Figma min-w?=True: min-w-block-min */
  minWidth?: boolean
  title?: string
  text?: string
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export type BlockElementProps =
  | (BaseProps & { variant: 'newsletter' } & NewsletterFormProps)
  | (BaseProps & { variant: 'widerruf'; actionLabel?: string; href?: string; onAction?: () => void })

const DEFAULTS = {
  newsletter: {
    title: 'Tarabao-Newsletter',
    text: 'Rabatte, Aktionen, Rezepte, Neuigkeiten aus dem Unternehmen, neue Produkte',
  },
  widerruf: {
    title: 'Widerruf',
    text: 'Du hast das Recht, Deine Verträge und Einkäufe innerhalb von 14 Tagen und ohne Angabe von Gründen zu widerrufen. Es fallen eventuell kosten an.',
  },
} as const

/**
 * Figma: Components / BlockElement (7797:22472) · Variant=Newsletter|Widerruf, Padding?, min-w?.
 * Spalte gap-md-l, max-w-block-max, Fläche surface-color: Titel ShoppingCart & Checkout/MainHeadline
 * (zentriert), Primitives / DefaultParagraph LG, dann Newsletter-Formular bzw. der Link
 * „Zum gesetzlichen Widerruf“ als Buttons / MD / PrimaryButton über die volle Breite.
 */
export function BlockElement(props: BlockElementProps) {
  const { variant, padding = false, minWidth = true, headingLevel: Heading = 'h2', className } = props
  const title = props.title ?? DEFAULTS[variant].title
  const text = props.text ?? DEFAULTS[variant].text
  let action: React.ReactNode
  if (props.variant === 'newsletter') {
    action = (
      <NewsletterForm inputLabel={props.inputLabel} submitLabel={props.submitLabel} onSubscribe={props.onSubscribe} />
    )
  } else {
    action = (
      <div className="flex w-full flex-col gap-xxs">
        {props.onAction ? (
          <Button intent="primary" size="md" className="w-full" onClick={props.onAction}>
            {props.actionLabel ?? 'Zum gesetzlichen Widerruf'}
          </Button>
        ) : (
          <Button asChild intent="primary" size="md" className="w-full">
            <Link href={props.href ?? '/de-de/widerruf'}>{props.actionLabel ?? 'Zum gesetzlichen Widerruf'}</Link>
          </Button>
        )}
      </div>
    )
  }
  return (
    <div
      data-slot="block-element"
      data-variant={variant}
      className={cn(
        'flex w-full max-w-block-max flex-col gap-md-l bg-surface text-content-text',
        padding && 'p-lg',
        minWidth && 'min-w-block-min',
        className,
      )}
    >
      <Heading className="w-full text-center type-shopping-cart-checkout-main-headline">{title}</Heading>
      <div className="flex w-full flex-col items-center gap-2">
        <DefaultParagraph size="lg">{text}</DefaultParagraph>
      </div>
      {action}
    </div>
  )
}
