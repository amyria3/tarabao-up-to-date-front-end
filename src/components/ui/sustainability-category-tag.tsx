import * as React from 'react'

import { IconCheck6 } from '@/components/icons/figma-icons'
import { ButtonShape } from '@/components/ui/button-shape'
import {
  SUSTAINABILITY_CATEGORIES,
  SUSTAINABILITY_TAG_CLASSES,
  type SustainabilityCategory,
} from '@/lib/design-system/sustainability'
import { cn } from '@/lib/utils'

export interface SustainabilityCategoryTagProps {
  category: SustainabilityCategory
  /** Figma BOOLEAN „Show Icon?“ (Standard an) */
  showIcon?: boolean
  children?: React.ReactNode
  className?: string
}

/**
 * Figma: SustainabilityCategoryTag (8125:24718). Nicht interaktives Etikett:
 * Form „Very oval“ tag-<kategorie>-bg, h28, px-md, gap-xxxs, Häkchen (6).
 */
export function SustainabilityCategoryTag({
  category,
  showIcon = true,
  children,
  className,
}: SustainabilityCategoryTagProps) {
  const label = children ?? SUSTAINABILITY_CATEGORIES.find((c) => c.key === category)?.label
  return (
    <span
      data-slot="sustainability-tag"
      className={cn('relative inline-flex h-btn-xx-sm w-fit items-center', className)}
    >
      <ButtonShape
        shape="very-oval"
        className={SUSTAINABILITY_TAG_CLASSES[category].bg}
        outlineClassName="text-content-weak [&_path]:stroke-[0.5px]"
      />
      <span className="relative flex h-btn-xx-sm items-center justify-center gap-xxxs px-md text-center text-content-text">
        <span className="truncate type-label-default">{label}</span>
        {showIcon ? <IconCheck6 aria-hidden className="size-3 shrink-0" /> : null}
      </span>
    </span>
  )
}

/**
 * Figma: SustainabilityCategoryTag (8126:24742) — Gruppe aller vier Etiketten,
 * Umbruch gap-xs / Zeilenabstand 6 px (gap-y-xs), Höhe in Figma fix 64 px.
 */
export function SustainabilityCategoryTags({
  categories = SUSTAINABILITY_CATEGORIES.map((c) => c.key),
  className,
}: {
  categories?: SustainabilityCategory[]
  className?: string
}) {
  return (
    <ul className={cn('flex w-full flex-wrap items-start gap-xs', className)} aria-label="Nachhaltigkeit">
      {categories.map((category) => (
        <li key={category}>
          <SustainabilityCategoryTag category={category} />
        </li>
      ))}
    </ul>
  )
}
