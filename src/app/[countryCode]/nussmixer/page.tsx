import { NutmixerPage } from '@/components/design-system/pages/shop-pages'
import { NUTMIXER_CATEGORIES_DEMO, NUTMIXER_PRODUCTS } from '@/lib/fixtures'
import { chrome } from '@/lib/shop/chrome'
import { localize } from '@/lib/shop/routes'

export const metadata = { title: 'Nuss-Mixer' }

export default async function NutmixerRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  return (
    <NutmixerPage
      chrome={chrome(countryCode)}
      categories={NUTMIXER_CATEGORIES_DEMO}
      products={localize(NUTMIXER_PRODUCTS, countryCode)}
    />
  )
}
