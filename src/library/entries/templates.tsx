import { BlogCard } from '@/components/ui/blog-card'
import { ProductCard } from '@modules/products/components/product-card'
import { HeadlineH2 } from '@/components/ui/typography'
import { CardsOrder } from '@/components/ui/cards-order'
import { Section } from '@/components/ui/section'
import { BLOG_POST, PRODUCTS } from '@/lib/fixtures'
import { Specimen } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

export const templateEntries: LibraryEntry[] = [
  {
    id: 'templates-section',
    figma: 'Templates / Section',
    nodeId: '8308:40715',
    code: '<Section theme="purple-tint-surface-snow">…</Section>',
    note: 'Slots bekommen kein Element (2.7 Layout): Die Inhalte folgen direkt im Wrapper, der sie wie die Figma-Slots waagerecht zentriert. theme pinnt den Farbmodus.',
    render: () => (
      <div className="flex flex-col gap-md">
        <Specimen label="Default">
          <Section>
            <HeadlineH2>Überschrift im ersten Slot</HeadlineH2>
            <p className="type-default-text-lg">Inhalt im zweiten Slot</p>
          </Section>
        </Specimen>
        <Specimen label="theme=purple-tint-surface-snow">
          <Section theme="purple-tint-surface-snow">
            <HeadlineH2>Überschrift im ersten Slot</HeadlineH2>
          </Section>
        </Specimen>
      </div>
    ),
  },
  {
    id: 'templates-cards-order',
    figma: 'Templates / Cards Order',
    nodeId: '8308:37439',
    code: '<CardsOrder variant="row">…</CardsOrder>',
    render: () => (
      <div className="flex flex-col gap-md">
        <Specimen label="Variant=CardsRow">
          <CardsOrder variant="row">
            {[1, 2, 3, 4, 5].map((n) => (
              <li key={n} className="w-96">
                <BlogCard post={{ ...BLOG_POST, id: `b${n}` }} variant="blog" />
              </li>
            ))}
          </CardsOrder>
        </Specimen>
        <Specimen label="Variant=CardsTiles">
          <CardsOrder variant="tiles">
            {PRODUCTS.map((p) => (
              <li key={p.id} className="w-full max-w-card-default-max min-w-card-default-min flex-1">
                <ProductCard product={p} />
              </li>
            ))}
          </CardsOrder>
        </Specimen>
      </div>
    ),
  },
]
