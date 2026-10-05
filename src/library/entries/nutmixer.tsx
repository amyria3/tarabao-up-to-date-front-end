import { Nutmixer } from '@modules/nutmixer/components/nutmixer'
import { NutmixerItem } from '@modules/nutmixer/components/nutmixer-item'
import { MixBar } from '@modules/nutmixer/components/mix-bar'
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
  {
    id: 'components-nutmixer-mixbar',
    figma: 'Components / Nutmixer / MixBar',
    nodeId: '10039:83453',
    code: '<MixBar fillPercent={60} className="sticky bottom-zero md:hidden">{mischung}</MixBar>',
    note: 'Nur auf dem Handy: Der Nussmixer setzt die Leiste an sein Ende, dort klebt sie unten. „Ansehen“ öffnet die Mischung als Bottom Sheet (Open?=True); Kreuz, Escape, Tippen auf den Hintergrund oder Wischen nach unten schließen es.',
    render: () => (
      <Specimen label="Open?=False">
        <div className="w-full max-w-block-max">
          <MixBar fillPercent={60}>
            <p className="type-label-default">Hier steht im Nussmixer die Mischung.</p>
          </MixBar>
        </div>
      </Specimen>
    ),
  },
]
