import Link from 'next/link'

import { ContentBasic } from '@/components/design-system/content-modules/content-modules'
import { PageTemplate } from '@/components/design-system/templates/page'
import { Section } from '@/components/design-system/templates/section'
import { FOOTER, NAV_GROUPS, PROMO } from '@/lib/fixtures'
import { CATEGORY_TREE } from '@/lib/shop/catalog'
import { LOREM, STATIC_PAGES } from '@/lib/shop/content'
import { routes } from '@/lib/shop/routes'
import type { LibraryEntry } from '@/library/types'

const chrome = { header: { navGroups: NAV_GROUPS, promo: PROMO, cartCount: 1, loggedIn: true }, footer: FOOTER }
const frame = 'w-full overflow-hidden border border-content-weak'
const r = routes()

export const pageTemplateEntry: LibraryEntry = {
  id: 'templates-page',
  figma: 'Templates / Page',
  nodeId: '8358:53818',
  code: '<PageTemplate header={…} footer={footer} breadcrumb={…} addedToCart={…}>…Sections…</PageTemplate>',
  note: 'Header, optional Breadcrumb, bis zu zehn Section-Slots, Footer; oberste Ebene ist das Overlay „Deinem Warenkorb hinzugefügt“ (AddedToCartOverlay, fixiert).',
  render: () => (
    <div className={frame}>
      <PageTemplate
        {...chrome}
        breadcrumb={{
          items: [
            { label: 'Bereich der Webseite', href: '#' },
            { label: 'Überkategorie', href: '#' },
          ],
          current: 'Your current destination',
        }}
      >
        <Section aria-label="Section-Slot">
          <ContentBasic headline="Section-Slot" paragraphs={[LOREM]} />
        </Section>
      </PageTemplate>
    </div>
  ),
}

type RouteLink = { label: string; href: string; note?: string }

/** Die Seiten laufen als echte Routen im Shop; die Bibliothek verlinkt sie. */
function RouteLinks({ links }: { links: RouteLink[] }) {
  return (
    <ul className="flex w-full flex-col gap-xs">
      {links.map((l) => (
        <li key={l.href} className="flex flex-wrap items-baseline gap-x-md gap-y-xxs">
          <Link href={l.href} className="type-default-text-lg underline">
            {l.label}
          </Link>
          <code className="type-default-text-s text-content-weak">{l.href}</code>
          {l.note ? <span className="type-default-text-s text-content-weak">{l.note}</span> : null}
        </li>
      ))}
    </ul>
  )
}

const nuesse = CATEGORY_TREE.find((c) => c.slug === 'nuesse')!

export const pageEntries: LibraryEntry[] = [
  {
    id: 'pages-shop',
    figma: 'Alle Kategorien · Alle Produkte · Kategorieseite Nüsse · Unterkategorie Würzige Snacks · Nuss-Mixer',
    nodeId: '9250:35515',
    code: 'app/[countryCode]/page.tsx · store · categories/[...category] · nussmixer',
    note: 'Startseite = {Alle Kategorien}, solange Figma keine Startseite hat (offene Punkte 34). Logo und „Zur Startseite“ führen hierher. Kategorie → Unterkategorie → Produkt sind über Nav, Karten und Breadcrumb verbunden.',
    render: () => (
      <RouteLinks
        links={[
          { label: 'Alle Kategorien (Startseite)', href: r.home },
          { label: 'Alle Produkte', href: r.store },
          {
            label: 'Kategorieseite Nüsse',
            href: r.category('nuesse'),
            note: 'Sections / CategoryPreview je Unterkategorie',
          },
          ...nuesse.children
            .slice(0, 2)
            .map((s) => ({ label: `Unterkategorie ${s.title}`, href: r.category('nuesse', s.slug) })),
          { label: 'Nuss-Mixer', href: r.nutmixer },
        ]}
      />
    ),
  },
  {
    id: 'pages-product',
    figma: 'Produktseite Jancys Curry-Cashews · Tamari-Sesam-Cashews · Macadamia süß-salzig · Ananasstücke schokoliert',
    nodeId: '8232:25333',
    code: 'app/[countryCode]/products/[handle]/page.tsx → <ProductPage product={…} />',
    note: 'Dieselbe Seite je Handle; in Figma wählt der Modus-Pin __Products / Doypacks die Sorte. „Das könnte Dich auch interessieren“ zeigt die drei anderen Sorten.',
    render: () => (
      <RouteLinks
        links={[
          { label: 'Jancys Curry-Cashews', href: r.product('jancys-curry-cashews') },
          { label: 'Tamari-Sesam-Cashews', href: r.product('tamari-sesam-cashews') },
          { label: 'Macadamia süß-salzig', href: r.product('macadamia-suess-salzig') },
          { label: 'Ananasstücke schokoliert', href: r.product('ananasstuecke-schokoliert') },
        ]}
      />
    ),
  },
  {
    id: 'pages-cart-checkout',
    figma: 'Warenkorb · Check-Out Workflow 06-01 … 06-17',
    nodeId: '9291:37238',
    code: 'app/[countryCode]/cart · checkout · checkout/[step] · checkout/confirmation',
    note: 'Die Schritte sind Momentaufnahmen mit Beispieldaten; im Shop steuern Medusa-Aufrufe den Wechsel.',
    render: () => (
      <RouteLinks
        links={[
          { label: 'Warenkorb', href: r.cart },
          { label: 'Kasse: Wer gibt die Bestellung auf?', href: r.checkout() },
          { label: 'Kasse: Anmeldung (ReturningCustomer)', href: `${r.checkout()}/identification` },
          { label: 'Kasse: Lieferung', href: `${r.checkout()}/delivery` },
          { label: 'Kasse: Zahlung', href: `${r.checkout()}/payment` },
          { label: 'Kasse: Prüfen & kaufen', href: `${r.checkout()}/final` },
          { label: 'Bestellbestätigung', href: r.orderConfirmation },
        ]}
      />
    ),
  },
  {
    id: 'pages-account',
    figma: 'Dein Account · Dein Account / Nicht angemeldet',
    nodeId: '8975:27217',
    code: 'app/[countryCode]/account · account/login',
    render: () => (
      <RouteLinks
        links={[
          { label: 'Dein Account', href: r.account },
          { label: 'Dein Account / Nicht angemeldet', href: r.login },
        ]}
      />
    ),
  },
  {
    id: 'pages-blog',
    figma: 'Unser Blog · Rezeptseite Blog / Recipe',
    nodeId: '8927:28029',
    code: 'app/[countryCode]/blog · blog/[slug]',
    note: 'Die erste Kachel auf „Unser Blog“ führt zur Rezeptseite, die übrigen sind Platzhalter.',
    render: () => (
      <RouteLinks
        links={[
          { label: 'Unser Blog', href: r.blog },
          { label: 'Rezeptseite Vegane Pistazienschnecken', href: r.post('vegane-pistazienschnecken') },
        ]}
      />
    ),
  },
  {
    id: 'pages-static',
    figma:
      'Unternehmen und Rechtliches: B2B · Tarabao für Dein Team · Über uns · … · Impressum · AGB · Widerrufsformular …',
    nodeId: '9242:32057',
    code: 'app/[countryCode]/[slug]/page.tsx → <LegalPage /> · <CompanyPage /> · OrderCancellation',
    note: 'Rechtstexte als ContentModules / Basic, Unternehmensseiten als CMS-Kompositionen, das Widerrufsformular mit Components / OrderCancellation.',
    render: () => (
      <RouteLinks
        links={Object.entries(STATIC_PAGES).map(([slug, page]) => ({
          label: page.kind === 'cancellation' ? 'Widerrufsformular' : page.title,
          href: r.page(slug),
        }))}
      />
    ),
  },
]
