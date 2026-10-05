import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { OrderCancellation } from '@/components/design-system/cancellation/order-cancellation'
import { CompanyPage, LegalPage } from '@/components/design-system/pages/shop-pages'
import { PageTemplate } from '@/components/design-system/templates/page'
import { Section } from '@/components/design-system/templates/section'
import { CANCELLABLE_ORDERS, RETURNABLE_ITEMS } from '@/lib/fixtures'
import { chrome } from '@/lib/shop/chrome'
import { STATIC_PAGES } from '@/lib/shop/content'

type Params = Promise<{ countryCode: string; slug: string }>

export function generateStaticParams() {
  return Object.keys(STATIC_PAGES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const page = STATIC_PAGES[slug]
  return { title: page && page.kind !== 'cancellation' ? page.title : 'Widerrufsformular' }
}

/** Statische Seiten aus 2.2: Rechtstexte (ContentModules / Basic), Unternehmensseiten, Widerruf-Workflow. */
export default async function StaticRoute({ params }: { params: Params }) {
  const { countryCode, slug } = await params
  const page = STATIC_PAGES[slug]
  if (!page) notFound()
  const c = chrome(countryCode)
  if (page.kind === 'legal') return <LegalPage chrome={c} title={page.title} align={page.align} blocks={page.blocks} />
  if (page.kind === 'company') return <CompanyPage chrome={c} {...page} />
  return (
    <PageTemplate {...c}>
      <Section aria-label="Widerrufsformular">
        <OrderCancellation orders={CANCELLABLE_ORDERS} items={RETURNABLE_ITEMS} />
      </Section>
    </PageTemplate>
  )
}
