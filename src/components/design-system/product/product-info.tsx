import { DefaultParagraph, Footnote } from '@/components/design-system/primitives/typography'
import { TableElement } from '@/components/design-system/primitives/table-element'
import type { ProductDetailModel, SupplierModel } from '@/lib/view-models'
import { cn } from '@/lib/utils'

/**
 * Figma: ContentModules / NutritionTable (8493:148). Primitives / TableElement mit Kopfzeile
 * „Durchschnittliche Nährwerte · Pro 100 Gramm“ und Linien in content-text, max-w-block-double-max.
 */
export function NutritionTable({
  nutrition,
  className,
}: {
  nutrition: NonNullable<ProductDetailModel['nutrition']>
  className?: string
}) {
  return (
    <div data-slot="nutrition-table" className={cn('w-full max-w-block-double-max', className)}>
      <TableElement head={nutrition.head} rows={nutrition.rows} caption="Nährwerte" lines />
    </div>
  )
}

/**
 * Figma: ContentModules / Ingredients (8493:209). Spalte gap-xs pb-lg, max-w-block-double-max:
 * Primitives / DefaultParagraph LG und Primitives / Paragraphs / Footnote.
 */
export function Ingredients({
  ingredients,
  className,
}: {
  ingredients: NonNullable<ProductDetailModel['ingredients']>
  className?: string
}) {
  return (
    <div data-slot="ingredients" className={cn('flex w-full max-w-block-double-max flex-col gap-xs pb-lg', className)}>
      <DefaultParagraph size="lg">{ingredients.text}</DefaultParagraph>
      {ingredients.footnotes?.map((note) => (
        <Footnote key={note} className="text-left">
          {note}
        </Footnote>
      ))}
    </div>
  )
}

/**
 * Figma: Components / Disclosure · Type=Lieferkette und Lieferanten. Je Partner: Name
 * (ProductPage/Dropdown/H3 ManufacturerName), Hinweis (DefaultText S) und eine Tabelle aus
 * Frage (ProductPage/Dropdown/H4 Question, 372 px) und Antwort (BodyText - Responce).
 */
export function SupplierInfo({ suppliers, className }: { suppliers: SupplierModel[]; className?: string }) {
  return (
    <div data-slot="supplier-info" className={cn('flex w-full flex-col gap-lg', className)}>
      {suppliers.map((supplier) => (
        <section key={supplier.name} className="flex w-full flex-col text-content-text" aria-label={supplier.name}>
          <div className="flex flex-col gap-xxs">
            <h4 className="type-product-page-dropdown-h3-manufacturer-name">{supplier.name}</h4>
            {supplier.note ? <p className="type-default-text-s">{supplier.note}</p> : null}
          </div>
          <dl className="flex w-full flex-col gap-px">
            {supplier.facts.map((fact) => (
              <div key={fact.question} className="flex w-full flex-wrap gap-px">
                <dt className="flex min-h-10 w-93 flex-col justify-center bg-surface pt-md-sm type-product-page-dropdown-h4-question">
                  {fact.question}
                </dt>
                <dd className="flex min-h-10 min-w-block-inline-min flex-1 flex-col justify-center bg-surface py-xxs pl-xl type-product-page-dropdown-body-text-responce">
                  {fact.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
