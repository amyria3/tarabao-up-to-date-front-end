import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  BlogCardsSection as BlogCardsSectionComponent,
  CardRow,
  CustomerReviewedProductsSection as CustomerReviewedProductsSectionComponent,
  CustomerReviewsSection as CustomerReviewsSectionComponent,
  DiscoveryCardSection as DiscoveryCardSectionComponent,
  FeaturedCardRow as FeaturedCardRowComponent,
  ProductCardRow as ProductCardRowComponent,
  ReviewCardsColumn as ReviewCardsColumnComponent,
} from '@/components/LexicalRenderers/CardRow'
import { ProductCard } from '@modules/products/components/product-card'
import { BLOG_POST, DISCOVERY_ROW, FEATURED, FEATURED_BLOG_POST, PRODUCTS, REVIEW, REVIEW_LIKED } from '@/lib/fixtures'
import type { ProductCardModel } from '@/lib/view-models'

/** Lists built from the fixtures as in the library entries, with unique ids. */
const MORE_PRODUCTS: ProductCardModel[] = [...PRODUCTS, ...PRODUCTS.map((p) => ({ ...p, id: `${p.id}_2` }))]
const REVIEWS = [REVIEW, REVIEW_LIKED, { ...REVIEW, id: 'rev_3' }, { ...REVIEW_LIKED, id: 'rev_4' }]
const BLOG_POSTS = [
  BLOG_POST,
  { ...BLOG_POST, id: 'blog_2' },
  { ...BLOG_POST, id: 'blog_3' },
  { ...BLOG_POST, id: 'blog_4' },
]

const productItems = (products: ProductCardModel[]) =>
  products.map((p) => (
    <li key={p.id} className="w-64">
      <ProductCard product={p} />
    </li>
  ))

const meta = {
  title: 'Components/LexicalRenderers/CardRow',
  component: CardRow,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Figma: Sections / CardRow (6604:17026). Section template: H2 (centered with Horizontal Scroll?, otherwise left) and Templates / Cards Order (row or tiles) with one card per <li>.',
      },
    },
  },
  argTypes: { children: { control: false } },
  args: { title: 'Für Dich ausgewählt', children: productItems(PRODUCTS) },
} satisfies Meta<typeof CardRow>

export default meta
type Story = StoryObj<typeof meta>

/** Horizontal Scroll?=False · Type Of Card=Unspecific */
export const Default: Story = {}

export const HorizontalScroll: Story = {
  args: {
    title: 'Auch in diese Aufstriche könntest Du Dich verlieben',
    scroll: true,
    children: productItems(MORE_PRODUCTS),
  },
  parameters: { docs: { description: { story: 'Figma: Horizontal Scroll?=True · Type Of Card=Unspecific.' } } },
}

export const ProductCardRow: Story = {
  render: () => (
    <ProductCardRowComponent
      title="Auch in diese Aufstriche könntest Du Dich verlieben"
      products={MORE_PRODUCTS}
      scroll
    />
  ),
  parameters: {
    docs: { description: { story: 'CardRow · Unspecific with Cards / ProductCard, Horizontal Scroll?=True.' } },
  },
}

export const FeaturedCardRow: Story = {
  render: () => (
    <FeaturedCardRowComponent
      title="Beste TARABAO Snacks für Dein Unternehmen"
      teasers={[FEATURED, FEATURED_BLOG_POST, { ...FEATURED, id: 'feat_3' }]}
    />
  ),
  parameters: {
    docs: { description: { story: 'Figma: Type Of Card=Featured · Variable Card-Hight?=True.' } },
  },
}

export const DiscoveryCardSection: Story = {
  render: () => (
    <DiscoveryCardSectionComponent
      title="Lerne unsere Partnerinnen kennen"
      teasers={[
        ...DISCOVERY_ROW,
        { ...DISCOVERY_ROW[0]!, id: `${DISCOVERY_ROW[0]!.id}-4` },
        { ...DISCOVERY_ROW[1]!, id: `${DISCOVERY_ROW[1]!.id}-5` },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Sections / CardRow · Type Of Card=Discovery (6708:16614). Rows of at most three DiscoveryCards; a growing card pushes its neighbours aside.',
      },
    },
  },
}

export const BlogCardsSection: Story = {
  render: () => <BlogCardsSectionComponent posts={BLOG_POSTS} />,
  parameters: {
    docs: { description: { story: 'Figma: Sections / BlogCards (6605:16723). Scrolling row of Cards / BlogCard.' } },
  },
}

export const CustomerReviewsSection: Story = {
  render: () => <CustomerReviewsSectionComponent reviews={REVIEWS} />,
  parameters: {
    docs: {
      description: { story: 'Figma: Sections / CustomerReviews (7472:20901). Scrolling row of Cards / ReviewCard.' },
    },
  },
}

export const CustomerReviewedProductsSection: Story = {
  render: () => <CustomerReviewedProductsSectionComponent products={PRODUCTS} />,
  parameters: {
    docs: {
      description: {
        story:
          'Figma: Sections / CustomerReviewedProducts (8118:22771). Like CustomerReviews, with Cards / ProductCardWithReviews.',
      },
    },
  },
}

export const ReviewCardsColumn: Story = {
  render: () => <ReviewCardsColumnComponent reviews={[REVIEW, REVIEW_LIKED]} />,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Figma: Sections / ReviewCards (7472:20772), currently not needed according to Figma. Column of Cards / ReviewCard.',
      },
    },
  },
}
