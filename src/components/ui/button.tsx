import * as React from 'react'

import { ButtonShape, type ButtonShapeKind } from '@/components/ui/button-shape'
import { cn } from '@/lib/utils'

/**
 * Buttons aus Figma „B2C und CI“ (Buttons / LG … XXXS). Die API folgt
 * apps/medusa-storefront (`intent` + `size` + `asChild`) und erweitert sie um
 * die Größen und Familien aus Figma.
 *
 * | intent × size   | Figma-Komponente                 |
 * | --------------- | -------------------------------- |
 * | primary · lg    | Buttons / LG / PrimaryButton     |
 * | inline · lg     | Buttons / LG / Inline            |
 * | primary · md    | Buttons / MD / PrimaryButton     |
 * | secondary · md  | Buttons / MD / SecondaryButton   |
 * | primary · sm    | Buttons / SM / PrimaryButton     |
 * | secondary · sm  | Buttons / SM / SecondaryButton   |
 * | inline · sm     | Buttons / SM / Inline            |
 * | card · sm       | Buttons / SM / Button-Card       |
 * | primary · xxs   | Buttons / XXS / PrimaryButton    |
 * | secondary · xxs | Buttons / XXS / SecondaryButton  |
 * | inline · xxs    | Buttons / XXS / Inline           |
 * | inline · xxxs   | Buttons / XXXS / Inline          |
 *
 * LG-Buttons gehören in Figma zur Collection „Clrs / Mega Cards“ und folgen
 * deshalb `data-lively-theme` (Kampagne), nicht `data-theme`.
 */
export type ButtonIntent = 'primary' | 'secondary' | 'inline' | 'card'
export type ButtonSize = 'lg' | 'md' | 'sm' | 'xxs' | 'xxxs'
export type ButtonWidth = 'fill' | 'hug'

type Family = {
  /** Form im Ruhezustand; `null` = Form erst beim Hover sichtbar. */
  shape: ButtonShapeKind | null
  /** Form beim Hover, wenn sie wechselt. */
  hoverShape?: ButtonShapeKind
  shapeColor: string
  labelColor: string
  type: string
  /** Höhe der Ebene „label & icon“ (Lyt scl / Heights). */
  height: string
  padding: string
  gap: string
  /** Einseitiges Padding der Wurzel, beim Hover nach unten verschoben (2.4). */
  lift: string
  width: ButtonWidth
  /** Ebene „mark“ um den Text (LG / Inline: Highlight beim Hover). */
  mark?: string
  /** Zusätzliche Klassen an der Wurzel, z. B. min-w bei Hug. */
  root?: string
  /** Kontur der Form (Figma: Stroke auf Button-Shape, INSIDE). */
  outline?: string
}

const LIFT_4 = 'pt-xxs pb-zero hovered:pt-zero hovered:pb-xxs'
const LIFT_2 = 'pt-xxxs pb-zero hovered:pt-zero hovered:pb-xxxs'

const FAMILIES = {
  'primary-lg': {
    shape: 'oblong',
    shapeColor: 'text-megacard-btn-primary-bg group-hovered:text-megacard-btn-primary-bg-hover',
    labelColor: 'text-megacard-btn-primary-label group-hovered:text-megacard-btn-primary-label-hover',
    type: 'type-buttons-lg',
    height: 'h-btn-lg',
    padding: 'px-sm',
    gap: 'gap-md-sm',
    lift: LIFT_4,
    width: 'fill',
  },
  'inline-lg': {
    shape: null,
    shapeColor: '',
    labelColor:
      'text-megacard-btn-inline-label type-buttons-lg-underlined group-hovered:text-megacard-btn-inline-label-hover group-hovered:no-underline',
    type: '',
    height: 'h-btn-lg',
    padding: 'px-zero',
    gap: 'gap-zero',
    lift: LIFT_4,
    width: 'hug',
    // Figma: mark h40 py-xxxs, Hover h48 mit megacard-btn-inline-highlight-hover
    mark: 'flex h-10 items-center px-lg py-xxxs group-hovered:h-12 group-hovered:py-zero group-hovered:bg-megacard-btn-inline-highlight-hover',
    root: 'min-w-btn-min max-w-btn-max',
  },
  'primary-md': {
    shape: 'oblong',
    shapeColor:
      'text-btn-primary-bg group-hovered:text-btn-primary-bg-hover group-disabled:text-btn-primary-bg-inactive',
    labelColor:
      'text-btn-primary-label group-hovered:text-btn-primary-label-hover group-disabled:text-btn-primary-label-inactive',
    type: 'type-buttons-md',
    height: 'h-btn-md',
    padding: 'px-sm',
    gap: 'gap-md-sm',
    lift: LIFT_4,
    width: 'fill',
  },
  'secondary-md': {
    shape: 'oblong',
    shapeColor:
      'text-btn-secondary-bg group-hovered:text-btn-secondary-bg-hover group-disabled:text-btn-secondary-bg-inactive',
    labelColor:
      'text-btn-secondary-label group-hovered:text-btn-secondary-label-hover group-disabled:text-btn-secondary-label-inactive',
    type: 'type-buttons-md',
    height: 'h-btn-md',
    outline: 'text-btn-secondary-label group-hovered:opacity-0',
    padding: 'px-sm',
    gap: 'gap-md-sm',
    lift: LIFT_4,
    width: 'fill',
  },
  'primary-sm': {
    shape: 'oval',
    shapeColor:
      'text-btn-primary-bg group-hovered:text-btn-primary-bg-hover group-disabled:text-btn-primary-bg-inactive',
    labelColor:
      'text-btn-primary-label group-hovered:text-btn-primary-label-hover group-disabled:text-btn-primary-label-inactive',
    type: 'type-buttons-sm',
    height: 'h-btn-sm',
    padding: 'px-sm',
    gap: 'gap-md-sm',
    lift: LIFT_4,
    width: 'fill',
  },
  'secondary-sm': {
    shape: 'oval',
    shapeColor:
      'text-btn-secondary-bg group-hovered:text-btn-secondary-bg-hover group-disabled:text-btn-secondary-bg-inactive',
    labelColor:
      'text-btn-secondary-label group-hovered:text-btn-secondary-label-hover group-disabled:text-btn-secondary-label-inactive',
    type: 'type-buttons-md',
    height: 'h-btn-sm',
    outline: 'text-btn-secondary-label group-hovered:opacity-0 group-disabled:text-btn-secondary-label-inactive',
    padding: 'px-sm',
    gap: 'gap-md-sm',
    lift: LIFT_4,
    width: 'fill',
  },
  'inline-sm': {
    shape: 'oblong',
    hoverShape: 'oval',
    shapeColor: 'text-btn-inline-bg group-hovered:text-btn-inline-bg-hover',
    labelColor:
      'text-btn-inline-label group-hovered:text-btn-inline-label-hover group-disabled:text-btn-inline-label-inactive',
    type: 'type-buttons-md',
    height: 'h-btn-sm',
    padding: 'px-sm',
    gap: 'gap-md-sm',
    lift: LIFT_4,
    width: 'fill',
  },
  'card-sm': {
    shape: null,
    hoverShape: 'oval',
    shapeColor: 'text-card-btn-hover-click',
    labelColor: 'text-card-content-text-hover group-hovered:text-card-content-text',
    type: 'type-buttons-md',
    height: 'h-btn-sm',
    padding: 'px-sm',
    gap: 'gap-md-sm',
    lift: LIFT_4,
    width: 'fill',
  },
  'primary-xxs': {
    shape: 'oblong',
    shapeColor:
      'text-btn-primary-bg group-hovered:text-btn-primary-bg-hover group-disabled:text-btn-primary-bg-inactive',
    labelColor:
      'text-btn-primary-label group-hovered:text-btn-primary-label-hover group-disabled:text-btn-primary-label-inactive',
    type: 'type-label-default',
    height: 'h-btn-xx-sm',
    padding: 'px-xs',
    gap: 'gap-xxs',
    lift: LIFT_2,
    width: 'hug',
  },
  'secondary-xxs': {
    shape: 'oblong',
    shapeColor: 'text-surface group-hovered:text-btn-secondary-bg-hover',
    labelColor: 'text-btn-secondary-label group-hovered:text-btn-secondary-label-hover',
    type: 'type-buttons-xx-sm',
    outline: 'text-btn-secondary-label group-hovered:opacity-0 [&_path]:stroke-[0.75px]',
    height: 'h-btn-xx-sm',
    padding: 'px-xs',
    gap: 'gap-xxs',
    lift: LIFT_2,
    width: 'fill',
  },
  'inline-xxs': {
    shape: null,
    hoverShape: 'very-oval',
    shapeColor: 'text-btn-inline-bg-hover',
    labelColor:
      'text-btn-inline-label type-buttons-xx-sm-underlined group-hovered:text-btn-inline-label-hover group-hovered:no-underline',
    type: '',
    height: 'h-btn-xx-sm',
    padding: 'px-xxs',
    gap: 'gap-xxs',
    lift: LIFT_2,
    width: 'hug',
  },
  'inline-xxxs': {
    shape: 'oblong',
    hoverShape: 'very-oval',
    shapeColor: 'text-btn-inline-bg group-hovered:text-btn-inline-bg-hover',
    labelColor: 'text-btn-inline-label group-hovered:text-btn-inline-label-hover',
    type: 'type-buttons-xxxs-inline',
    height: 'h-btn-xxxx-sm',
    padding: 'px-xxs',
    gap: 'gap-xxs',
    lift: LIFT_2,
    width: 'hug',
  },
} as const satisfies Record<string, Family>

export type ButtonFamily = keyof typeof FAMILIES

/** Alle gültigen Kombinationen aus intent und size (für Bibliothek und Tests). */
export const BUTTON_FAMILIES = Object.keys(FAMILIES) as ButtonFamily[]

/** Figma-Name je Kombination. */
export const BUTTON_FIGMA_NAMES: Record<ButtonFamily, string> = {
  'primary-lg': 'Buttons / LG / PrimaryButton',
  'inline-lg': 'Buttons / LG / Inline',
  'primary-md': 'Buttons / MD / PrimaryButton',
  'secondary-md': 'Buttons / MD / SecondaryButton',
  'primary-sm': 'Buttons / SM / PrimaryButton',
  'secondary-sm': 'Buttons / SM / SecondaryButton',
  'inline-sm': 'Buttons / SM / Inline',
  'card-sm': 'Buttons / SM / Button-Card',
  'primary-xxs': 'Buttons / XXS / PrimaryButton',
  'secondary-xxs': 'Buttons / XXS / SecondaryButton',
  'inline-xxs': 'Buttons / XXS / Inline',
  'inline-xxxs': 'Buttons / XXXS / Inline',
}

function resolveFamily(intent: ButtonIntent, size: ButtonSize): ButtonFamily {
  const key = `${intent}-${size}` as ButtonFamily
  if (key in FAMILIES) return key
  // Kombinationen ohne Figma-Komponente fallen auf die nächste vorhandene Größe zurück.
  const fallback: Record<ButtonIntent, ButtonFamily> = {
    primary: 'primary-md',
    secondary: 'secondary-md',
    inline: 'inline-sm',
    card: 'card-sm',
  }
  return fallback[intent]
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntent
  size?: ButtonSize
  /** Figma: Wurzel Fill oder Hug. Standard wie in der Figma-Komponente. */
  width?: ButtonWidth
  /** Figma: „Show Icon?“ — Icon hinter dem Label, erbt die Label-Farbe. */
  icon?: React.ReactNode
  /** Form überschreiben, z. B. für Sonderfälle. */
  shape?: ButtonShapeKind
  /** Zeigt den Hover-Zustand statisch (Bibliothek, Storybook). */
  forceHover?: boolean
  /** Rendert das einzige Kind (z. B. <a>) als Wurzel, wie in der Storefront. */
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    intent = 'primary',
    size = 'md',
    width,
    icon,
    shape,
    forceHover,
    asChild = false,
    className,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  const family = resolveFamily(intent, size)
  const f: Family = FAMILIES[family]
  const resolvedWidth = width ?? f.width
  const restShape = shape ?? f.shape
  const hoverShape = f.hoverShape

  const rootClassName = cn(
    'group relative items-center justify-center whitespace-nowrap cursor-pointer select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg',
    'disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:cursor-not-allowed aria-disabled:opacity-60',
    resolvedWidth === 'fill' ? 'flex w-full min-w-btn-min max-w-btn-max' : 'inline-flex w-fit max-w-full',
    f.lift,
    f.root,
    className,
  )

  const inner = (content: React.ReactNode) => (
    <>
      {restShape ? (
        <ButtonShape
          shape={restShape}
          className={cn(f.shapeColor, hoverShape && 'group-hovered:opacity-0')}
          outlineClassName={f.outline}
        />
      ) : null}
      {hoverShape ? (
        <ButtonShape shape={hoverShape} className={cn(f.shapeColor, 'opacity-0 group-hovered:opacity-100')} />
      ) : null}
      <span
        className={cn(
          'relative flex flex-1 items-center justify-center text-center [&_svg]:shrink-0',
          f.height,
          f.padding,
          f.gap,
          f.type,
          f.labelColor,
          resolvedWidth === 'fill' && 'min-w-zero',
        )}
      >
        <span className={cn(resolvedWidth === 'fill' && 'truncate', f.mark)}>{content}</span>
        {icon}
      </span>
    </>
  )

  const hoverProps = forceHover ? { 'data-hovered': '' } : {}

  if (asChild && React.isValidElement<{ className?: string; children?: React.ReactNode }>(children)) {
    return React.cloneElement(
      children,
      { ...props, ...hoverProps, className: cn(rootClassName, children.props.className) } as never,
      inner(children.props.children),
    )
  }

  return (
    <button ref={ref} type={type} className={rootClassName} {...hoverProps} {...props}>
      {inner(children)}
    </button>
  )
})
Button.displayName = 'Button'
