'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'

import { IconCheck6 } from '@/components/design-system/icons/figma-icons'
import { ButtonShape } from '@/components/ui/button-shape'
import {
  SUSTAINABILITY_CATEGORIES,
  SUSTAINABILITY_TAG_CLASSES,
  type SustainabilityCategory,
} from '@/lib/design-system/sustainability'
import { NUTMIXER_CATEGORIES } from '@/lib/design-system/nutmixer'
import { cn } from '@/lib/utils'

type TagButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean
  /** Figma BOOLEAN „Show Icon?“ (Icons / check, Size=6, 12×12) */
  showIcon?: boolean
  forceHover?: boolean
}

function stateProps(selected: boolean | undefined) {
  return selected === undefined ? {} : { 'aria-pressed': selected, 'data-state': selected ? 'on' : 'off' }
}

const TAG_ROOT =
  'group relative inline-flex h-btn-xx-sm w-fit cursor-pointer select-none items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg'
const TAG_LABEL = 'relative flex h-btn-xx-sm items-center justify-center gap-xxxs px-lg text-center'
const TAG_TEXT = 'truncate type-label-default group-selected:type-label-selected'

/**
 * Figma: NutmixerTabs (8557:28249) · Variant=Navigtion, SelectedTab?=False|True.
 * Form „Very oval“ nutmixer-tag-bg-default/-selected, Label h28 px-lg.
 */
export const NutmixerTab = React.forwardRef<HTMLButtonElement, TagButtonBaseProps>(function NutmixerTab(
  { selected, showIcon = false, forceHover, className, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      {...stateProps(selected)}
      {...(forceHover ? { 'data-hovered': '' } : {})}
      {...props}
      className={cn(TAG_ROOT, className)}
    >
      <ButtonShape
        shape="very-oval"
        className="text-nutmixer-tag-bg-default group-selected:text-nutmixer-tag-bg-selected"
        outlineClassName="text-nutmixer-tag-label-stroke-default group-selected:opacity-0"
      />
      <span
        className={cn(
          TAG_LABEL,
          'text-nutmixer-tag-label-stroke-default group-selected:text-nutmixer-tag-label-selected',
        )}
      >
        <span className={TAG_TEXT}>{children}</span>
        {showIcon ? <IconCheck6 aria-hidden className="size-3 shrink-0" /> : null}
      </span>
    </button>
  )
})
NutmixerTab.displayName = 'NutmixerTab'

/**
 * Figma: NutmixerTabs · Variant=Information. Gleiche Form wie der Tab, aber ohne Aktion:
 * zeigt im Nussmixer die Anteile („Nüsse 30%“).
 */
export function NutmixerInfoTag({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      data-slot="nutmixer-info-tag"
      className={cn('relative inline-flex h-btn-xx-sm w-fit items-center', className)}
    >
      <ButtonShape
        shape="very-oval"
        className="text-nutmixer-tag-bg-default"
        outlineClassName="text-nutmixer-tag-label-stroke-default"
      />
      <span className={cn(TAG_LABEL, 'text-nutmixer-tag-label-stroke-default')}>
        <span className={TAG_TEXT}>{children}</span>
      </span>
    </span>
  )
}

export type SustainabilityCategoryButtonProps = TagButtonBaseProps & { category: SustainabilityCategory }

/**
 * Figma: SustainabilitCategoryNavigationButton (8125:24713) · SelectedTab?=False|True.
 * Fläche je Kategorie tag-<kategorie>-bg, gewählt/hover tag-<kategorie>-bg-hover-click.
 */
export const SustainabilityCategoryButton = React.forwardRef<HTMLButtonElement, SustainabilityCategoryButtonProps>(
  function SustainabilityCategoryButton(
    { category, selected, showIcon = false, forceHover, className, children, type = 'button', ...props },
    ref,
  ) {
    const tag = SUSTAINABILITY_TAG_CLASSES[category]
    return (
      <button
        ref={ref}
        type={type}
        {...stateProps(selected)}
        {...(forceHover ? { 'data-hovered': '' } : {})}
        {...props}
        className={cn(TAG_ROOT, className)}
      >
        <ButtonShape
          shape="very-oval"
          className={cn(tag.bg, tag.bgActive)}
          outlineClassName="text-content-weak group-selected:text-content-text group-selected:[&_path]:stroke-[1.25px]"
        />
        <span className={cn(TAG_LABEL, 'text-content-text')}>
          <span className={TAG_TEXT}>{children}</span>
          {showIcon ? <IconCheck6 aria-hidden className="size-3 shrink-0" /> : null}
        </span>
      </button>
    )
  },
)
SustainabilityCategoryButton.displayName = 'SustainabilityCategoryButton'

export interface NutmixerCategoryNavigationProps {
  categories?: readonly { value: string; label: string }[]
  className?: string
  'aria-label'?: string
}

/**
 * Figma: Switches / NutmixerCategoryNavigation (8555:24862) · Selected=Nüsse|Beeren|Obst.
 * tablist mit Umbruch, gap-md-sm, pb-md, Fläche surface. Braucht ein
 * umgebendes <Tabs> (components/ui/tabs), das den Wert hält.
 */
export function NutmixerCategoryNavigation({
  categories = NUTMIXER_CATEGORIES,
  className,
  ...aria
}: NutmixerCategoryNavigationProps) {
  return (
    <TabsPrimitive.List
      aria-label={aria['aria-label'] ?? 'Kategorien'}
      className={cn('flex w-full flex-wrap items-center justify-center gap-md-sm bg-surface pb-md', className)}
    >
      {categories.map((c) => (
        <TabsPrimitive.Trigger key={c.value} value={c.value} asChild>
          <NutmixerTab>{c.label}</NutmixerTab>
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
  )
}

export interface SustainabilityCategoryNavigationProps {
  categories?: readonly { key: SustainabilityCategory; label: string }[]
  className?: string
  'aria-label'?: string
}

/**
 * Figma: Switches / SustainabilitCategoryNavigation (8126:25292) ·
 * Selected=No Plane|Umwelt|Fairness|Engagement. tablist mit Umbruch,
 * gap-md-l (Zeile) / gap-md-sm (Spalte). Braucht ein umgebendes <Tabs>;
 * die Tab-Werte sind die Kategorie-Schlüssel.
 */
export function SustainabilityCategoryNavigation({
  categories = SUSTAINABILITY_CATEGORIES,
  className,
  ...aria
}: SustainabilityCategoryNavigationProps) {
  return (
    <TabsPrimitive.List
      aria-label={aria['aria-label'] ?? 'Nachhaltigkeit'}
      className={cn('flex w-full flex-wrap items-center justify-center gap-x-md-l gap-y-md-sm', className)}
    >
      {categories.map((c) => (
        <TabsPrimitive.Trigger key={c.key} value={c.key} asChild>
          <SustainabilityCategoryButton category={c.key}>{c.label}</SustainabilityCategoryButton>
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
  )
}

export { NUTMIXER_CATEGORIES }
