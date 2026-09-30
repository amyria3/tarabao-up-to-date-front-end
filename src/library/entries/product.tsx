import { ShippingCostsInfo } from '@/components/design-system/primitives/shipping-costs-info'
import { BuyBox } from '@/components/design-system/product/buy-box'
import { SizeAndPrice } from '@/components/design-system/product/size-and-price'
import { Disclosure } from '@/components/design-system/product/disclosure'
import { Ingredients, NutritionTable, SupplierInfo } from '@/components/design-system/product/product-info'
import { ProductGallery } from '@/components/design-system/product/product-gallery'
import { DefaultParagraph } from '@/components/design-system/primitives/typography'
import { ProductImage } from '@/components/design-system/visuals/product-image'
import { PRODUCT_DETAIL } from '@/lib/fixtures'
import { ThemeMatrix } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const LOREM =
  'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.'

export const productEntries: LibraryEntry[] = [
  {
    id: 'components-product-buy-box',
    figma: 'Components / Product / BuyBox',
    nodeId: '3164:4829',
    code: '<BuyBox product={product} onAddToCart={…} />',
    note: 'Components / Product / SizeAndPrice wechselt Preis und Grundpreis je Packungsgröße; Primitives / ShippingCostsInfo zeigt beim Hover die Versandkosten; Choice schaltet zwischen Einmalkauf und Abo.',
    render: () => <ThemeMatrix columns={2}>{() => <BuyBox product={PRODUCT_DETAIL} />}</ThemeMatrix>,
  },
  {
    id: 'components-product-size-and-price',
    figma: 'Components / Product / SizeAndPrice',
    nodeId: '9473:50567',
    code: '<SizeAndPrice variants={product.variants} onValueChange={…} />',
    note: 'Achse Size (Pack, Multipack, Bulk): Ein Klick auf einen Chip wechselt die Größe, Preis und Kilopreis kommen je Größe aus den Produktdaten (__Products / Doypacks).',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <div className="flex flex-col gap-md">
            <SizeAndPrice variants={PRODUCT_DETAIL.variants} defaultValue="pack" />
            <SizeAndPrice variants={PRODUCT_DETAIL.variants} defaultValue="multipack" />
            <SizeAndPrice variants={PRODUCT_DETAIL.variants} defaultValue="bulk" />
          </div>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-shipping-costs-info',
    figma: 'Primitives / ShippingCostsInfo',
    nodeId: '9488:44712',
    code: '<ShippingCostsInfo href="/de-de/versandrichtlinien" />',
    note: 'State=Hover zeigt die Information Bubble (Fill, ohne Icon) rechtsbündig über dem Link; im Code bei Hover und Fokus (role="tooltip").',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <div className="flex flex-col gap-xxxl pt-xxxl">
            <ShippingCostsInfo />
            <ShippingCostsInfo forceOpen />
          </div>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'visuals-product-gallery',
    figma: 'Visuals / Product / Image · Variant=Default (Galerie) · Images',
    nodeId: '2531:2860',
    code: '<ProductGallery images={product.images} title={product.title} />',
    note: 'Bilder als Platzhalterflächen (surface-placeholder). „Images“ (418:991) ist die ältere Galerie und geht hierin auf.',
    render: () => (
      <div className="w-full max-w-128">
        <ProductGallery images={PRODUCT_DETAIL.images} title={PRODUCT_DETAIL.title} />
      </div>
    ),
  },
  {
    id: 'components-disclosure',
    figma: 'Components / Disclosure · ContentModules / NutritionTable · Ingredients',
    nodeId: '283:633',
    code: '<Disclosure title="Inhaltsstoffe"><Ingredients ingredients={…} /></Disclosure>',
    note: 'State=Overlay öffnet ein Overlay statt aufzuklappen (onOpenOverlay), der Pfeil zeigt nach rechts.',
    render: () => (
      <div className="flex w-full flex-col">
        <Disclosure title="Titel">
          <DefaultParagraph size="lg">{LOREM}</DefaultParagraph>
        </Disclosure>
        <Disclosure title="Titel (Open)" defaultOpen>
          <DefaultParagraph size="lg">{LOREM}</DefaultParagraph>
        </Disclosure>
        <Disclosure title="Titel (Overlay)" overlay />
        <Disclosure title="Inhaltsstoffe" defaultOpen>
          <Ingredients ingredients={PRODUCT_DETAIL.ingredients!} />
        </Disclosure>
        <Disclosure title="Nährwerte" defaultOpen>
          <NutritionTable nutrition={PRODUCT_DETAIL.nutrition!} />
        </Disclosure>
        <Disclosure
          title="Informationen zu den Lieferanten und der Lieferkette"
          defaultOpen
          contentClassName="px-xl pt-md-l pb-xl"
        >
          <SupplierInfo suppliers={PRODUCT_DETAIL.suppliers!} />
        </Disclosure>
        <Disclosure title="Ladensuche" defaultOpen>
          <div className="h-118 w-full">
            <ProductImage />
          </div>
        </Disclosure>
        <Disclosure title="Das könnte ein Rezept oder ein Serviervorschlag werden" />
      </div>
    ),
  },
]
