import { Nutmixer } from '@modules/nutmixer/components/nutmixer'
import { NutmixerItem } from '@modules/nutmixer/components/nutmixer-item'
import { NUTMIXER_CATEGORIES_DEMO, NUTMIXER_PRODUCTS } from '@/lib/fixtures'
import { Specimen } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

export const nutmixerEntries: LibraryEntry[] = [
  {
    id: 'components-nutmixer',
    figma: 'Components / Nutmixer',
    nodeId: '8863:27584',
    code: '<Nutmixer categories={categories} products={products} onOrder={…} />',
    note: '„Zur Mischung“ auf einer Karte fügt 75 g hinzu. „Nussmix bestellen“ wird aktiv, sobald die Packung (750 g) voll ist. Die Tüte ist ein Platzhalter.',
    render: () => (
      <Nutmixer
        categories={NUTMIXER_CATEGORIES_DEMO}
        products={NUTMIXER_PRODUCTS}
        defaultMix={{ nuesse_1: 2, nuesse_2: 1, beeren_1: 1 }}
      />
    ),
  },
  {
    id: 'components-nutmixer-item',
    figma: 'Components / Nutmixer / Item',
    nodeId: '8562:28599',
    code: '<NutmixerItem title="…" stepPriceLabel="3,60 € / 75 kg" stepGrams={75} quantity={1} />',
    render: () => (
      <Specimen label="Show Image?=False">
        <div className="w-full max-w-block-max">
          <NutmixerItem
            title="Gefriergetrocknete Himbeeren in Zartbitterschokolade"
            stepPriceLabel="3,60 € / 75 kg"
            stepGrams={75}
            quantity={1}
          />
        </div>
      </Specimen>
    ),
  },
]
