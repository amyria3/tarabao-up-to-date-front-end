import { ArrowUpOrDown, type ArrowUpOrDownSize } from '@/components/ui/arrow-up-or-down'
import { SustainabilityCategoryTag, SustainabilityCategoryTags } from '@/components/ui/sustainability-category-tag'
import { Breadcrumb } from '@modules/common/components/breadcrumbs'
import { InlineFeedbackElement } from '@/components/ui/inline-feedback-element'
import { ReviewStars } from '@/components/ui/review-stars'
import { SearchInput } from '@/components/ui/search-input'
import { TableElement } from '@/components/ui/table-element'
import {
  BulletedList,
  DefaultParagraph,
  Footnote,
  HeadlineH1,
  HeadlineH2,
  HeadlineH3,
  InlineQuestion,
  UserMessageExplanation,
} from '@/components/ui/typography'
import { ValidationSign } from '@/components/ui/validation-sign'
import { SUSTAINABILITY_CATEGORIES } from '@/lib/design-system/sustainability'
import { Specimen, ThemeMatrix } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'
import { CarouselPagination, PaginationDot } from '@/components/ui/carousel-pagination'
import { IngredientRow, IngredientTable } from '@/components/ui/ingredient-row'

const PARAGRAPH =
  'Dieser Absatz charakterisiert den Snack, erzählt etwas über seine Geschichte, wie es in unser Sortiment kommt, erwähnt soziale / ökologische Benefits und lobt die geschmacklichen Qualitäten des Snacks.'

const textEntries: LibraryEntry[] = [
  {
    id: 'primitives-headline-h1',
    figma: 'Primitives / Headline / H1',
    nodeId: '7565:23672',
    code: '<HeadlineH1 variant="default" align="left" />',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <HeadlineH1>Nährwerte & Inhalt</HeadlineH1>
            <HeadlineH1 variant="subtitle">Ein wichtiger Text - interessant für unsere Kundinnen und Kunden</HeadlineH1>
            <HeadlineH1 align="center">Nährwerte & Inhalt</HeadlineH1>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-headline-h2',
    figma: 'Primitives / Headline / H2',
    nodeId: '7565:23679',
    code: '<HeadlineH2 variant="alternative" />',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <HeadlineH2>Nährwerte & Inhalt</HeadlineH2>
            <HeadlineH2 variant="alternative">Nährwerte & Inhalt (Alternative)</HeadlineH2>
            <HeadlineH2 variant="subtitle">Ein wichtiger Text - interessant für unsere Kundinnen und Kunden</HeadlineH2>
            <HeadlineH2 align="center">Nährwerte & Inhalt</HeadlineH2>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-headline-h3',
    figma: 'Primitives / Headline / H3',
    nodeId: '7715:20573',
    code: '<HeadlineH3 variant="subtitle" align="center" />',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <HeadlineH3>Nährwerte & Inhalt</HeadlineH3>
            <HeadlineH3 variant="subtitle">Ein wichtiger Text - interessant für unsere Kundinnen und Kunden</HeadlineH3>
            <HeadlineH3 align="center">Nährwerte & Inhalt</HeadlineH3>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-default-paragraph',
    figma: 'Primitives / DefaultParagraph',
    nodeId: '7565:23423',
    code: '<DefaultParagraph size="lg" minWidth="block" />',
    note: 'In Figma nutzt FontSize=LG mit min-w=x-SM den Stil DefaultText S; hier sind Größe und Mindestbreite getrennte Props.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="size=lg · minWidth=block">
              <DefaultParagraph>{PARAGRAPH}</DefaultParagraph>
            </Specimen>
            <Specimen label="size=md">
              <DefaultParagraph size="md">{PARAGRAPH}</DefaultParagraph>
            </Specimen>
            <Specimen label="size=s · minWidth=inline">
              <DefaultParagraph size="s" minWidth="inline">
                {PARAGRAPH}
              </DefaultParagraph>
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-footnote',
    figma: 'Primitives / Paragraphs / Footnote',
    nodeId: '7565:23645',
    code: '<Footnote />',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => <Footnote>*Hier mehr über unsere Nachhaltigkeitsskala erfahren</Footnote>}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-bulleted-list',
    figma: 'Primitives / BulletedList',
    nodeId: '4221:27964',
    code: '<BulletedList items={[…]} />',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <BulletedList
            items={[
              'Hergestellt in unserer hauseigenen Manufaktur',
              'Keine künstlichen Zusatzstoffe oder Aromen',
              'Publikumsliebling',
              'Verpackung: vollständig recyclebar oder Pfand',
              'Schokolade aus Kooperative Anamnese',
              'Vegan & Bio',
            ]}
          />
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-user-message',
    figma: 'Primitives / UserMessage & Explanation',
    nodeId: '6811:20757',
    code: '<UserMessageExplanation title="…">…</UserMessageExplanation>',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <UserMessageExplanation title="Danke Für Deine Zahlung!">
            Deine Bestellung kommt voraussichtlich am 10.11.2025.
          </UserMessageExplanation>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-inline-question',
    figma: 'Primitives / Inline Question & Button',
    nodeId: '6072:33346',
    code: '<InlineQuestion question="Adresse manuell eingeben?" action="Manuell eingeben" />',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => <InlineQuestion question="Adresse manuell eingeben?" action="Manuell eingeben" />}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-table-element',
    figma: 'Primitives / TableElement',
    nodeId: '2040:1345',
    code: '<TableElement head={[…]} rows={[[…]]} />',
    note: 'Werte sind die Platzhalter aus Figma.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <TableElement
            caption="Nährwerte"
            head={['Durchschnittliche Nährwerte', 'Pro 100 Gramm', 'Pro andere Messeinheit']}
            rows={[['Durchschnittliche Nährwerte', '2361 kJ / 564 kcal', '689361 kJ / 5984364 kcal']]}
          />
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-breadcrumb',
    figma: 'Primitives / Breadcrumb',
    nodeId: '3155:5202',
    code: "<Breadcrumb items={[{ label: 'Startseite', href }, …, { label: 'Aktuelle Seite' }]} />",
    note: 'Pfad wie in der Storefront: Der erste Eintrag ist die Startseite, der letzte die aktuelle Seite. Reicht die Breite nicht, ersetzen Dots die vorderen Stationen und verlinken die letzte verdeckte.',
    render: () => (
      <ThemeMatrix columns={1}>
        {() => (
          <Breadcrumb
            items={[
              { label: 'Startseite', href: '#' },
              { label: 'Bereich der Webseite', href: '#' },
              { label: 'Überkategorie', href: '#' },
              { label: 'Your current destination' },
            ]}
          />
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-review-stars',
    figma: 'Primitives / ReviewStars',
    nodeId: '8118:22969',
    code: '<ReviewStars rating={5} label="Gekauft von 30493 Menschen" />',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <ReviewStars label="Gekauft von 30493 Menschen" />
            <ReviewStars rating={4} align="center" label="Gekauft von 30493 Menschen" />
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-validation-sign',
    figma: 'Primitives / ValidationSign',
    nodeId: '2406:1344',
    code: '<ValidationSign variant="valid" />',
    render: () => (
      <ThemeMatrix>
        {() => (
          <Specimen label="error · valid · clear">
            <ValidationSign variant="error" />
            <ValidationSign variant="valid" />
            <ValidationSign variant="clear" />
          </Specimen>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-inline-feedback',
    figma: 'Primitives / InlineFeedbackElement',
    nodeId: '2337:1353',
    code: '<InlineFeedbackElement tone="warning" closable />',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <InlineFeedbackElement tone="success">Content</InlineFeedbackElement>
            <InlineFeedbackElement tone="warning">Content</InlineFeedbackElement>
            <InlineFeedbackElement tone="warning" closable>
              Content (Close allowed?=True, Klick blendet aus)
            </InlineFeedbackElement>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-ingredient-row',
    figma: 'Primitives / IngredientRow',
    nodeId: '9559:38929',
    code: '<IngredientTable><IngredientRow amount="50 g" name="Haferflocken" /><IngredientRow variant="group" title="Für den Teig" /></IngredientTable>',
    note: 'Variant=Zutat (Menge, Zutat) oder Gruppe (Zwischenüberschrift). Linien aus der Zeilenfläche content-text und 1 px Abstand, wie NutritionTable.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <IngredientTable>
            <IngredientRow variant="group" title="Für den Teig" />
            <IngredientRow amount="200 g" name="Haferflocken" />
            <IngredientRow amount="150 ml" name="Hafermilch" />
            <IngredientRow variant="group" title="Zum Bestreuen" />
            <IngredientRow amount="20 g" name="Walnüsse, gehackt" />
          </IngredientTable>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-carousel-pagination',
    figma: 'Primitives / CarouselPagination · PaginationDot',
    nodeId: '9324:45197',
    code: '<CarouselPagination pages={3} page={0} onPageChange={…} />',
    note: 'Die Anzahl der Punkte ergibt sich aus der Anzahl der Seiten; Active?=True markiert die sichtbare Seite.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="PaginationDot · Active?=True / False">
              <PaginationDot active />
              <PaginationDot />
            </Specimen>
            <Specimen label="CarouselPagination · Seite 1 von 3">
              <CarouselPagination pages={3} page={0} />
            </Specimen>
            <Specimen label="Seite 2 von 3">
              <CarouselPagination pages={3} page={1} />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-search-input',
    figma: 'Primitives / SearchInput · Primitives / InputText',
    nodeId: '2171:2737',
    code: '<SearchInput />',
    note: 'Primitives / InputText (2182:1829) ist die Textebene der Eingaben; im Code trägt sie ui/input bzw. SearchInput.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Input?=False">
              <SearchInput aria-label="Suche" />
            </Specimen>
            <Specimen label="Input?=True">
              <SearchInput aria-label="Suche" defaultValue="Cashew" />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
]

const SIZES: ArrowUpOrDownSize[] = [30, 22, 14, 6]

export const primitiveEntries: LibraryEntry[] = [
  ...textEntries,
  {
    id: 'primitives-arrow-up-or-down',
    figma: 'ArrowUpOrDown',
    nodeId: '283:640',
    code: '<ArrowUpOrDown variant="down" size={14} />',
    render: () => (
      <ThemeMatrix>
        {() =>
          SIZES.map((size) => (
            <Specimen key={size} label={`Size=${size} · up / down`}>
              <ArrowUpOrDown size={size} variant="up" />
              <ArrowUpOrDown size={size} variant="down" />
            </Specimen>
          ))
        }
      </ThemeMatrix>
    ),
  },
  {
    id: 'primitives-sustainability-category-tag',
    figma: 'SustainabilityCategoryTag',
    nodeId: '8125:24718',
    code: '<SustainabilityCategoryTag category="transportation" />',
    note: 'Gruppe aller Etiketten: SustainabilityCategoryTag (8126:24742) → <SustainabilityCategoryTags />.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Einzeln · Show Icon?=true / false">
              {SUSTAINABILITY_CATEGORIES.map((c) => (
                <SustainabilityCategoryTag key={c.key} category={c.key} />
              ))}
              <SustainabilityCategoryTag category="transportation" showIcon={false} />
            </Specimen>
            <Specimen label="Gruppe">
              <SustainabilityCategoryTags />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
]
