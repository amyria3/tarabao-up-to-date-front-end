import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Align = 'left' | 'center'
/**
 * Figma: Center-Varianten der Headlines binden .Primitives / Headline / Text an die Variable
 * headline-align (Lyt scl / Width). So steht eine zentrierte Überschrift unter md linksbündig
 * und ab md zentriert.
 */
const ALIGN: Record<Align, string> = { left: 'text-left', center: 'text-left md:text-center' }

type HeadingProps<S extends string> = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'style'> & {
  /** Figma-Achse Style */
  variant?: S
  /** Figma-Achse Align */
  align?: Align
  /** Semantische Ebene, falls sie von der Optik abweicht (z. B. H2-Optik als h3). */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
}

/**
 * Figma: Primitives / Headline / H1 (7565:23672) · Style=Default|Sbtile, Align=Left|Center.
 * Default mit pb-md (Abstand im Master), Subtitle ohne.
 */
export function HeadlineH1({
  variant = 'default',
  align = 'left',
  as,
  className,
  ...props
}: HeadingProps<'default' | 'subtitle'>) {
  const Comp = as ?? (variant === 'subtitle' ? 'p' : 'h1')
  return (
    <Comp
      className={cn(
        'w-full hyphens-auto break-words text-content-text',
        variant === 'subtitle' ? 'type-h1-subtitle' : 'type-h1 pb-md',
        ALIGN[align],
        className,
      )}
      {...props}
    />
  )
}

/**
 * Figma: Primitives / Headline / H2 (7565:23679) · Style=Default|Alternative (looks like H3)|Sbtile,
 * Hug content?=False|True. Mit width="hug" ist die Überschrift so breit wie ihr Text. So steht ein
 * Element daneben (z. B. ein Inline-Button) direkt hinter dem Textende.
 */
export function HeadlineH2({
  variant = 'default',
  align = 'left',
  width = 'fill',
  as,
  className,
  ...props
}: HeadingProps<'default' | 'alternative' | 'subtitle'> & {
  /** Figma-Achse Hug content? (fill = False, hug = True) */
  width?: 'fill' | 'hug'
}) {
  const Comp = as ?? (variant === 'subtitle' ? 'p' : 'h2')
  const type = { default: 'type-h2', alternative: 'type-h2-alternative', subtitle: 'type-h2-subtitle' }[variant]
  return (
    <Comp
      className={cn(
        'hyphens-auto break-words text-content-text',
        width === 'hug' ? 'w-fit' : 'w-full',
        type,
        ALIGN[align],
        className,
      )}
      {...props}
    />
  )
}

/** Figma: Primitives / Headline / H3 (7715:20573) · Style=Default|Sbtile, Align?=Left|Center. */
export function HeadlineH3({
  variant = 'default',
  align = 'left',
  as,
  className,
  ...props
}: HeadingProps<'default' | 'subtitle'>) {
  const Comp = as ?? (variant === 'subtitle' ? 'p' : 'h3')
  return (
    <Comp
      className={cn(
        'w-full hyphens-auto break-words text-content-text',
        variant === 'subtitle' ? 'type-h3-subtitle' : 'type-h3',
        ALIGN[align],
        className,
      )}
      {...props}
    />
  )
}

export interface DefaultParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Textstil DefaultText LG | MD | S */
  size?: 'lg' | 'md' | 's'
  /** Figma min-w: Block Element / SM (block) oder x-SM (inline) */
  minWidth?: 'block' | 'inline'
}

/**
 * Figma: Primitives / DefaultParagraph (7565:23423) · FontSize=LG|MD, min-w=Block Element / SM|x-SM.
 * Fill mit min-w-block-min bzw. min-w-block-inline-min und max-w-block-max.
 */
export function DefaultParagraph({ size = 'lg', minWidth = 'block', className, ...props }: DefaultParagraphProps) {
  return (
    <p
      className={cn(
        'w-full max-w-block-max text-content-text',
        minWidth === 'block' ? 'min-w-block-min' : 'min-w-block-inline-min',
        { lg: 'type-default-text-lg', md: 'type-default-text-md', s: 'type-default-text-s' }[size],
        className,
      )}
      {...props}
    />
  )
}

/** Figma: Primitives / Paragraphs / Footnote (7565:23645) · DefaultText S, zentriert. */
export function Footnote({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('w-full text-center type-default-text-s text-content-text', className)} {...props} />
}

/** Figma: Primitives / BulletedList (4221:27964) · Spalte gap-xxs, max-w-block-max, BulletPoints. */
export function BulletedList({ items, className }: { items: React.ReactNode[]; className?: string }) {
  return (
    <ul
      className={cn(
        'flex w-full max-w-block-max list-disc flex-col gap-xxs pl-md-l type-bullet-points text-content-text marker:text-content-text',
        className,
      )}
    >
      {items.map((item, i) => (
        <li key={i} className="pl-xxs">
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * Figma: Primitives / UserMessage & Explanation (6811:20757).
 * Spalte gap-xxs: Überschrift H2 Alternative, darunter UserMessage/X-LG.
 */
export function UserMessageExplanation({
  title,
  children,
  className,
  as: Title = 'h2',
}: {
  title: React.ReactNode
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  return (
    <div className={cn('flex w-full flex-col gap-xxs text-content-text', className)}>
      <Title className="type-h2-alternative">{title}</Title>
      <p className="type-user-message-x-lg">{children}</p>
    </div>
  )
}

/**
 * Figma: Primitives / Inline Question & Button (6072:33346).
 * Zeile mit Umbruch, rechtsbündig, gap-sm: Frage (DefaultText MD) + Buttons / XXS / Inline.
 */
export function InlineQuestion({
  question,
  action,
  onAction,
  disabled,
  className,
}: {
  question: React.ReactNode
  action: React.ReactNode
  onAction?: () => void
  /** Sperrt den Button, z. B. kurz nach „Erneut senden“. */
  disabled?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex w-full flex-wrap items-center justify-end gap-sm', className)}>
      <p className="type-default-text-md text-content-text">{question}</p>
      <div className="flex pb-[0.3125rem]">
        <Button intent="inline" size="xxs" onClick={onAction} disabled={disabled}>
          {action}
        </Button>
      </div>
    </div>
  )
}
