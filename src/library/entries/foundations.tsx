import { ICON_REGISTRY } from '@/components/icons/figma-icons'
import { ButtonShape, type ButtonShapeKind } from '@/components/ui/button-shape'
import { ThemeScope } from '@/components/ui/theme-scope'
import { GLOBAL_THEMES, LIVELY_THEMES, SPECIAL_THEMES } from '@/lib/design-system/themes'
import { cn } from '@/lib/utils'
import { FOUNDATIONS } from '@/library/generated/foundations'
import type { LibraryEntry } from '@/library/types'

/* Die Übersichten lesen alle Werte aus app.css (scripts/gen-foundations.mjs).
   Farbfelder nutzen die semantische Variable (var(--surface-color) …) inline, damit jede Spalte den Wert ihres
   Modus zeigt — nur hier in der Bibliothek, nie in Komponenten. */

type ColorUtility = (typeof FOUNDATIONS.colorUtilities)[number]

function groupBy<T>(items: readonly T[], key: (t: T) => string) {
  const map = new Map<string, T[]>()
  for (const item of items) {
    const k = key(item) || 'Weitere'
    map.set(k, [...(map.get(k) ?? []), item])
  }
  return [...map.entries()]
}

function Swatch({ cssVar, className }: { cssVar: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('block h-lg w-full min-w-10 rounded-[0.125rem] border border-content-weak/20', className)}
      style={{ background: `var(${cssVar})` }}
    />
  )
}

const GLOBAL_GROUPS = new Set(
  FOUNDATIONS.colorUtilities
    .filter((c) => FOUNDATIONS.globalThemes['cole-tint-surface-warm'].some((t) => t.name === c.source))
    .map((c) => c.group),
)

function ColorTable({
  utilities,
  themes,
  axis,
}: {
  utilities: ColorUtility[]
  themes: readonly string[]
  axis: string
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-xs text-left type-default-text-s">
        <thead>
          <tr>
            <th scope="col" className="w-1/4 font-semibold">
              Utility / Token
            </th>
            {themes.map((t) => (
              <th key={t} scope="col" className="font-semibold">
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {utilities.map((c) => (
            <tr key={c.utility}>
              <th scope="row" className="align-middle font-normal">
                <code className="block">{c.utility}</code>
                <span className="text-content-weak">--{c.source}</span>
              </th>
              {themes.map((t) => (
                <td key={t} className="p-zero">
                  <ThemeScope
                    {...(axis === 'theme' ? { theme: t as never } : {})}
                    {...(axis === 'lively' ? { livelyTheme: t as never } : {})}
                    {...(axis === 'special' ? { specialTheme: t as never } : {})}
                    className="p-xxs"
                  >
                    <Swatch cssVar={`--${c.source}`} />
                  </ThemeScope>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const SHAPES: ButtonShapeKind[] = ['oblong', 'oval', 'very-oval', 'very-oval-turned']

export const foundationEntries: LibraryEntry[] = [
  {
    id: 'foundations-color-modes',
    figma: 'Clrs / Color Modes',
    code: 'data-theme="cole-tint-surface-warm" … bg-surface, text-content-text, bg-btn-primary-bg …',
    note: `${GLOBAL_THEMES.length} Modi mit je ${FOUNDATIONS.globalThemes['cole-tint-surface-warm'].length} semantischen Tokens. Der Modus kaskadiert über <ThemeScope theme>.`,
    render: () => (
      <div className="flex flex-col gap-lg">
        {groupBy(
          FOUNDATIONS.colorUtilities.filter((c) => GLOBAL_GROUPS.has(c.group)),
          (c) => c.group,
        ).map(([group, utilities]) => (
          <section key={group} className="flex flex-col gap-xs">
            <h3 className="type-h3">{group}</h3>
            <ColorTable utilities={utilities} themes={GLOBAL_THEMES} axis="theme" />
          </section>
        ))}
      </div>
    ),
  },
  {
    id: 'foundations-mega-cards',
    figma: 'Clrs / Mega Cards',
    code: 'data-lively-theme="orange-black" … bg-megacard-section-bg, text-megacard-btn-primary-bg …',
    note: 'Parallele Achse für Cards / MegaCard und die LG-Buttons darin.',
    render: () => (
      <ColorTable
        utilities={FOUNDATIONS.colorUtilities.filter((c) => c.utility.startsWith('megacard-'))}
        themes={LIVELY_THEMES}
        axis="lively"
      />
    ),
  },
  {
    id: 'foundations-special',
    figma: 'Clrs / Special',
    code: 'data-special-theme="lilac"',
    note: 'VoucherCard und PromoBar. forest ist Standard.',
    render: () => (
      <div className="grid grid-cols-1 gap-sm md:grid-cols-2">
        {SPECIAL_THEMES.map((t) => (
          <ThemeScope key={t} specialTheme={t} className="flex flex-col gap-xs p-md">
            <p className="type-navigation-endpoint text-content-weak">{t}</p>
            {FOUNDATIONS.special[t].map((d) => (
              <div key={d.name} className="flex items-center gap-sm type-default-text-s">
                <span
                  aria-hidden
                  className="size-lg shrink-0 rounded-[0.125rem] border border-content-weak/20"
                  style={{ background: `var(--${d.name})` }}
                />
                <code>--{d.name}</code>
              </div>
            ))}
          </ThemeScope>
        ))}
      </div>
    ),
  },
  {
    id: 'foundations-single-mode',
    figma: 'Clrs / Filter Panel · Search · Sustainability Tags · NutmixerTags',
    code: 'bg-filter-chip-bg, text-search-…, text-tag-…, text-nutmixer-tag-…',
    note: 'Einzelmodus-Sammlungen: folgen keinem data-theme.',
    render: () => (
      <div className="flex flex-col gap-lg">
        {groupBy(FOUNDATIONS.singleMode, (d) => d.group).map(([group, decls]) => (
          <section key={group} className="flex flex-col gap-xs">
            <h3 className="type-h3">{group}</h3>
            <div className="grid grid-cols-1 gap-xs md:grid-cols-2 lg:grid-cols-4">
              {decls.map((d) => (
                <div key={d.name} className="flex items-center gap-sm type-default-text-s">
                  <span
                    aria-hidden
                    className="size-lg shrink-0 rounded-[0.125rem] border border-content-weak/20"
                    style={{ background: `var(--${d.name})` }}
                  />
                  <code className="min-w-zero break-all">--{d.name}</code>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    ),
  },
  {
    id: 'foundations-primitives',
    figma: 'Clrs / Primitives',
    code: '--cole-tint-100 … (nie direkt in Komponenten)',
    note: 'Rohwerte. Komponenten nutzen ausschließlich semantische Tokens.',
    render: () => (
      <div className="flex flex-col gap-lg">
        {groupBy(FOUNDATIONS.primitives, (d) => d.group).map(([group, decls]) => (
          <section key={group} className="flex flex-col gap-xs">
            <h3 className="type-default-text-md font-semibold">{group}</h3>
            <div className="grid grid-cols-2 gap-xs md:grid-cols-4 lg:grid-cols-6">
              {decls.map((d) => (
                <figure key={d.name} className="flex flex-col gap-xxs type-default-text-s">
                  <span
                    aria-hidden
                    className="block h-10 w-full rounded-[0.125rem] border border-content-weak/20"
                    style={{ background: d.value }}
                  />
                  <figcaption>
                    <code className="block break-all">--{d.name}</code>
                    <span className="text-content-weak">{d.value}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    ),
  },
  {
    id: 'foundations-text-styles',
    figma: 'Text Styles',
    code: 'type-h1, type-buttons-md, type-input-label-sm …',
    note: `${FOUNDATIONS.textStyles.length} Textstile, je eine Utility-Klasse. Familie, Größe, Gewicht, Zeilenhöhe und Laufweite kommen aus den Tokens.`,
    render: () => (
      <ul className="flex flex-col gap-md">
        {FOUNDATIONS.textStyles.map((s) => (
          <li key={s.utility} className="grid grid-cols-1 gap-xxs border-b border-content-weak/20 pb-sm lg:grid-cols-3">
            <div className="type-default-text-s">
              <code className="block">{s.utility}</code>
              <span className="text-content-weak">{s.figma}</span>
            </div>
            <p className={cn('min-w-zero break-words text-content-text lg:col-span-2', s.utility)}>
              Bio-Cashews aus fairem Handel
            </p>
            <p className="type-default-text-s text-content-weak lg:col-span-3">
              {Object.entries(s.props)
                .map(([k, v]) => `${k}: ${v}`)
                .join(' · ')}
            </p>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'foundations-fonts',
    figma: 'Text Styles (families) · Typografy · leading · tracking',
    code: 'font-display, font-accent-one, font-accent-two, font-body · text-10 … text-60 · leading-* · tracking-*',
    render: () => (
      <div className="flex flex-col gap-lg">
        <ul className="flex flex-col gap-sm">
          {FOUNDATIONS.fonts.map((f) => (
            <li key={f.name} className="flex flex-col gap-xxs">
              <span className="type-default-text-s text-content-weak">
                font-{f.name} · {f.value} {f.comment ? `· ${f.comment}` : ''}
              </span>
              <span className="text-32" style={{ fontFamily: `var(--font-${f.name})` }}>
                Nussmixer · Herkunft & Impact
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-end gap-md">
          {FOUNDATIONS.textSizes.map((t) => (
            <span key={t.name} className="flex flex-col items-start">
              <span style={{ fontSize: `var(--text-${t.name})` }}>Aa</span>
              <code className="type-default-text-s text-content-weak">text-{t.name}</code>
            </span>
          ))}
        </div>
        <dl className="grid grid-cols-1 gap-xs type-default-text-s md:grid-cols-2">
          {[
            ...FOUNDATIONS.leading.map((l) => ['leading-' + l.name, l.value, l.comment]),
            ...FOUNDATIONS.tracking.map((l) => ['tracking-' + l.name, l.value, l.comment]),
          ].map(([name, value, comment]) => (
            <div key={name} className="flex gap-sm">
              <dt>
                <code>{name}</code>
              </dt>
              <dd className="text-content-weak">
                {value} · {comment}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
  {
    id: 'foundations-spacing',
    figma: 'Box Spacing + Gaps',
    code: 'p-md, gap-xs, px-md-l … (zero … xxxl)',
    note: 'Benannte Abstände. Die numerische Skala (1 twuc = 0.25 rem) bleibt aktiv, siehe ABWEICHUNGEN.md.',
    render: () => (
      <ul className="flex flex-col gap-xs">
        {FOUNDATIONS.spacing.map((s) => (
          <li key={s.name} className="flex items-center gap-md type-default-text-s">
            <code className="w-24 shrink-0">{s.name}</code>
            <span aria-hidden className="h-sm bg-btn-primary-bg" style={{ width: `var(--spacing-${s.name})` }} />
            <span className="text-content-weak">
              {s.value} {s.comment}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'foundations-widths',
    figma: 'Lyt scl / Width · Breakpoints',
    code: 'min-w-btn-min, max-w-block-max, max-w-content · md: · lg:',
    note: 'Breakpoints: nur md und lg. Werte je Modus setzt :root ab md/lg neu.',
    render: () => (
      <div className="flex flex-col gap-lg">
        <dl className="flex flex-wrap gap-md type-default-text-md">
          {FOUNDATIONS.breakpoints.map((b) => (
            <div key={b.name} className="flex gap-xs">
              <dt>
                <code>{b.name}:</code>
              </dt>
              <dd className="text-content-weak">
                {b.value} · {b.comment}
              </dd>
            </div>
          ))}
        </dl>
        <table className="w-full text-left type-default-text-s">
          <thead>
            <tr>
              <th scope="col" className="py-xxs font-semibold">
                Token
              </th>
              <th scope="col" className="py-xxs font-semibold">
                Wert (base)
              </th>
              <th scope="col" className="py-xxs font-semibold">
                Figma
              </th>
            </tr>
          </thead>
          <tbody>
            {FOUNDATIONS.containers.map((c) => (
              <tr key={c.name} className="border-t border-content-weak/20">
                <td className="py-xxs">
                  <code>--container-{c.name}</code>
                </td>
                <td className="py-xxs">{c.value}</td>
                <td className="py-xxs text-content-weak">{c.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'foundations-heights',
    figma: 'Lyt scl / Heights',
    code: 'h-btn-lg … h-btn-xxxx-sm, h-input-inline, h-input-search, h-nav, h-icon-btn, h-card-default, min-h-card-featured …',
    render: () => (
      <ul className="flex flex-wrap items-end gap-md">
        {FOUNDATIONS.heights.map((h) => (
          <li key={h.name} className="flex flex-col items-start gap-xxs type-default-text-s">
            <span
              aria-hidden
              className="block w-10 bg-btn-primary-bg"
              style={{ height: `min(var(--height-${h.name}), 6rem)` }}
            />
            <code>h-{h.name}</code>
            <span className="text-content-weak">{h.value}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'foundations-effects',
    figma:
      'Effektstile (Cards default, Cards on-hover, Search on-hover, Filter-Chips on-hover, Carussel-imgs on-hover, Img-inner-shadow strong · weak)',
    code: 'shadow-card, hover:shadow-card-hover, shadow-search-hover, shadow-filter-hover, inset-shadow-img-strong …',
    note: 'Den Klassennamen nennt die Beschreibung des Effektstils in Figma („Code: …“).',
    render: () => (
      <ul className="flex flex-wrap gap-xl">
        {FOUNDATIONS.shadows.map((s) => (
          <li key={s.name} className="flex w-40 flex-col gap-sm type-default-text-s">
            <span aria-hidden className="block h-20 w-full bg-card-surface" style={{ boxShadow: `var(--${s.name})` }} />
            <code>{s.name}</code>
            <span className="text-content-weak">{s.comment}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'foundations-icons',
    figma: 'Icons',
    code: "import { IconCartEmpty } from '@/components/icons'",
    note: `${ICON_REGISTRY.length} Icons als React-Komponenten, Farbe über currentColor (text-*).`,
    render: () => (
      <ul className="grid grid-cols-2 gap-sm md:grid-cols-4 lg:grid-cols-6">
        {ICON_REGISTRY.filter((i) => !i.name.startsWith('ButtonShape')).map(({ name, figma, Component }) => (
          <li
            key={name}
            className="flex flex-col items-center gap-xs rounded-[0.125rem] border border-content-weak/20 p-sm text-center"
          >
            <span className="flex h-12 items-center justify-center text-content-text">
              <Component className="max-h-12 max-w-full" />
            </span>
            <code className="type-default-text-s break-all">{name}</code>
            <span className="type-default-text-s text-content-weak">{figma}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'foundations-button-shapes',
    figma: 'Button-Shape',
    nodeId: '7932:33229',
    code: '<ButtonShape shape="oval" />',
    render: () => (
      <div className="grid grid-cols-2 gap-md md:grid-cols-4">
        {SHAPES.map((shape) => (
          <figure key={shape} className="flex flex-col gap-xxs type-default-text-s">
            <span className="relative block h-btn-md w-full text-btn-primary-bg">
              <ButtonShape shape={shape} />
            </span>
            <figcaption>
              <code>{shape}</code>
            </figcaption>
          </figure>
        ))}
      </div>
    ),
  },
]
