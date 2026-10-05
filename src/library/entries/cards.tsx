import { CategoryCardMd, CategoryCardSm } from '@modules/categories/components/category-card'
import { BlogCard } from '@/components/ui/blog-card'
import { DiscoveryCard } from '@/components/ui/discovery-card'
import { FeaturedCard } from '@/components/ui/featured-card'
import { PromotionPostCard } from '@/components/ui/promotion-post-card'
import { PurchaseCard } from '@modules/account/components/purchase-card'
import { ReviewCard } from '@/components/ui/review-card'
import { DiscoveryCardRow } from '@/components/ui/discovery-card-row'
import { MegaCard, type MegaCardVariant } from '@/components/LexicalRenderers/MegaCard'
import { ProductCard, ProductCardWithReviews } from '@modules/products/components/product-card'
import { VoucherCard } from '@modules/account/components/voucher-card'
import { ImageCard } from '@/components/LexicalRenderers/ImageCarousel'
import { ProductImage } from '@modules/products/components/product-image'
import {
  BLOG_POST,
  CATEGORIES_SAMPLE,
  COMPACT_PRODUCT,
  DISCOVERY,
  DISCOVERY_ROW,
  FEATURED,
  FEATURED_BLOG_POST,
  MEGA_CARDS,
  PRODUCTS,
  PROMOTION,
  PURCHASE,
  PURCHASE_ARRIVED,
  REVIEW,
  REVIEW_LIKED,
  VOUCHER,
} from '@/lib/fixtures'
import { RECIPE_IMAGES } from '@/lib/fixtures'
import { Specimen, ThemeMatrix } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const MEGA_VARIANTS: MegaCardVariant[] = ['orange-black', 'blue-green', 'happy-yellow', 'purple-black']

export const cardEntries: LibraryEntry[] = [
  {
    id: 'cards-product-default',
    figma: 'Cards / ProductCard / DefaultSize',
    nodeId: '2356:2667',
    code: '<ProductCard product={product} />',
    note: 'Hover?=True zeigt Buttons / SM / Button-Card. Bilder sind Platzhalter (surface-placeholder).',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Variant=1 · Default">
              <ProductCard product={PRODUCTS[0]!} />
            </Specimen>
            <Specimen label="Hover">
              <ProductCard product={PRODUCTS[0]!} forceHover />
            </Specimen>
            <Specimen label="Variant=3 · langer Name">
              <ProductCard product={PRODUCTS[2]!} />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-product-compact',
    figma: 'Cards / ProductCard / CompactSize',
    nodeId: '8555:27280',
    code: '<ProductCard size="compact" product={product} context="nutmixer" />',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Context=Shop">
              <ProductCard size="compact" product={COMPACT_PRODUCT} />
            </Specimen>
            <Specimen label="Context=Nutmixer · Hover">
              <ProductCard size="compact" product={COMPACT_PRODUCT} context="nutmixer" forceHover />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-product-with-reviews',
    figma: 'Cards / ProductCardWithReviews',
    nodeId: '8308:32238',
    code: '<ProductCardWithReviews product={product} />',
    render: () => <ThemeMatrix>{() => <ProductCardWithReviews product={PRODUCTS[0]!} />}</ThemeMatrix>,
  },
  {
    id: 'cards-category-sm',
    figma: 'Cards / CategoryCard / SM',
    nodeId: '2628:2698',
    code: '<CategoryCardSm category={category} />',
    note: 'Der Bildrand nutzt in Figma das Primitive purple-early-evening-sky-light.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <CategoryCardSm category={CATEGORIES_SAMPLE[0]!} />
            <CategoryCardSm category={CATEGORIES_SAMPLE[1]!} forceHover />
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-category-md',
    figma: 'Cards / CategoryCard / MD',
    nodeId: '2638:2654',
    code: '<CategoryCardMd category={category} />',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <CategoryCardMd category={CATEGORIES_SAMPLE[2]!} />
            <CategoryCardMd category={CATEGORIES_SAMPLE[2]!} forceHover />
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-voucher',
    figma: 'Cards / VoucherCard',
    nodeId: '3912:19811',
    code: '<VoucherCard voucher={voucher} specialTheme="forest" />',
    note: 'Code-Fläche folgt data-special-theme (forest | lilac).',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <VoucherCard voucher={VOUCHER} />
            <VoucherCard voucher={VOUCHER} forceHover />
            <VoucherCard voucher={VOUCHER} specialTheme="lilac" />
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-mega',
    figma: 'Cards / MegaCard',
    nodeId: '2143:2061',
    code: '<MegaCard card={card} variant="orange-black" />',
    note: 'Variant → data-lively-theme und Aufbau. Min/Max: „max 1259“ ist der Grundzustand, „min 1260“ gilt ab lg. Fließtext: **fett** und [Link](href).',
    render: () => (
      <div className="flex flex-col gap-md">
        {MEGA_VARIANTS.map((variant) => (
          <Specimen key={variant} label={`Variant=${variant}`}>
            <MegaCard card={MEGA_CARDS[variant]} variant={variant} />
          </Specimen>
        ))}
      </div>
    ),
  },
  {
    id: 'cards-blog',
    figma: 'Cards / BlogCard',
    nodeId: '380:881',
    code: '<BlogCard post={post} variant="blog" />',
    note: 'Variant=Blog zentriert den Titel, Variant=Default setzt ihn linksbündig.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Variant=Blog">
              <BlogCard post={BLOG_POST} variant="blog" />
            </Specimen>
            <Specimen label="Variant=Default · Hover">
              <BlogCard post={BLOG_POST} forceHover />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-review',
    figma: 'Cards / ReviewCard',
    nodeId: '2194:1982',
    code: '<ReviewCard review={review} />',
    note: 'Reactions? folgt aus review.likes. Ein Klick auf den Text öffnet die ganze Bewertung (<details>); in Figma heißt der gekürzte Zustand State?=Open.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Reactions?=False">
              <ReviewCard review={REVIEW} />
            </Specimen>
            <Specimen label="Reactions?=True">
              <ReviewCard review={REVIEW_LIKED} />
            </Specimen>
            <Specimen label="Reactions?=True · aufgeklappt">
              <ReviewCard review={REVIEW_LIKED} defaultOpen />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-featured',
    figma: 'Cards / FeaturedCard',
    nodeId: '6704:18568',
    code: '<FeaturedCard teaser={teaser} variant="blog-post" />',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Variant=Default">
              <FeaturedCard teaser={FEATURED} />
            </Specimen>
            <Specimen label="Variant=BlogPost · Hover">
              <FeaturedCard teaser={FEATURED_BLOG_POST} variant="blog-post" forceHover />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-discovery',
    figma: 'Cards / DiscoveryCard',
    nodeId: '6708:16673',
    code: '<DiscoveryCard teaser={teaser} />',
    note: 'Hover (und Fokus) verbreitert die Karte auf card-discovery-max und zeigt teaser.facts.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="State=Default">
              <DiscoveryCard teaser={DISCOVERY} />
            </Specimen>
            <Specimen label="State=Hover">
              <DiscoveryCard teaser={DISCOVERY} forceHover />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-discovery-row',
    figma: 'Sections / CardRow · Type Of Card=Discovery',
    nodeId: '6708:16614',
    code: '<DiscoveryCardRow teasers={teasers} />',
    note: 'Ab lg: Die erste Karte schiebt die Nachbarn nach rechts, die letzte nach links, eine mittlere zu beiden Seiten. Unter lg brechen die Karten um und wachsen nicht.',
    render: () => (
      <div className="flex flex-col gap-xl">
        <Specimen label="Default (Hover mit der Maus ausprobieren)">
          <DiscoveryCardRow teasers={DISCOVERY_ROW} />
        </Specimen>
        <Specimen label="Hover erste Karte">
          <DiscoveryCardRow teasers={DISCOVERY_ROW} forceHoverIndex={0} />
        </Specimen>
        <Specimen label="Hover mittlere Karte">
          <DiscoveryCardRow teasers={DISCOVERY_ROW} forceHoverIndex={1} />
        </Specimen>
        <Specimen label="Hover letzte Karte">
          <DiscoveryCardRow teasers={DISCOVERY_ROW} forceHoverIndex={2} />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'cards-promotion-post',
    figma: 'Cards / PromotionPostCard',
    nodeId: '3912:19740',
    code: '<PromotionPostCard teaser={teaser} />',
    render: () => <ThemeMatrix>{() => <PromotionPostCard teaser={PROMOTION} />}</ThemeMatrix>,
  },
  {
    id: 'cards-purchase',
    figma: 'Cards / PurchaseCard',
    nodeId: '6748:17300',
    code: '<PurchaseCard purchase={purchase} />',
    note: 'Mit Components / PurchaseSummary (Rechnung, Verfolgen als XXXS-Inline-Links).',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Status=Sent">
              <PurchaseCard purchase={PURCHASE} />
            </Specimen>
            <Specimen label="Status=Arrived">
              <PurchaseCard purchase={PURCHASE_ARRIVED} />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-product-image',
    figma: 'Visuals / Product / Image · Primitives / ProductImg',
    nodeId: '205:579',
    code: '<ProductImage image={{ src, alt }} />',
    note: 'Ohne Bild: Fläche surface-placeholder. Mit Bild: next/image, object-fit cover.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <div className="h-52 w-full">
            <ProductImage />
          </div>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'cards-image-card',
    figma: 'Cards / ImageCard',
    nodeId: '9324:45224',
    code: '<ImageCard card={card} onClick={…} />',
    note: 'Bild 240 × 144 mit Bildunterschrift (Caption); Hover zeigt das Auge, ein Klick öffnet Components / OverlayComponents / Image (siehe Sections / ImageCarousel).',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Default">
              <ImageCard card={RECIPE_IMAGES[0]!} />
            </Specimen>
            <Specimen label="Hover">
              <ImageCard card={RECIPE_IMAGES[1]!} forceHover />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
]
