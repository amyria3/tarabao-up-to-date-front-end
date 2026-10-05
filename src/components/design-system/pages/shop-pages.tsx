import type * as React from 'react'

import { CategoryCardMd, CategoryCardSm } from '@/components/design-system/cards/category-card'
import { FeaturedCard } from '@/components/design-system/cards/content-cards'
import { ProductCard } from '@/components/design-system/cards/product-card'
import { CartLogIn, type CartLogInProps } from '@/components/design-system/cart/cart-login'
import { CheckoutCartOverview } from '@/components/design-system/cart/cart-page'
import { CheckoutContact } from '@/components/design-system/checkout/checkout-contact'
import { CheckoutIdentification } from '@/components/design-system/checkout/checkout-identification'
import { OrderConfirmation } from '@/components/design-system/checkout/order-confirmation'
import { ContactForm, ContentBasic, Editorial } from '@/components/design-system/content-modules/content-modules'
import { Nutmixer, type NutmixerProps } from '@/components/design-system/nutmixer/nutmixer'
import { ProductHeader } from '@/components/design-system/product/product-header'
import { DefaultParagraph, HeadlineH1, HeadlineH2 } from '@/components/design-system/primitives/typography'
import { PortionCalculator, type PortionCalculatorProps, RecipeStep } from '@/components/design-system/recipe/recipe'
import { CollapsibleSection, NussAboSection } from '@/components/design-system/sections/account-sections'
import { BlogCardsSection, CustomerReviewsSection, ProductCardRow } from '@/components/design-system/sections/card-rows'
import {
  SustainabilitySection,
  type SustainabilitySectionProps,
} from '@/components/design-system/sections/cms-sections'
import { CategoryPreview } from '@/components/design-system/sections/category-preview'
import { ImageCarouselSection } from '@/components/design-system/sections/image-carousel'
import { ShiftBetweenContent, type ProductTabsContent } from '@/components/design-system/sections/product-sections'
import { CardsOrder } from '@/components/design-system/templates/cards-order'
import { PageTemplate, type PageTemplateProps } from '@/components/design-system/templates/page'
import { Section } from '@/components/design-system/templates/section'
import type {
  CartItemModel,
  CartModel,
  CategoryCardModel,
  ImageCardModel,
  ProductCardModel,
  ProductDetailModel,
  RecipeStepModel,
  ReviewModel,
  TeaserModel,
} from '@/lib/view-models'

type Chrome = Pick<PageTemplateProps, 'header' | 'footer' | 'breadcrumb'>

/**
 * Figma: Produktseiten Jancys Curry-Cashews (8232:25333), Tamari-Sesam-Cashews (9544:41166),
 * Macadamia süß-salzig (9544:42195), Ananasstücke schokoliert (9544:43207): dieselbe Seite, die Sorte
 * wählt in Figma der Modus-Pin __Products / Doypacks, im Code `product`. Section-Slots: ProductHeader,
 * Tabs / ShiftBetweenContent (Tabs ab md, Liste mit Overlay in base), Sustainability, BlogCards,
 * CustomerReviews, CardRow („Das könnte Dich auch interessieren“, die drei anderen Sorten). Mit Breadcrumb.
 */
export function ProductPage({
  chrome,
  product,
  tabs,
  sustainability,
  reviews,
  blogPosts,
  related,
}: {
  chrome: Chrome
  product: ProductDetailModel
  tabs: ProductTabsContent
  sustainability: SustainabilitySectionProps
  reviews: ReviewModel[]
  blogPosts: TeaserModel[]
  related: ProductCardModel[]
}) {
  return (
    <PageTemplate {...chrome}>
      <ProductHeader product={product} />
      <ShiftBetweenContent product={product} content={tabs} reviews={reviews} />
      <SustainabilitySection {...sustainability} />
      <BlogCardsSection posts={blogPosts} />
      <CustomerReviewsSection reviews={reviews} />
      <ProductCardRow title="Das könnte Dich auch interessieren" products={related} />
    </PageTemplate>
  )
}

/** Figma: Nuss-Mixer (Templates / Page 8555:22265, „Produktseite“). Ein Section-Slot: Components / Nutmixer. */
export function NutmixerPage({ chrome, ...nutmixer }: { chrome: Chrome } & NutmixerProps) {
  return (
    <PageTemplate {...chrome}>
      <Nutmixer {...nutmixer} />
    </PageTemplate>
  )
}

/**
 * Figma: Unser Blog (Templates / Page 8927:28029). Templates / Section: H1 „Unser Blog“ und
 * Templates / Cards Order · Tiles mit Cards / FeaturedCard · BlogPost.
 */
export function BlogOverviewPage({ chrome, posts }: { chrome: Chrome; posts: TeaserModel[] }) {
  return (
    <PageTemplate {...chrome}>
      <Section aria-label="Unser Blog">
        <HeadlineH1>Unser Blog</HeadlineH1>
        <CardsOrder variant="tiles" className="gap-md">
          {posts.map((p) => (
            <li key={p.id}>
              <FeaturedCard teaser={p} variant="blog-post" />
            </li>
          ))}
        </CardsOrder>
      </Section>
    </PageTemplate>
  )
}

/**
 * Figma: Dein Account / Nicht angemeldet (Templates / Page 9845:35453, unter {Dein Account}):
 * eine Templates / Section mit Components / Cart / LogIn. Das Account-Symbol im Header zeigt
 * abgemeldet; „Anmelden“ führt zum Kundenkonto (im Code: Session).
 */
export function AccountLoggedOutPage({ chrome, ...login }: { chrome: Chrome } & CartLogInProps) {
  return (
    <PageTemplate {...chrome} header={{ ...chrome.header, loggedIn: false }}>
      <Section aria-label="Anmelden">
        <HeadlineH1>Dein Account</HeadlineH1>
        <CartLogIn {...login} />
      </Section>
    </PageTemplate>
  )
}

/**
 * Figma: Rezeptseite {Blog / Recipe} (Templates / Page 9618:28958): Templates / Section mit H1,
 * Primitives / DefaultParagraph (Intro), Components / Recipe / PortionCalculator, H2 „Zubereitung“ und
 * je Schritt ContentModules / CMS / RecipeStep; darunter Sections / ImageCarousel.
 */
export function RecipePage({
  chrome,
  title,
  intro,
  calculator,
  steps,
  images,
  stepsTitle = 'Zubereitung',
  imagesTitle = 'Bilder zum Rezept',
}: {
  chrome: Chrome
  title: string
  intro: string
  calculator: PortionCalculatorProps
  steps: RecipeStepModel[]
  images: ImageCardModel[]
  stepsTitle?: string
  imagesTitle?: string
}) {
  return (
    <PageTemplate {...chrome}>
      <Section aria-label={title}>
        <HeadlineH1>{title}</HeadlineH1>
        <DefaultParagraph size="lg">{intro}</DefaultParagraph>
        <PortionCalculator {...calculator} />
        <HeadlineH2>{stepsTitle}</HeadlineH2>
        {steps.map((step) => (
          <RecipeStep key={step.id} label={step.label} meta={step.meta} image={step.image}>
            {step.text}
          </RecipeStep>
        ))}
      </Section>
      <ImageCarouselSection title={imagesTitle} cards={images} />
    </PageTemplate>
  )
}

export type CategoryPreviewModel = {
  id: string
  title: string
  href: string
  products: ProductCardModel[]
  /** Kategoriekarten (Cards / CategoryCard / SM) am Ende der Vorschau */
  categories?: CategoryCardModel[]
  /** Figma More products?: mehr Produkte als die Vorschau zeigt */
  moreProducts?: boolean
}

/**
 * Figma: Kategorieseite Nüsse (Templates / Page 9231:41043) mit Breadcrumb: Templates / Section mit H1,
 * dann je Unterkategorie Sections / CategoryPreview (Naturbelassen, Würzige Snacks …) mit
 * Cards / ProductCard / CompactSize und Cards / CategoryCard / SM in Templates / Cards Order.
 */
export function CategoryPage({
  chrome,
  title,
  previews,
}: {
  chrome: Chrome
  title: string
  previews: CategoryPreviewModel[]
}) {
  return (
    <PageTemplate {...chrome}>
      <Section aria-label={title} className="pb-zero">
        <HeadlineH1>{title}</HeadlineH1>
      </Section>
      {previews.map((preview) => (
        <CategoryPreview
          key={preview.id}
          title={preview.title}
          href={preview.href}
          moreProducts={preview.moreProducts ?? true}
        >
          {preview.products.map((p) => (
            <li key={p.id} className="w-64">
              <ProductCard product={p} size="compact" headingLevel="h3" />
            </li>
          ))}
          {preview.categories?.map((c) => (
            <li key={c.id} className="w-64">
              <CategoryCardSm category={c} />
            </li>
          ))}
        </CategoryPreview>
      ))}
    </PageTemplate>
  )
}

/**
 * Figma: Unterkategorie Würzige Snacks (Templates / Page 9681:35335), Breadcrumb „Nüsse > Würzige Snacks“:
 * Templates / Section mit H1 und Templates / Cards Order (Tiles) aus Cards / ProductCard / CompactSize
 * und Cards / CategoryCard / SM. Dieselbe Seite zeigt {Alle Kategorien} mit CategoryCard MD und SM.
 */
export function SubcategoryPage({
  chrome,
  title,
  products,
  categories = [],
}: {
  chrome: Chrome
  title: string
  products: ProductCardModel[]
  categories?: CategoryCardModel[]
}) {
  return (
    <PageTemplate {...chrome}>
      <Section aria-label={title}>
        <HeadlineH1>{title}</HeadlineH1>
        <CardsOrder variant="tiles" className="gap-md">
          {products.map((p) => (
            <li key={p.id} className="w-64">
              <ProductCard product={p} size="compact" />
            </li>
          ))}
          {categories.map((c) => (
            <li key={c.id} className="w-64">
              <CategoryCardSm category={c} />
            </li>
          ))}
        </CardsOrder>
      </Section>
    </PageTemplate>
  )
}

/**
 * Figma: Dein Account (Templates / Page 8975:27217). Templates / Section mit H1 „Dein Account“,
 * Sections / Account / Nuss-Abo Verwaltung und drei Sections / Account / CollapsibleSection
 * (Deine Daten, Gutscheine & Angebote, Deine Bestellungen).
 */
export function AccountPage({
  chrome,
  subscription,
  data,
  vouchers,
  orders,
}: {
  chrome: Chrome
  subscription?: CartItemModel[]
  data: React.ReactNode
  vouchers: React.ReactNode
  orders: React.ReactNode
}) {
  return (
    <PageTemplate {...chrome}>
      <Section aria-label="Dein Account" className="pb-zero">
        <HeadlineH1>Dein Account</HeadlineH1>
      </Section>
      {subscription?.length ? <NussAboSection items={subscription} /> : null}
      <CollapsibleSection title="Deine Daten">{data}</CollapsibleSection>
      <CollapsibleSection title="Gutscheine & Angebote">{vouchers}</CollapsibleSection>
      <CollapsibleSection title="Deine Bestellungen" defaultOpen>
        {orders}
      </CollapsibleSection>
    </PageTemplate>
  )
}

/**
 * Figma: Alle Kategorien (Templates / Page 9250:35515): Templates / Section mit H1 und Templates / Cards Order
 * (Tiles) aus Cards / CategoryCard / MD (Hauptkategorien) und SM (Unterkategorien, Sammlungen).
 * Logo und „Zur Startseite“ führen hierher, solange es keine Startseite gibt (offene Punkte 34).
 */
export function AllCategoriesPage({
  chrome,
  title = 'Alle Kategorien',
  categories,
  subcategories = [],
}: {
  chrome: Chrome
  title?: string
  categories: CategoryCardModel[]
  subcategories?: CategoryCardModel[]
}) {
  return (
    <PageTemplate {...chrome}>
      <Section aria-label={title}>
        <HeadlineH1>{title}</HeadlineH1>
        <CardsOrder variant="tiles" className="gap-md">
          {categories.map((c) => (
            <li key={c.id} className="w-80">
              <CategoryCardMd category={c} actionLabel="Zur Kategorie" />
            </li>
          ))}
        </CardsOrder>
        {subcategories.length ? (
          <CardsOrder variant="tiles" className="gap-md">
            {subcategories.map((c) => (
              <li key={c.id} className="w-64">
                <CategoryCardSm category={c} />
              </li>
            ))}
          </CardsOrder>
        ) : null}
      </Section>
    </PageTemplate>
  )
}

/**
 * Figma: Unternehmensseiten (B2B, Tarabao für Dein Team, Über uns, Unser Team, Unser Ansatz, Partnerschaften,
 * Nachhaltigkeit, Verpackungen, Karriere): Templates / Page mit ContentModules (Editorial, MediaText,
 * CustomContentWithText, CTA, ContactForm) in Sections / CMS(CustomSection).
 */
export function CompanyPage({
  chrome,
  title,
  intro,
  sections,
  contact = false,
}: {
  chrome: Chrome
  title: string
  intro: string
  sections: { headline: string; text: string }[]
  contact?: boolean
}) {
  return (
    <PageTemplate {...chrome}>
      <Section aria-label={title}>
        <HeadlineH1>{title}</HeadlineH1>
        <DefaultParagraph size="lg">{intro}</DefaultParagraph>
        {sections.map((s) => (
          <Editorial key={s.headline} headline={s.headline} headlineType="h2" columns={[s.text]} />
        ))}
        {contact ? <ContactForm /> : null}
      </Section>
    </PageTemplate>
  )
}

export type LegalBlock = { headline: string; text: string }

/**
 * Figma: Rechtstexte und Infoseiten (Impressum, AGB, Datenschutzerklärung, Widerrufsrecht,
 * Versandrichtlinien, Barrierefreiheitserklärung …, Templates / Page 9242:32057 ff.).
 * Templates / Section · 12 Slots: H1 (links oder mittig) und je Abschnitt ContentModules / Basic
 * (H2 Default, DefaultParagraph LG).
 */
export function LegalPage({
  chrome,
  title,
  align = 'left',
  blocks,
  children,
}: {
  chrome: Chrome
  title: string
  align?: 'left' | 'center'
  blocks: LegalBlock[]
  /** weitere Inhalte, z. B. Components / SearchPurchase im Widerrufsformular */
  children?: React.ReactNode
}) {
  return (
    <PageTemplate {...chrome}>
      <Section aria-label={title}>
        <HeadlineH1 align={align}>{title}</HeadlineH1>
        {blocks.map((b) => (
          <ContentBasic
            key={b.headline}
            headline={b.headline}
            paragraphs={[b.text]}
            className="max-w-block-double-max"
          />
        ))}
        {children}
      </Section>
    </PageTemplate>
  )
}

/**
 * Figma: Check-Out Workflow (06-01 … 06-17). Oben CartPage · Checkout (Bestellübersicht), dann
 * der Schritt in einer Templates / Section und zwei CardRows mit Empfehlungen.
 */
export function CheckoutPage({
  chrome,
  cart,
  step,
  recommendations = [],
}: {
  chrome: Chrome
  cart: CartModel
  /** aktueller Schritt; Standard: Identification (06-01) */
  step?: React.ReactNode
  recommendations?: { title: string; products: ProductCardModel[] }[]
}) {
  return (
    <PageTemplate {...chrome}>
      <CheckoutCartOverview cart={cart} />
      <Section aria-label="Kasse">
        {step ?? <CheckoutIdentification />}
        <CheckoutContact />
      </Section>
      {recommendations.map((r) => (
        <ProductCardRow key={r.title} title={r.title} products={r.products} />
      ))}
    </PageTemplate>
  )
}

/** Figma: 06-17-Checkout-OrderConfirmation. Eine Templates / Section mit Components / Checkout / OrderConfirmation. */
export function OrderConfirmationPage({ chrome, deliveryDateLabel }: { chrome: Chrome; deliveryDateLabel: string }) {
  return (
    <PageTemplate {...chrome}>
      <Section aria-label="Bestellbestätigung">
        <OrderConfirmation deliveryDateLabel={deliveryDateLabel} />
      </Section>
    </PageTemplate>
  )
}
