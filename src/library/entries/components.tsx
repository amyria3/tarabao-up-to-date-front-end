import { BlockElement } from '@/components/ui/block-element'
import { FilterChip } from '@modules/search/components/filter-chip'
import { FilterPanel } from '@modules/search/components/filter-panel'
import { PriceChip, PriceRange } from '@modules/search/components/price-range'
import { PortionCalculator, RecipeHeader } from '@modules/blog/components/recipe'
import { QueryState } from '@modules/search/components/query-state'
import { SearchField } from '@modules/search/components/search-field'
import { FILTER_OPTIONS, RECIPE_FACTS, RECIPE_INGREDIENTS } from '@/lib/fixtures'
import { Specimen, ThemeMatrix } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

export const componentEntries: LibraryEntry[] = [
  {
    id: 'components-block-element',
    figma: 'Components / BlockElement',
    nodeId: '7797:22472',
    code: '<BlockElement variant="newsletter" padding />',
    note: 'Newsletter: onSubscribe(email) bindet die Anmeldung an. Widerruf: Link auf die Widerrufsseite.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Variant=Newsletter, Padding?=True">
              <BlockElement variant="newsletter" padding />
            </Specimen>
            <Specimen label="Variant=Widerruf, Padding?=False">
              <BlockElement variant="widerruf" />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'components-filter-chip',
    figma: 'Components / Filter / FilterChip',
    nodeId: '2165:2011',
    code: '<FilterChip label="Müsli" selected={on} onSelectedChange={setOn} />',
    note: 'Clrs / Filter Panel hat nur einen Modus. Umschalter mit aria-pressed; gewählt mit Kreuz.',
    render: () => (
      <div className="flex flex-wrap items-center gap-md">
        <Specimen label="Default">
          <FilterChip label="Müsli" />
        </Specimen>
        <Specimen label="Hover">
          <FilterChip label="Müsli" forceHover />
        </Specimen>
        <Specimen label="Selected">
          <FilterChip label="nur Direktlieferungen" selected />
        </Specimen>
        <Specimen label="Selected · Hover">
          <FilterChip label="nur Direktlieferungen" selected forceHover />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-price-range',
    figma: 'Components / Filter / PriceRange · Drop Down Button · PriceFilterInput · Chip(s)',
    nodeId: '2605:2931',
    code: '<PriceRange value={value} onValueChange={setValue} />',
    note: 'Minimum und Maximum übernehmen den Wert beim Verlassen des Feldes oder mit Enter; die Chips entfernen eine Grenze.',
    render: () => (
      <div className="flex flex-wrap items-start gap-xl">
        <Specimen label="Open?=False">
          <PriceRange />
        </Specimen>
        <Specimen label="Open?=True">
          <PriceRange defaultOpen />
        </Specimen>
        <Specimen label="Chips">
          <div className="flex gap-1">
            <PriceChip label="ab 5 Euro" />
            <PriceChip label="bis 15 Euro" />
          </div>
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-filter-panel',
    figma: 'Components / Filter / FilterPanel',
    nodeId: '2211:2165',
    code: '<FilterPanel options={options} value={value} onValueChange={setValue} />',
    note: 'Mit aktivem Filter rücken die Chips nach links (Filtering?=True).',
    render: () => <FilterPanel options={FILTER_OPTIONS} />,
  },
  {
    id: 'components-search-input',
    figma: 'Components / Search / Input',
    nodeId: '2339:2155',
    code: '<SearchField value={query} onValueChange={setQuery} />',
    render: () => (
      <div className="flex flex-col gap-md">
        <Specimen label="Default">
          <SearchField />
        </Specimen>
        <Specimen label="Eingabe">
          <SearchField defaultValue="ungeschälte irgendwas" />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-query-state',
    figma: 'Components / Search / QueryState',
    nodeId: '2216:2060',
    code: '<QueryState state="idle" />',
    render: () => (
      <div className="flex flex-col gap-md">
        <Specimen label="Search-Request or Filter?=False">
          <QueryState state="idle" />
        </Specimen>
        <Specimen label="Search-Request or Filter?=True, Results?=False">
          <QueryState state="empty" />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'components-recipe-portion-calculator',
    figma: 'Components / Recipe / PortionCalculator · RecipeHeader',
    nodeId: '9323:45127',
    code: '<PortionCalculator facts={facts} ingredients={ingredients} baseServings={1} />',
    note: 'RecipeHeader: Badges links, Drucken und Weiterleiten rechts (bricht um). Der Zähler rechnet die Mengen auf die Portionen um; das Design zeigt 1 Portion.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <div className="flex w-full flex-col gap-lg">
            <Specimen label="RecipeHeader">
              <RecipeHeader facts={RECIPE_FACTS} />
            </Specimen>
            <Specimen label="PortionCalculator">
              <PortionCalculator facts={RECIPE_FACTS} ingredients={RECIPE_INGREDIENTS} />
            </Specimen>
          </div>
        )}
      </ThemeMatrix>
    ),
  },
]
