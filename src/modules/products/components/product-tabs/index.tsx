'use client'

import * as React from 'react'

import { TabBar } from '@/components/ui/tab-bar'
import { IconChevronLeft22 } from '@/components/icons/figma-icons'
import { ContentBasic } from '@/components/LexicalRenderers/ContentBasic'
import { CustomContentWithImg } from '@/components/LexicalRenderers/CustomContentWithImg'
import { Editorial } from '@/components/LexicalRenderers/Editorial'
import { Disclosure } from '@modules/products/components/disclosure'
import { Ingredients, NutritionTable } from '@modules/products/components/product-info'
import { BulletedList, DefaultParagraph, HeadlineH2 } from '@/components/ui/typography'
import { CustomerReviewsSection } from '@/components/LexicalRenderers/CardRow'
import { Section } from '@/components/ui/section'
import { TabsContent } from '@/components/ui/tabs'
import type { ProductDetailModel, ReviewModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

export interface ProductTabsContent {
  about: { headline: string; text: string }
  packaging: { batchNote?: string; storage?: string; packaging?: string }
  manufacture: { highlights: string[]; headline: string; text: string }
}

const TABS = [
  { value: 'about', label: 'Über dieses Produkt' },
  { value: 'packaging', label: 'Verpackung & Aufbewahrung' },
  { value: 'nutrition', label: 'Inhalt & Nährwerte' },
  { value: 'manufacture', label: 'Herstellung in unserer Manufaktur' },
  { value: 'reviews', label: 'Bewertungen' },
]

export interface ProductTabsProps {
  product: ProductDetailModel
  content: ProductTabsContent
  reviews: ReviewModel[]
  defaultTab?: string
  className?: string
  /** Gewählter Tab, kontrolliert (Sections / Tabs / ShiftBetweenContent hält ihn über den Breitenbereich). */
  value?: string
  onValueChange?: (value: string) => void
}

type TabPanel = { value: string; label: string; content: React.ReactNode }

/** Inhalte je Tab, gemeinsam für Tabs (md, lg) und Accordion mit Overlay (base). */
function useProductTabPanels({ product, content, reviews }: ProductTabsProps): TabPanel[] {
  const panel = 'flex w-full flex-col gap-md-l py-md-l'
  return [
    {
      ...TABS[0]!,
      content: (
        <div className="flex w-full justify-center pt-md-l">
          <CustomContentWithImg image={product.images[0]}>
            <ContentBasic headline={content.about.headline} headingLevel="h2" paragraphs={[content.about.text]} />
          </CustomContentWithImg>
        </div>
      ),
    },
    {
      ...TABS[1]!,
      content: (
        <div className={panel}>
          <HeadlineH2>Verpackung & Aufbewahrung</HeadlineH2>
          {content.packaging.batchNote ? (
            <DefaultParagraph size="lg">{content.packaging.batchNote}</DefaultParagraph>
          ) : null}
          <div className="flex flex-col gap-sm">
            {content.packaging.storage ? (
              <Editorial
                headline="Aufbewahrung"
                headlineType="h3"
                paragraphSize="md"
                columns={[content.packaging.storage]}
              />
            ) : null}
            {content.packaging.packaging ? (
              <Editorial
                headline="Verpackung"
                headlineType="h3"
                paragraphSize="md"
                columns={[content.packaging.packaging]}
              />
            ) : null}
          </div>
        </div>
      ),
    },
    {
      ...TABS[2]!,
      content: (
        <div className={panel}>
          <HeadlineH2>Nährwerte & Inhalt</HeadlineH2>
          <div className="flex w-full flex-col">
            {product.ingredients ? <Ingredients ingredients={product.ingredients} /> : null}
            {product.nutrition ? <NutritionTable nutrition={product.nutrition} /> : null}
          </div>
        </div>
      ),
    },
    {
      ...TABS[3]!,
      content: (
        <div className={panel}>
          <HeadlineH2>Herstellung in unserer Manufaktur</HeadlineH2>
          <BulletedList items={content.manufacture.highlights} />
          <ContentBasic
            headline={content.manufacture.headline}
            headlineType="h3"
            headingLevel="h3"
            paragraphs={[content.manufacture.text]}
          />
        </div>
      ),
    },
    {
      ...TABS[4]!,
      content: <CustomerReviewsSection reviews={reviews} className="py-md-l [&>div]:px-zero" />,
    },
  ]
}

/**
 * Figma: Sections / Tabs / SectionTabsAndContent (8945:32929) · Selected?, „nicht konfigurierbar“.
 * Section py-xl, max-w-content px-md-l gap-md-l: Buttons / XS / TabBar und je Tab der Inhalt:
 * Über dieses Produkt (CMS / CustomContentWithImg), Verpackung & Aufbewahrung (H2, Charge/MHD,
 * zwei CMS / Editorial H3), Inhalt & Nährwerte (Ingredients, NutritionTable), Herstellung
 * (BulletedList und ContentModules / Basic), Bewertungen (Sections / CustomerReviews).
 */
export function ProductTabsSection(props: ProductTabsProps) {
  const { defaultTab = 'about', value, onValueChange, ...rest } = props
  const panels = useProductTabPanels({ ...rest, defaultTab })
  return (
    <section
      data-slot="product-tabs-section"
      aria-label="Produktinformationen"
      className={cn('flex w-full flex-col items-center bg-surface py-xl text-content-text', props.className)}
    >
      <div className="flex w-full max-w-content flex-col gap-md-l px-md-l">
        <TabBar
          items={TABS}
          defaultValue={defaultTab}
          value={value}
          onValueChange={onValueChange}
          aria-label="Produktinformationen"
        >
          {panels.map((p) => (
            <TabsContent key={p.value} value={p.value}>
              {p.content}
            </TabsContent>
          ))}
        </TabBar>
      </div>
    </section>
  )
}

/**
 * Figma: Sections / Tabs / SectionTabsOverlay (9355:45830) · Selected? wie SectionTabsAndContent.
 * Vollbild-Dialog: Kopfzeile (px-md-l py-md-sm) mit Zurück-Pfeil (Icons / arrow left & right 22) und
 * Titel (ProductPage/Dropdown/Summary), darunter der Inhalt des Tabs in einem scrollenden Bereich
 * (p-md-l). Es fährt von rechts herein; der Zurück-Pfeil schließt es.
 */
export function SectionTabsOverlay({
  panel,
  open,
  onClose,
}: {
  panel: TabPanel | undefined
  open: boolean
  onClose: () => void
}) {
  const ref = React.useRef<HTMLDialogElement>(null)
  React.useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      data-slot="section-tabs-overlay"
      onClose={onClose}
      aria-label={panel?.label}
      className={cn(
        'fixed inset-zero m-zero hidden h-dvh max-h-none w-full max-w-none flex-col bg-surface p-zero text-content-text',
        'open:flex open:animate-in open:slide-in-from-right motion-reduce:open:animate-none',
      )}
    >
      <div className="flex w-full items-center gap-md-sm px-md-l py-md-sm">
        <button
          type="button"
          aria-label="Zurück"
          onClick={onClose}
          className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-btn-primary-bg"
        >
          <IconChevronLeft22 aria-hidden />
        </button>
        <h2 className="min-w-zero flex-1 type-product-page-dropdown-summary">{panel?.label}</h2>
      </div>
      <div className="min-h-zero w-full flex-1 overflow-y-auto px-md-l pb-md-l">{panel?.content}</div>
    </dialog>
  )
}

/**
 * Figma: Sections / Tabs / SectionTabsAsAccordion (9361:46117), „nicht konfigurierbar“. Ersetzt in base
 * die Tabs: Section py-xl, max-w-content px-md-l; je Tab eine Zeile Components / Disclosure
 * (State=Overlay, Pfeil nach rechts). Ein Klick öffnet Sections / Tabs / SectionTabsOverlay mit dem
 * Inhalt dieses Tabs.
 */
export function SectionTabsAsAccordion(props: ProductTabsProps) {
  const { value, onValueChange, ...rest } = props
  const panels = useProductTabPanels(rest)
  const [inner, setInner] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)
  const selected = open ? (value ?? inner) : null
  const select = (v: string) => {
    setInner(v)
    onValueChange?.(v)
    setOpen(true)
  }
  return (
    <section
      data-slot="section-tabs-as-accordion"
      aria-label="Produktinformationen"
      className={cn('flex w-full flex-col items-center bg-surface py-xl text-content-text', props.className)}
    >
      <div className="flex w-full max-w-content flex-col px-md-l">
        {panels.map((p) => (
          <Disclosure key={p.value} title={p.label} onOpenOverlay={() => select(p.value)} />
        ))}
      </div>
      <SectionTabsOverlay
        panel={panels.find((p) => p.value === selected)}
        open={open && selected !== null}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}

/**
 * Figma: Sections / Tabs / ShiftBetweenContent (9417:44116) · viewport-range=lg|md|base.
 * Eine Komponente: ab md Sections / Tabs / SectionTabsAndContent, darunter
 * Sections / Tabs / SectionTabsAsAccordion. `Selected?` bleibt beim Wechsel erhalten.
 */
export function ShiftBetweenContent(props: ProductTabsProps) {
  const [tab, setTab] = React.useState(props.defaultTab ?? 'about')
  return (
    <>
      <ProductTabsSection {...props} value={tab} onValueChange={setTab} className="max-md:hidden" />
      <SectionTabsAsAccordion {...props} value={tab} onValueChange={setTab} className="md:hidden" />
    </>
  )
}

export type AccordionItem = { title: string; content: React.ReactNode; contentClassName?: string }

/**
 * Figma: Sections / Accordion (6604:17023) · ContainsText?. Templates / Section: H2 links
 * („Herkunft, Aufbewahrung & Nährwerte“), bei ContainsText?=True zuerst CMS / Editorial (H3, pt-md),
 * dann Components / Disclosure untereinander.
 */
export function AccordionSection({
  title,
  intro,
  items,
}: {
  title: React.ReactNode
  intro?: { headline: string; columns: React.ReactNode[] }
  items: AccordionItem[]
}) {
  return (
    <Section aria-label={typeof title === 'string' ? title : undefined}>
      <HeadlineH2>{title}</HeadlineH2>
      <div className="flex w-full flex-col">
        {intro ? (
          <Editorial
            headline={intro.headline}
            headlineType="h3"
            paragraphSize="md"
            columns={intro.columns}
            className="pt-md pb-md-l"
          />
        ) : null}
        {items.map((item) => (
          <Disclosure key={item.title} title={item.title} contentClassName={item.contentClassName}>
            {item.content}
          </Disclosure>
        ))}
      </div>
    </Section>
  )
}
