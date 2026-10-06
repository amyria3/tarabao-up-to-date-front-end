import { AccountDataBlock, AccountSummaryItem } from '@modules/account/components/account-data-block'
import { PromotionPostCard } from '@/components/ui/promotion-post-card'
import { PurchaseCard } from '@modules/account/components/purchase-card'
import { VoucherCard } from '@modules/account/components/voucher-card'
import { OrderOverview } from '@modules/checkout/components/order-overview'
import { ContactForm } from '@/components/LexicalRenderers/ContactForm'
import { ContentBasic } from '@/components/LexicalRenderers/ContentBasic'
import { ContentCta } from '@/components/LexicalRenderers/ContentCta'
import { Editorial } from '@/components/LexicalRenderers/Editorial'
import { MediaText } from '@/components/LexicalRenderers/MediaText'
import { Ingredients, NutritionTable } from '@modules/products/components/product-info'
import { ProductHeader } from '@modules/products/components/product-header'
import { BulletedList, DefaultParagraph } from '@/components/ui/typography'
import { CollapsibleSection, NussAboSection } from '@modules/account/components/account-sections'
import {
  BlogCardsSection,
  CustomerReviewedProductsSection,
  CustomerReviewsSection,
  DiscoveryCardSection,
  FeaturedCardRow,
  ProductCardRow,
  ReviewCardsColumn,
} from '@/components/LexicalRenderers/CardRow'
import { CmsSection, SustainabilitySection } from '@/components/LexicalRenderers/CmsSection'
import { ImageCarouselSection } from '@/components/LexicalRenderers/ImageCarousel'
import { MegaCardsSection } from '@/components/LexicalRenderers/MegaCards'
import { CategoryPreview } from '@modules/categories/components/category-preview'
import {
  AccordionSection,
  ProductTabsSection,
  SectionTabsAsAccordion,
  ShiftBetweenContent,
} from '@modules/products/components/product-tabs'
import { ProductCard } from '@modules/products/components/product-card'
import { CategoryCardSm } from '@modules/categories/components/category-card'
import { SearchAndFilter } from '@modules/search/components/search-and-filter'
import { ProductImage } from '@modules/products/components/product-image'
import { addressLines } from '@/lib/checkout/address'
import {
  ADDRESS,
  BLOG_POST,
  CART,
  CUSTOMER,
  DISCOVERY_ROW,
  FEATURED,
  FEATURED_BLOG_POST,
  CATEGORIES_SAMPLE,
  FILTER_OPTIONS,
  MEGA_CARDS,
  PRODUCT_DETAIL,
  PRODUCT_TABS_CONTENT,
  PRODUCTS,
  PROMOTION,
  PURCHASE,
  PURCHASE_ARRIVED,
  RECIPE_IMAGES,
  REVIEW,
  REVIEW_LIKED,
  SUBSCRIPTION_ITEMS,
  SUSTAINABILITY_CONTENT,
  VOUCHER,
} from '@/lib/fixtures'
import { Specimen } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const LOREM =
  'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'
const REVIEWS = [REVIEW, REVIEW_LIKED, { ...REVIEW, id: 'rev_3' }, { ...REVIEW_LIKED, id: 'rev_4' }]
const BLOG_POSTS = [
  BLOG_POST,
  { ...BLOG_POST, id: 'blog_2' },
  { ...BLOG_POST, id: 'blog_3' },
  { ...BLOG_POST, id: 'blog_4' },
]

export const sectionEntries: LibraryEntry[] = [
  {
    id: 'sections-search-and-filter',
    figma: 'Sections / Search & Filter',
    nodeId: '8945:29843',
    code: '<SearchAndFilter filterOptions={options} search={search} />',
    note: 'Beispiel: Suche im Produkttitel der Beispieldaten (z. B. „Name“). Im Shop liefert `search` die Treffer aus Medusa.',
    render: () => <SearchAndFilter filterOptions={FILTER_OPTIONS} products={PRODUCTS} />,
  },
  {
    id: 'sections-product-header',
    figma: 'Sections / ProductHeader',
    nodeId: '4221:28723',
    code: '<ProductHeader product={product} />',
    render: () => <ProductHeader product={PRODUCT_DETAIL} />,
  },
  {
    id: 'sections-product-tabs',
    figma: 'Sections / Tabs / SectionTabsAndContent',
    nodeId: '8945:32929',
    code: '<ProductTabsSection product={product} content={content} reviews={reviews} />',
    note: 'Laut Figma nicht konfigurierbar: feste Tabs, Inhalte aus Produkt und CMS.',
    render: () => <ProductTabsSection product={PRODUCT_DETAIL} content={PRODUCT_TABS_CONTENT} reviews={REVIEWS} />,
  },
  {
    id: 'sections-product-tabs-accordion',
    figma: 'Sections / Tabs / SectionTabsAsAccordion · SectionTabsOverlay · ShiftBetweenContent',
    nodeId: '9361:46117',
    code: '<ShiftBetweenContent product={product} content={content} reviews={reviews} />',
    note: 'ShiftBetweenContent zeigt ab md die Tabs, darunter die Liste (Components / Disclosure, State=Overlay); jede Zeile öffnet Sections / Tabs / SectionTabsOverlay (Vollbild-Dialog, fährt von rechts herein). Der gewählte Tab bleibt beim Wechsel erhalten. Die Bibliothek zeigt die Liste hier in jeder Breite.',
    render: () => (
      <div className="flex w-full flex-col gap-lg">
        <Specimen label="SectionTabsAsAccordion (base)">
          <SectionTabsAsAccordion product={PRODUCT_DETAIL} content={PRODUCT_TABS_CONTENT} reviews={REVIEWS} />
        </Specimen>
        <Specimen label="ShiftBetweenContent (schaltet mit der Fensterbreite)">
          <ShiftBetweenContent product={PRODUCT_DETAIL} content={PRODUCT_TABS_CONTENT} reviews={REVIEWS} />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'sections-category-preview',
    figma: 'Sections / CategoryPreview',
    nodeId: '9779:32594',
    code: '<CategoryPreview title="Würzige Snacks" href="/de-de/kategorien/nuesse/wuerzige-snacks" moreProducts><li>…</li></CategoryPreview>',
    note: 'State=Default hält „Alle anzeigen“ unsichtbar an seinem Platz, State=Hover (Hover über die ganze Vorschau) blendet ihn ein. More products?=False lässt den Button weg.',
    render: () => (
      <div className="flex w-full flex-col gap-lg">
        <Specimen label="State=Default · More products?=True">
          <CategoryPreview title="Würzige Snacks" href="#">
            {PRODUCTS.slice(0, 3).map((p) => (
              <li key={p.id} className="w-64">
                <ProductCard product={p} size="compact" />
              </li>
            ))}
            <li className="w-64">
              <CategoryCardSm category={CATEGORIES_SAMPLE[0]!} />
            </li>
          </CategoryPreview>
        </Specimen>
        <Specimen label="State=Hover">
          <CategoryPreview title="Naturbelassen" href="#" forceHover>
            {PRODUCTS.slice(0, 3).map((p) => (
              <li key={p.id} className="w-64">
                <ProductCard product={p} size="compact" />
              </li>
            ))}
          </CategoryPreview>
        </Specimen>
        <Specimen label="More products?=False">
          <CategoryPreview title="Nussmixer" href="#" moreProducts={false}>
            {PRODUCTS.slice(0, 2).map((p) => (
              <li key={p.id} className="w-64">
                <ProductCard product={p} size="compact" />
              </li>
            ))}
          </CategoryPreview>
        </Specimen>
      </div>
    ),
  },
  {
    id: 'sections-card-row',
    figma: 'Sections / CardRow · Unspecific · Featured',
    nodeId: '6604:17026',
    code: '<ProductCardRow title="…" products={products} scroll />',
    render: () => (
      <div className="flex w-full flex-col">
        <Specimen label="Horizontal Scroll?=True · Unspecific">
          <ProductCardRow
            title="Auch in diese Aufstriche könntest Du Dich verlieben"
            products={[...PRODUCTS, ...PRODUCTS]}
            scroll
          />
        </Specimen>
        <Specimen label="Horizontal Scroll?=False · Unspecific">
          <ProductCardRow title="Für Dich ausgewählt" products={PRODUCTS} />
        </Specimen>
        <Specimen label="Variable Card-Hight?=True · Featured">
          <FeaturedCardRow
            title="Beste TARABAO Snacks für Dein Unternehmen"
            teasers={[FEATURED, FEATURED_BLOG_POST, { ...FEATURED, id: 'feat_3' }]}
          />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'sections-card-row-discovery',
    figma: 'Sections / CardRow · Type Of Card=Discovery',
    nodeId: '6708:16614',
    code: '<DiscoveryCardSection title="…" teasers={teasers} />',
    note: 'Reihen zu höchstens drei Karten. Ab lg: Ist die Karte ganz rechts, rückt der Inhalt nach links. Ist sie ganz links, rückt der Nachbar nach rechts. Sonst rücken die Nachbarn zu beiden Seiten.',
    render: () => (
      <DiscoveryCardSection
        title="Lerne unsere Partnerinnen kennen"
        teasers={[
          ...DISCOVERY_ROW,
          { ...DISCOVERY_ROW[0]!, id: `${DISCOVERY_ROW[0]!.id}-4` },
          { ...DISCOVERY_ROW[1]!, id: `${DISCOVERY_ROW[1]!.id}-5` },
        ]}
      />
    ),
  },
  {
    id: 'sections-accordion',
    figma: 'Sections / Accordion',
    nodeId: '6604:17023',
    code: '<AccordionSection title="…" items={[{ title, content }]} />',
    render: () => (
      <AccordionSection
        title="Herkunft, Aufbewahrung & Nährwerte"
        intro={{ headline: 'Unser Nachhaltigkeitsranking', columns: [LOREM, LOREM] }}
        items={[
          { title: 'Herkunft', content: <DefaultParagraph size="lg">{LOREM}</DefaultParagraph> },
          { title: 'Aufbewahrung', content: <DefaultParagraph size="lg">{LOREM}</DefaultParagraph> },
          { title: 'Inhaltsstoffe', content: <Ingredients ingredients={PRODUCT_DETAIL.ingredients!} /> },
          { title: 'Nährwerte', content: <NutritionTable nutrition={PRODUCT_DETAIL.nutrition!} /> },
        ]}
      />
    ),
  },
  {
    id: 'sections-mega-cards',
    figma: 'Sections / MegaCards',
    nodeId: '2156:4072',
    code: '<MegaCardsSection slides={[{ variant, card }]} />',
    note: 'Ohne Section-Template. Wischen oder ab lg die Pfeile unten rechts.',
    render: () => (
      <MegaCardsSection
        slides={(['orange-black', 'blue-green', 'purple-black', 'happy-yellow'] as const).map((variant) => ({
          variant,
          card: MEGA_CARDS[variant],
        }))}
      />
    ),
  },
  {
    id: 'sections-customer-reviews',
    figma: 'Sections / CustomerReviews · CustomerReviewedProducts · ReviewCards',
    nodeId: '7472:20901',
    code: '<CustomerReviewsSection reviews={reviews} />',
    note: 'Sections / ReviewCards wird laut Figma derzeit nicht gebraucht (hier als Spalte).',
    render: () => (
      <div className="flex w-full flex-col">
        <CustomerReviewsSection reviews={REVIEWS} />
        <CustomerReviewedProductsSection products={PRODUCTS} />
        <Specimen label="Sections / ReviewCards">
          <ReviewCardsColumn reviews={[REVIEW, REVIEW_LIKED]} />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'sections-blog-cards',
    figma: 'Sections / BlogCards',
    nodeId: '6605:16723',
    code: '<BlogCardsSection posts={posts} />',
    note: 'Die Auswahl (Tag des Produkts oder Sammlung) kommt aus dem CMS.',
    render: () => <BlogCardsSection posts={BLOG_POSTS} />,
  },
  {
    id: 'sections-image-carousel',
    figma: 'Sections / ImageCarousel',
    nodeId: '9334:47556',
    code: '<ImageCarouselSection title="Bilder zum Rezept" cards={cards} />',
    note: 'Aufgebaut wie Sections / BlogCards: H2, scrollende Reihe aus Cards / ImageCard, Primitives / CarouselPagination. Ein Klick auf eine Karte öffnet Components / OverlayComponents / Image (Dialog).',
    render: () => <ImageCarouselSection title="Bilder zum Rezept" cards={RECIPE_IMAGES} />,
  },
  {
    id: 'sections-cms',
    figma: 'Sections / CMS(CustomSection) · Default',
    nodeId: '7988:23735',
    code: '<CmsSection><MediaText … /><ContentCta … />…</CmsSection>',
    note: 'Beliebige ContentModules in beliebiger Reihenfolge. Sie folgen direkt im Wrapper der Section.',
    render: () => (
      <CmsSection label="CMS-Inhalt">
        <MediaText
          title="Überschrift"
          text="Dieser Absatz charakterisiert den Snack, erzählt etwas über die Herkunft."
        />
        <ContentBasic headline="Überschrift" paragraphs={[LOREM]} />
        <NutritionTable nutrition={PRODUCT_DETAIL.nutrition!} />
        <ContentCta
          title="We PROMISE - unsere PISTAZIENCRéME direkt aus der MANUFAKTUR"
          benefits={PRODUCT_DETAIL.highlights}
          rating={{ value: 5, label: 'Gekauft von 30493 Menschen' }}
          actionLabel="Call To Action"
          href="/de-de/store"
        />
        <ContactForm />
        <Editorial headline="Unser Nachhaltigkeitsranking" headlineType="h2" columns={[LOREM, LOREM]} />
      </CmsSection>
    ),
  },
  {
    id: 'sections-sustainability',
    figma: 'Sections / Sustainability',
    nodeId: '8130:21717',
    code: '<SustainabilitySection intro={…} supplier={…} tabs={…} highlights={…} />',
    render: () => (
      <SustainabilitySection
        intro={SUSTAINABILITY_CONTENT.intro}
        supplier={{
          left: (
            <ContentBasic
              headline={SUSTAINABILITY_CONTENT.supplier.headline}
              headingLevel="h2"
              align="center"
              paragraphs={[SUSTAINABILITY_CONTENT.supplier.text]}
            />
          ),
          right: (
            <div className="flex w-full flex-col gap-md-l">
              <BulletedList items={SUSTAINABILITY_CONTENT.supplier.facts} />
              <div className="h-48 w-full">
                <ProductImage image={{ src: '', alt: 'Medien des Lieferanten' }} />
              </div>
            </div>
          ),
        }}
        tabs={SUSTAINABILITY_CONTENT.tabs}
        highlights={SUSTAINABILITY_CONTENT.highlights}
      />
    ),
  },
  {
    id: 'sections-account-collapsible',
    figma: 'Sections / Account / CollapsibleSection',
    nodeId: '8945:32963',
    code: '<CollapsibleSection title="Deine Bestellungen">…</CollapsibleSection>',
    render: () => (
      <div className="flex w-full flex-col">
        <CollapsibleSection title="Deine Bestellungen" defaultOpen>
          <PurchaseCard purchase={PURCHASE} className="max-w-panel-max" />
          <PurchaseCard purchase={PURCHASE_ARRIVED} className="max-w-panel-max" />
        </CollapsibleSection>
        <CollapsibleSection title="Gutscheine & Angebote" defaultOpen>
          <div className="flex w-full flex-wrap justify-center gap-md-l">
            <VoucherCard voucher={VOUCHER} />
            <PromotionPostCard teaser={PROMOTION} />
          </div>
        </CollapsibleSection>
        <CollapsibleSection title="Deine Daten">
          <div className="flex w-full flex-wrap justify-center gap-md-l">
            <AccountDataBlock title="Dein Profil" actionLabel="Abmelden">
              <AccountSummaryItem label="Vorname:" lines={[[CUSTOMER.firstName]]} />
              <AccountSummaryItem label="E-Mail:" lines={[[CUSTOMER.email]]} />
            </AccountDataBlock>
            <AccountDataBlock title="Deine Adressen">
              <AccountSummaryItem label="Adresse 1:" lines={addressLines(ADDRESS)} />
            </AccountDataBlock>
          </div>
        </CollapsibleSection>
      </div>
    ),
  },
  {
    id: 'sections-account-nuss-abo',
    figma: 'Sections / Account / Nuss-Abo Verwanltung',
    nodeId: '8819:25733',
    code: '<NussAboSection items={items} />',
    render: () => <NussAboSection items={SUBSCRIPTION_ITEMS} />,
  },
  {
    id: 'sections-checkout-order-overview',
    figma: 'Components / Checkout / OrderOverview',
    nodeId: '3501:5794',
    code: '<OrderOverview cart={cart} recommendations={…} asDialog />',
    note: 'Unter der Navigation als Overlay (asDialog, role=dialog) oder im Seitenfluss der Checkout-Seite.',
    render: () => (
      <div className="w-full max-w-134">
        <OrderOverview
          cart={CART}
          recommendations={[
            { title: 'Deine Favoriten:', products: PRODUCTS },
            { title: 'Für Dich Empfohlen:', products: PRODUCTS },
          ]}
        />
      </div>
    ),
  },
]
