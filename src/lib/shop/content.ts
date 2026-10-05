import type { LegalBlock } from '@modules/pages/templates/legal-page'

/**
 * Inhalte der statischen Seiten und des Blogs (Beispieltexte). Im Shop liefert sie das CMS.
 * Die Slugs sind die Routen `/[countryCode]/page/<slug>` bzw. `/[countryCode]/blog/<slug>`.
 */

export const LOREM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'

const blocks = (...headlines: string[]): LegalBlock[] => headlines.map((headline) => ({ headline, text: LOREM }))

export type StaticPage =
  | { kind: 'legal'; title: string; align?: 'left' | 'center'; blocks: LegalBlock[] }
  | { kind: 'company'; title: string; intro: string; sections: { headline: string; text: string }[]; contact?: boolean }

/** Seiten aus 2.2 (Unternehmen, Rechtliches); Figma zeigt alle als Templates / Page mit ContentModules. */
export const STATIC_PAGES: Record<string, StaticPage> = {
  impressum: {
    kind: 'legal',
    title: 'Impressum',
    blocks: blocks('Angaben gemäß § 5 DDG', 'Kontakt', 'Registereintrag', 'Umsatzsteuer-ID'),
  },
  agb: {
    kind: 'legal',
    title: 'Allgemeine Geschäftsbedingungen',
    blocks: blocks('Geltungsbereich', 'Vertragsschluss', 'Preise und Versand', 'Zahlung', 'Gewährleistung'),
  },
  datenschutzerklaerung: {
    kind: 'legal',
    title: 'Datenschutzerklärung',
    blocks: blocks('Verantwortliche Stelle', 'Erhebung und Speicherung', 'Weitergabe von Daten', 'Deine Rechte'),
  },
  widerrufsrecht: {
    kind: 'legal',
    title: 'Widerrufsrecht',
    blocks: blocks('Widerrufsbelehrung', 'Folgen des Widerrufs', 'Ausnahmen vom Widerrufsrecht'),
  },
  versandrichtlinien: {
    kind: 'legal',
    title: 'Versandrichtlinien',
    blocks: blocks('Versandkosten', 'Lieferzeit', 'Versand ins Ausland', 'Rücksendung', 'Pfandgläser'),
  },
  barrierefreiheit: {
    kind: 'legal',
    title: 'Barrierefreiheitserklärung',
    blocks: blocks('Stand der Vereinbarkeit', 'Nicht barrierefreie Inhalte', 'Feedback und Kontakt'),
  },
  b2b: {
    kind: 'company',
    title: 'B2B',
    intro: LOREM,
    sections: [
      { headline: 'Für Bio- und Unverpackt-Läden', text: LOREM },
      { headline: 'Für Gastronomie', text: LOREM },
    ],
  },
  teams: {
    kind: 'company',
    title: 'Tarabao für Dein Team',
    intro: LOREM,
    sections: [{ headline: 'Snacks fürs Büro', text: LOREM }],
    contact: true,
  },
  'ueber-uns': {
    kind: 'company',
    title: 'Über uns',
    intro: LOREM,
    sections: [
      { headline: 'Unsere Geschichte', text: LOREM },
      { headline: 'Unsere Manufaktur', text: LOREM },
    ],
  },
  'unser-team': {
    kind: 'company',
    title: 'Unser Team',
    intro: LOREM,
    sections: [{ headline: 'Wer bei Tarabao arbeitet', text: LOREM }],
  },
  'unser-ansatz': {
    kind: 'company',
    title: 'Unser Ansatz',
    intro: LOREM,
    sections: [{ headline: 'Bio, fair, direkt', text: LOREM }],
  },
  partnerschaften: {
    kind: 'company',
    title: 'Unsere Partnerschaften',
    intro: LOREM,
    sections: [{ headline: 'Unsere Lieferanten', text: LOREM }],
  },
  nachhaltigkeit: {
    kind: 'company',
    title: 'Nachhaltigkeit',
    intro: LOREM,
    sections: [
      { headline: 'Anbau und Umwelt', text: LOREM },
      { headline: 'Lieferkette', text: LOREM },
    ],
  },
  verpackungen: {
    kind: 'company',
    title: 'Verpackungen',
    intro: LOREM,
    sections: [
      { headline: 'Pfandglas', text: LOREM },
      { headline: 'Doypack', text: LOREM },
    ],
  },
  karriere: {
    kind: 'company',
    title: 'Karriere',
    intro: LOREM,
    sections: [{ headline: 'Offene Stellen', text: LOREM }],
  },
}

export type BlogPostContent = {
  slug: string
  title: string
  intro: string
}

/** Rezeptseite {Blog / Recipe}: die erste Kachel auf „Unser Blog“ führt hierher. */
export const BLOG_POSTS: BlogPostContent[] = [
  { slug: 'vegane-pistazienschnecken', title: 'Vegane Pistazienschnecken', intro: LOREM },
]
