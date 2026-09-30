import Link from 'next/link'

import { BlockElement } from '@/components/design-system/components/block-element'
import { LogoTarabao } from '@/components/design-system/icons/figma-icons'
import type { FooterModel, NavGroupModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

function FooterGroup({ group, className }: { group: NavGroupModel; className?: string }) {
  const headingId = `footer-${group.id}`
  return (
    <div className={cn('flex min-w-block-inline-min flex-col gap-xs', className)}>
      <p id={headingId} className="type-navigation-side-navigation-main-category">
        {group.title}
      </p>
      <ul aria-labelledby={headingId} className="flex flex-col gap-xxs">
        {group.links.map((link, i) => (
          <li key={i} className="type-navigation-side-navigation-sub-category">
            {link.href ? (
              <Link
                href={link.href}
                className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg"
              >
                {link.label}
              </Link>
            ) : (
              link.label
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const END = 'items-end text-right'

/**
 * Figma: Navigation / Footer (6315:16206) · viewport-range=base|md|lg.
 * Oben eine Linie (content-text, 1 px), darunter ein Raster ab pt-xl:
 * base 2 Spalten (gap-x sm, gap-y lg), md 3 und lg 4 Spalten (gap-x xl, gap-y md-l).
 * Kopf: Logo (base 229 × 53, sonst 296 × 69) und Slogan LUMOSKY 30 in Versalien,
 * rechtsbündig in max-w-block-max. Link-Gruppen Navigation/SideNavigation, unten
 * Components / BlockElement Newsletter und Widerruf. Die Platzierung je Breakpoint folgt Figma.
 */
export function Footer({ footer, className }: { footer: FooterModel; className?: string }) {
  return (
    <footer data-slot="footer" className={cn('w-full bg-surface py-md-l text-content-text', className)}>
      <div className="mx-auto flex w-full max-w-content flex-col px-md-l">
        <div className="grid w-full grid-cols-2 gap-x-sm gap-y-lg border-t border-content-text pt-xl md:grid-cols-3 md:gap-x-xl md:gap-y-md-l lg:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-md-sm pb-md-l md:col-span-1 md:w-110 md:pb-zero lg:col-span-3 lg:w-auto">
            <Link
              href="/"
              aria-label="tarabao – zur Startseite"
              className="inline-flex w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-primary-bg"
            >
              <LogoTarabao className="h-[3.3125rem] w-auto md:h-[4.3125rem]" />
            </Link>
            <p className="w-full text-right font-display text-30 leading-none whitespace-pre-line uppercase md:max-w-block-max">
              {footer.sloganCompact ? (
                <>
                  <span className="md:hidden">{footer.sloganCompact}</span>
                  <span className="max-md:hidden">{footer.slogan}</span>
                </>
              ) : (
                footer.slogan
              )}
            </p>
          </div>
          <FooterGroup
            group={footer.about}
            className="col-start-1 row-start-2 md:col-start-3 md:row-start-1 md:items-end md:justify-self-end md:text-right lg:col-start-4"
          />
          <FooterGroup
            group={footer.payment}
            className={cn(
              'col-start-2 row-start-2',
              END,
              'md:col-start-1 md:row-start-3 md:items-start md:text-left',
              'lg:row-start-2',
            )}
          />
          <FooterGroup group={footer.service} className="col-start-1 row-start-3 md:col-start-2 md:row-start-2" />
          <FooterGroup group={footer.contact} className="col-start-1 row-start-4 md:row-start-2 lg:col-start-3" />
          <FooterGroup
            group={footer.legal}
            className={cn(
              'col-start-2 row-span-2 row-start-3',
              END,
              'md:col-start-3 md:row-start-2',
              'lg:col-start-4 lg:row-span-1',
            )}
          />
          <div className="col-span-2 row-start-5 grid grid-cols-1 gap-y-lg md:col-span-3 md:row-start-4 md:grid-cols-2 md:gap-md-l lg:col-span-4 lg:row-start-3">
            <BlockElement variant="newsletter" />
            <BlockElement variant="widerruf" className="md:justify-self-end" />
          </div>
        </div>
      </div>
    </footer>
  )
}
