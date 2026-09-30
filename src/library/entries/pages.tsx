import { AccountDataBlock, AccountSummaryItem } from '@/components/design-system/account/account-data-block'
import { PromotionPostCard, PurchaseCard } from '@/components/design-system/cards/content-cards'
import { VoucherCard } from '@/components/design-system/cards/voucher-card'
import { SearchPurchase } from '@/components/design-system/cancellation/search-purchase'
import { ContentBasic } from '@/components/design-system/content-modules/content-modules'
import {
  AccountLoggedOutPage,
  AccountPage,
  BlogOverviewPage,
  CategoryPage,
  CheckoutPage,
  LegalPage,
  NutmixerPage,
  OrderConfirmationPage,
  ProductPage,
  RecipePage,
  SubcategoryPage,
} from '@/components/design-system/pages/shop-pages'
import { BulletedList } from '@/components/design-system/primitives/typography'
import { PageTemplate } from '@/components/design-system/templates/page'
import { Section } from '@/components/design-system/templates/section'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import { addressLines } from '@/lib/checkout/address'
import {
  ADDRESS,
  BLOG_POST,
  CART,
  CATEGORIES_SAMPLE,
  CUSTOMER,
  FEATURED_BLOG_POST,
  FOOTER,
  NAV_GROUPS,
  NUTMIXER_CATEGORIES_DEMO,
  NUTMIXER_PRODUCTS,
  PRODUCT_DETAIL,
  PRODUCT_TABS_CONTENT,
  PRODUCTS,
  PROMO,
  PROMOTION,
  PURCHASE,
  PURCHASE_ARRIVED,
  RECIPE_FACTS,
  RECIPE_IMAGES,
  RECIPE_INGREDIENTS,
  RECIPE_STEPS,
  REVIEW,
  REVIEW_LIKED,
  SUBSCRIPTION_ITEMS,
  SUSTAINABILITY_CONTENT,
  VOUCHER,
} from '@/lib/fixtures'
import type { LibraryEntry } from '@/library/types'

const chrome = { header: { navGroups: NAV_GROUPS, promo: PROMO, cartCount: 1, loggedIn: true }, footer: FOOTER }
const LOREM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
const REVIEWS = [REVIEW, REVIEW_LIKED, { ...REVIEW, id: 'rev_3' }, { ...REVIEW_LIKED, id: 'rev_4' }]
const frame = 'w-full overflow-hidden border border-content-weak'

const sustainability = {
  intro: SUSTAINABILITY_CONTENT.intro,
  supplier: {
    left: (
      <ContentBasic
        headline={SUSTAINABILITY_CONTENT.supplier.headline}
        headingLevel="h2"
        paragraphs={[SUSTAINABILITY_CONTENT.supplier.text]}
      />
    ),
    right: (
      <div className="flex w-full flex-col gap-md-l">
        <BulletedList items={SUSTAINABILITY_CONTENT.supplier.facts} />
        <div className="h-48 w-full">
          <ProductImage />
        </div>
      </div>
    ),
  },
  tabs: SUSTAINABILITY_CONTENT.tabs,
}

export const pageTemplateEntry: LibraryEntry = {
  id: 'templates-page',
  figma: 'Templates / Page',
  nodeId: '8358:53818',
  code: '<PageTemplate header={…} footer={footer} breadcrumb={…}>…Sections…</PageTemplate>',
  note: 'Header, optional Breadcrumb, bis zu zehn Section-Slots, Footer.',
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

export const pageEntries: LibraryEntry[] = [
  {
    id: 'pages-product',
    figma: 'Produktseite Jancys Curry-Cashews · Tamari-Sesam-Cashews · Macadamia süß-salzig · Ananasstücke schokoliert',
    nodeId: '8232:25333',
    code: '<ProductPage chrome={…} product={product} … />',
    render: () => (
      <div className={frame}>
        <ProductPage
          chrome={{
            ...chrome,
            breadcrumb: {
              items: [
                { label: 'Shop', href: '#' },
                { label: 'Süße Snacks', href: '#' },
              ],
              current: PRODUCT_DETAIL.title,
            },
          }}
          product={PRODUCT_DETAIL}
          tabs={PRODUCT_TABS_CONTENT}
          sustainability={sustainability}
          reviews={REVIEWS}
          blogPosts={[1, 2, 3, 4].map((n) => ({ ...BLOG_POST, id: `blog_${n}` }))}
          related={PRODUCTS}
        />
      </div>
    ),
  },
  {
    id: 'pages-nutmixer',
    figma: 'Nuss-Mixer',
    nodeId: '8555:22265',
    code: '<NutmixerPage chrome={…} categories={…} products={…} />',
    render: () => (
      <div className={frame}>
        <NutmixerPage chrome={chrome} categories={NUTMIXER_CATEGORIES_DEMO} products={NUTMIXER_PRODUCTS} />
      </div>
    ),
  },
  {
    id: 'pages-blog',
    figma: 'Unser Blog',
    nodeId: '8927:28029',
    code: '<BlogOverviewPage chrome={…} posts={posts} />',
    render: () => (
      <div className={frame}>
        <BlogOverviewPage
          chrome={chrome}
          posts={[1, 2, 3, 4, 5, 6].map((n) => ({ ...FEATURED_BLOG_POST, id: `post_${n}` }))}
        />
      </div>
    ),
  },
  {
    id: 'pages-recipe',
    figma: 'Rezeptseite Blog / Recipe',
    nodeId: '9618:28958',
    code: '<RecipePage chrome={…} title="…" intro="…" calculator={…} steps={steps} images={images} />',
    note: 'H1, Intro, Components / Recipe / PortionCalculator, H2 und fünf ContentModules / CMS / RecipeStep; darunter Sections / ImageCarousel. Die erste Kachel auf „Unser Blog“ führt hierher.',
    render: () => (
      <div className={frame}>
        <RecipePage
          chrome={{
            ...chrome,
            breadcrumb: { items: [{ label: 'Unser Blog', href: '#' }], current: 'Vegane Pistazienschnecken' },
          }}
          title="Vegane Pistazienschnecken"
          intro={LOREM}
          calculator={{ facts: RECIPE_FACTS, ingredients: RECIPE_INGREDIENTS }}
          steps={RECIPE_STEPS}
          images={RECIPE_IMAGES}
        />
      </div>
    ),
  },
  {
    id: 'pages-category',
    figma: 'Kategorieseite Nüsse · Unterkategorie Würzige Snacks',
    nodeId: '9231:41043',
    code: '<CategoryPage chrome={…} title="Nüsse" previews={[…]} /> · <SubcategoryPage chrome={…} title="Würzige Snacks" products={…} />',
    note: 'Die Kategorieseite zeigt je Unterkategorie eine Sections / CategoryPreview; „Alle anzeigen“ führt zur Unterkategorie (Templates / Cards Order mit ProductCard / CompactSize und CategoryCard / SM).',
    render: () => (
      <div className="flex flex-col gap-lg">
        <div className={frame}>
          <CategoryPage
            chrome={{ ...chrome, breadcrumb: { items: [{ label: 'Shop', href: '#' }], current: 'Nüsse' } }}
            title="Nüsse"
            previews={[
              { id: 'naturbelassen', title: 'Naturbelassen', href: '#', products: PRODUCTS.slice(0, 3) },
              {
                id: 'wuerzige-snacks',
                title: 'Würzige Snacks',
                href: '#',
                products: PRODUCTS.slice(0, 2),
                categories: CATEGORIES_SAMPLE.slice(0, 1),
                moreProducts: false,
              },
            ]}
          />
        </div>
        <div className={frame}>
          <SubcategoryPage
            chrome={{
              ...chrome,
              breadcrumb: {
                items: [
                  { label: 'Shop', href: '#' },
                  { label: 'Nüsse', href: '#' },
                ],
                current: 'Würzige Snacks',
              },
            }}
            title="Würzige Snacks"
            products={PRODUCTS}
            categories={CATEGORIES_SAMPLE}
          />
        </div>
      </div>
    ),
  },
  {
    id: 'pages-account-logged-out',
    figma: 'Dein Account / Nicht angemeldet',
    nodeId: '9845:35453',
    code: '<AccountLoggedOutPage chrome={…} onSubmit={…} />',
    note: 'Liegt in Figma unter {Dein Account}: Components / Cart / LogIn; das Account-Symbol im Header zeigt abgemeldet.',
    render: () => (
      <div className={frame}>
        <AccountLoggedOutPage chrome={chrome} />
      </div>
    ),
  },
  {
    id: 'pages-account',
    figma: 'Dein Account · 07-Account',
    nodeId: '8975:27217',
    code: '<AccountPage chrome={…} subscription={items} data={…} vouchers={…} orders={…} />',
    render: () => (
      <div className={frame}>
        <AccountPage
          chrome={chrome}
          subscription={SUBSCRIPTION_ITEMS}
          data={
            <div className="flex w-full flex-wrap justify-center gap-md-l">
              <AccountDataBlock title="Dein Profil" actionLabel="Abmelden">
                <AccountSummaryItem label="Vorname:" lines={[[CUSTOMER.firstName]]} />
                <AccountSummaryItem label="E-Mail:" lines={[[CUSTOMER.email]]} />
              </AccountDataBlock>
              <AccountDataBlock title="Deine Adressen">
                <AccountSummaryItem label="Adresse 1:" lines={addressLines(ADDRESS)} />
              </AccountDataBlock>
            </div>
          }
          vouchers={
            <div className="flex w-full flex-wrap justify-center gap-md-l">
              <VoucherCard voucher={VOUCHER} />
              <PromotionPostCard teaser={PROMOTION} />
            </div>
          }
          orders={
            <>
              <PurchaseCard purchase={PURCHASE} className="max-w-panel-max" />
              <PurchaseCard purchase={PURCHASE_ARRIVED} className="max-w-panel-max" />
            </>
          }
        />
      </div>
    ),
  },
  {
    id: 'pages-legal',
    figma: 'Impressum · AGB · Datenschutzerklärung · Widerrufsrecht · Widerrufsformular · Versandrichtlinien …',
    nodeId: '9242:32057',
    code: '<LegalPage chrome={…} title="Impressum" blocks={[{ headline, text }]} />',
    note: 'Eine Vorlage für alle Rechts- und Infotexte; das Widerrufsformular ergänzt Components / SearchPurchase.',
    render: () => (
      <div className="flex w-full flex-col gap-xl">
        <div className={frame}>
          <LegalPage
            chrome={chrome}
            title="Impressum"
            blocks={[
              { headline: 'Angaben gemäß § 5 DDG', text: LOREM },
              { headline: 'Kontakt', text: LOREM },
              { headline: 'Registereintrag', text: LOREM },
              { headline: 'Umsatzsteuer-ID', text: LOREM },
            ]}
          />
        </div>
        <div className={frame}>
          <LegalPage
            chrome={chrome}
            title="Vertrag widerrufen"
            align="center"
            blocks={[{ headline: 'So widerrufst Du Deinen Vertrag', text: LOREM }]}
          >
            <SearchPurchase />
          </LegalPage>
        </div>
      </div>
    ),
  },
  {
    id: 'pages-checkout',
    figma: 'Check-Out Workflow · 06-01 … 06-17',
    nodeId: '9291:37238',
    code: '<CheckoutPage chrome={…} cart={cart} step={<CheckoutDelivery … />} recommendations={…} />',
    render: () => (
      <div className="flex w-full flex-col gap-xl">
        <div className={frame}>
          <CheckoutPage
            chrome={chrome}
            cart={CART}
            recommendations={[
              { title: 'Deine Favoriten:', products: PRODUCTS },
              { title: 'Für Dich Empfohlen:', products: PRODUCTS },
            ]}
          />
        </div>
        <div className={frame}>
          <OrderConfirmationPage chrome={chrome} deliveryDateLabel="10.11.2025" />
        </div>
      </div>
    ),
  },
]
