import Link from 'next/link'
import * as React from 'react'

import { IconChevronRight14, IconDots } from '@/components/icons/figma-icons'
import { cn } from '@/lib/utils'

export type BreadcrumbItem = { label: string; href?: string }

export interface BreadcrumbProps {
  /**
   * Pfad wie in der Storefront (`modules/common/components/breadcrumbs`): Der erste Eintrag ist die
   * Startseite, der letzte die aktuelle Seite ohne Link.
   */
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Figma: Primitives / Breadcrumb (3155:5202).
 * Zeile h20 px-md-l, rechtsbündig, max-w-content: „Du bist hier:“, Dots,
 * je Ebene Pfeil (arrow right 14) + Navigation/Route, zuletzt Navigation/Endpoint.
 * Die Dots stehen für die Startseite und verlinken sie. Ihr Name steht im aria-label.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const [home, ...rest] = items
  const current = rest[rest.length - 1]
  const path = rest.slice(0, -1)

  return (
    <nav aria-label="Brotkrumen" className={cn('flex w-full px-md-l', className)}>
      <ol className="flex w-full max-w-content flex-wrap items-center justify-end gap-md-sm">
        <li className="type-navigation-endpoint text-content-weak">Du bist hier:</li>
        {home ? (
          <li className="flex h-5 w-4 items-center justify-center text-content-text">
            {home.href ? (
              <Link href={home.href} aria-label={home.label} className="flex items-center">
                <IconDots aria-hidden />
              </Link>
            ) : (
              <span role="img" aria-label={home.label} className="flex items-center">
                <IconDots aria-hidden />
              </span>
            )}
          </li>
        ) : null}
        {path.map((item) => (
          <li key={item.label} className="flex h-5 items-center gap-sm">
            <IconChevronRight14 aria-hidden className="text-content-text" />
            {item.href ? (
              <Link href={item.href} className="type-navigation-route text-content-text">
                {item.label}
              </Link>
            ) : (
              <span className="type-navigation-route text-content-text">{item.label}</span>
            )}
          </li>
        ))}
        {current ? (
          <li className="flex h-5 items-center gap-sm">
            <IconChevronRight14 aria-hidden className="text-content-text" />
            <span aria-current="page" className="type-navigation-endpoint text-content-weak">
              {current.label}
            </span>
          </li>
        ) : null}
      </ol>
    </nav>
  )
}
