import type { SVGProps } from 'react'

import { IconArrowDown24, IconArrowDown30, IconArrowUp24, IconArrowUp30 } from '@/components/icons/figma-icons'
import { IconChevronDown14, IconChevronDown6, IconChevronUp14, IconChevronUp6 } from '@/components/icons/figma-shapes'
import { cn } from '@/lib/utils'

export type ArrowUpOrDownSize = 30 | 22 | 14 | 6
export type ArrowUpOrDownVariant = 'up' | 'down'

const ICONS = {
  30: { up: IconArrowUp30, down: IconArrowDown30 },
  22: { up: IconArrowUp24, down: IconArrowDown24 },
  14: { up: IconChevronUp14, down: IconChevronDown14 },
  6: { up: IconChevronUp6, down: IconChevronDown6 },
} as const

export type ArrowUpOrDownProps = SVGProps<SVGSVGElement> & {
  variant?: ArrowUpOrDownVariant
  size?: ArrowUpOrDownSize
}

/**
 * Figma: ArrowUpOrDown (283:640) · Variant=up|down, Size=6|14|22|30.
 * Pfeil in content-text, z. B. für Disclosure und Dropdowns.
 */
export function ArrowUpOrDown({ variant = 'up', size = 22, className, ...props }: ArrowUpOrDownProps) {
  const Icon = ICONS[size][variant]
  return <Icon aria-hidden className={cn('shrink-0 text-content-text', className)} {...props} />
}
