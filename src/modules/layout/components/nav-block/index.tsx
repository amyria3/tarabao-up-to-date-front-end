import Link from 'next/link'

import type { NavGroupModel, NavLinkModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

const LINK =
  'hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg'

/**
 * Link und Text stehen als Block im <li>. Inline würde das <li> seine Zeile mit der
 * Zeilenhöhe des Body bauen. So gilt die Zeilenhöhe des Textstils (Figma 100 %).
 */
function NavLinkItem({ link, className }: { link: NavLinkModel; className: string }) {
  return (
    <li>
      {link.href ? (
        <Link href={link.href} className={cn('block w-fit', className, LINK)}>
          {link.label}
        </Link>
      ) : (
        <span className={cn('block w-fit', className)}>{link.label}</span>
      )}
    </li>
  )
}

/**
 * Figma: Navigation / NavBlocks (3164:5344). Link-Gruppe in der <nav>: Überschrift
 * Navigation/FullScreen/MainCategory, darunter die Links Navigation/FullScreen/SubCategory
 * (gap-sm, Liste gap-xxs). Ohne Titel (Figma „Andere“, „ALLE PRODUKTE“) stehen die Links
 * selbst im Stil MainCategory. Breite min nav-block-min, max nav-block-max.
 * HTML laut Figma: Überschrift per aria-labelledby + <ul>, keine <section>.
 */
export function NavBlock({ group, className }: { group: NavGroupModel; className?: string }) {
  const headingId = `nav-block-${group.id}`
  return (
    <div
      data-slot="nav-block"
      className={cn('flex w-full min-w-nav-block-min max-w-nav-block-max flex-col gap-sm text-content-text', className)}
    >
      {group.title ? (
        <>
          <p id={headingId} className="type-navigation-full-screen-main-category">
            {group.title}
          </p>
          <ul aria-labelledby={headingId} className="flex flex-col gap-xxs">
            {group.links.map((link, i) => (
              <NavLinkItem key={i} link={link} className="type-navigation-full-screen-sub-category" />
            ))}
          </ul>
        </>
      ) : (
        <ul className="flex flex-col gap-sm">
          {group.links.map((link, i) => (
            <NavLinkItem key={i} link={link} className="type-navigation-full-screen-main-category" />
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * Figma: Navigation / Nav (2761:6772) · viewport-range=base|md|lg, Layout=Grid.
 * Raster aus NavBlocks: base 2, md 3, lg 4 Spalten, Abstände md-l, py-xl.
 * Die Blöcke laufen zeilenweise in der Reihenfolge der Daten (wie in Figma).
 * Figma gibt allen Zeilen die gleiche Höhe (FLEX 1), sodass hohe Blöcke überlappen;
 * hier bestimmt der Inhalt die Zeilenhöhe.
 */
export function NavMenu({ groups, className, id }: { groups: NavGroupModel[]; className?: string; id?: string }) {
  return (
    <div
      id={id}
      data-slot="nav-menu"
      className={cn('grid w-full grid-cols-2 gap-md-l py-xl md:grid-cols-3 lg:grid-cols-4', className)}
    >
      {groups.map((group) => (
        <NavBlock key={group.id} group={group} />
      ))}
    </div>
  )
}
