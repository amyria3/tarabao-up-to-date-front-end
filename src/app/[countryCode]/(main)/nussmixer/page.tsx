import { NutmixerPage } from '@modules/nutmixer/templates/nutmixer-page'
import { NUTMIXER_CATEGORIES_DEMO, NUTMIXER_PRODUCTS } from '@/lib/fixtures'
import { localize } from '@/lib/shop/routes'

export const metadata = { title: 'Nuss-Mixer' }

export default async function NutmixerRoute({ params }: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await params
  return <NutmixerPage categories={NUTMIXER_CATEGORIES_DEMO} products={localize(NUTMIXER_PRODUCTS, countryCode)} />
}
