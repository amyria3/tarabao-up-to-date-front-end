import type { ElementType, ReactNode } from 'react'

import type { GlobalTheme, LivelyTheme, SpecialTheme } from '@/lib/design-system/themes'
import { cn } from '@/lib/utils'

export type ThemeScopeProps = {
  children: ReactNode
  className?: string
  /** Figma: Modus-Pin von Clrs / Color Modes */
  theme?: GlobalTheme
  /** Figma: Variante Variant an Cards / MegaCard (Clrs / Mega Cards) */
  livelyTheme?: LivelyTheme
  /** Figma: Modus-Pin von Clrs / Special */
  specialTheme?: SpecialTheme
  /** Element des Theme-Containers, z. B. section oder article */
  as?: ElementType
  'data-testid'?: string
}

/**
 * Setzt eine Theme-Achse für den ganzen Teilbaum — wie ein Modus-Pin in Figma.
 * API wie apps/medusa-storefront/src/components/ui/theme-scope.tsx, dazu `as`.
 */
export function ThemeScope({
  children,
  className,
  theme,
  livelyTheme,
  specialTheme,
  as: Comp = 'div',
  'data-testid': dataTestId,
}: ThemeScopeProps) {
  return (
    <Comp
      className={cn('bg-surface text-content-text', className)}
      data-testid={dataTestId}
      {...(theme ? { 'data-theme': theme } : {})}
      {...(livelyTheme ? { 'data-lively-theme': livelyTheme } : {})}
      {...(specialTheme ? { 'data-special-theme': specialTheme } : {})}
    >
      {children}
    </Comp>
  )
}
