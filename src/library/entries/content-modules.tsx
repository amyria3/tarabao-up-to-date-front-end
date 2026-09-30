import {
  BasicWithDisclosure,
  ContactForm,
  ContentBasic,
  ContentCta,
  CustomContentWithImg,
  CustomContentWithText,
  Editorial,
  MediaText,
} from '@/components/design-system/content-modules/content-modules'
import type { ModuleHeadlineType } from '@/components/design-system/content-modules/module-headline'
import { SustainabilityTabs } from '@/components/design-system/content-modules/sustainability-tabs'
import {
  EditorialValues,
  ImpactScale,
  VALUES,
  ValueIllustration,
} from '@/components/design-system/content-modules/values'
import { Ingredients } from '@/components/design-system/product/product-info'
import { BulletedList, DefaultParagraph } from '@/components/design-system/primitives/typography'
import { RecipeStep } from '@/components/design-system/recipe/recipe'
import { PRODUCT_DETAIL, RECIPE_STEPS } from '@/lib/fixtures'
import { Specimen } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const HEADLINE = 'Ein wichtiger Text - interessant für unsere Kundinnen und Kunden'
const LOREM =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
const COMPANY =
  'Dieses Unternehmen zeichnet sich durch besonderen Ehrgeiz aus, wenn es um faire Arbeitsbedingungen und nachhaltigen Anbau geht. Unternehmen, die sich sozial besonders engagieren möchten, wählen wir bevorzugt aus.'
const grid = 'grid w-full grid-cols-1 items-start gap-lg md:grid-cols-2 lg:grid-cols-3'

const TYPES: [ModuleHeadlineType, 'lg' | 'md', string][] = [
  ['h1', 'lg', 'H1 / Default · LG'],
  ['h1-subtle', 'lg', 'H1 / Subtle · LG'],
  ['h2', 'lg', 'H2 / Default · LG'],
  ['h2-alternative', 'md', 'H2 / Alternative · MD'],
  ['h2-subtle', 'md', 'H2 / Subtle · MD'],
  ['h3', 'md', 'H3 · MD'],
]

export const contentModuleEntries: LibraryEntry[] = [
  {
    id: 'content-basic',
    figma: 'ContentModules / Basic',
    nodeId: '7715:19490',
    code: '<ContentBasic headline="…" headlineType="h2" paragraphs={[…]} paragraphSize="lg" />',
    note: 'Höchstens eine Überschrift und drei Absätze. Zwischen mehreren Absätzen steht gap-md-sm (Figma-Slot ohne Abstand).',
    render: () => (
      <div className={grid}>
        {TYPES.map(([type, size, label]) => (
          <Specimen key={label} label={label}>
            <ContentBasic
              headline={HEADLINE}
              headlineType={type}
              headingLevel="h3"
              paragraphs={[size === 'lg' ? LOREM : COMPANY]}
              paragraphSize={size}
            />
          </Specimen>
        ))}
      </div>
    ),
  },
  {
    id: 'content-cta',
    figma: 'ContentModules / CTA',
    nodeId: '7598:20727',
    code: '<ContentCta title="…" text="…" actionLabel="Call To Action" href="/…" />',
    render: () => (
      <div className={grid}>
        <Specimen label="Product Benefits?=False">
          <ContentCta
            title="Wir haben noch mehr krasse Produkte"
            text={COMPANY}
            actionLabel="Call To Action"
            href="/de-de/store"
          />
        </Specimen>
        <Specimen label="Product Benefits?=True">
          <ContentCta
            title="We PROMISE - unsere PISTAZIENCRéME direkt aus der MANUFAKTUR"
            benefits={[
              'Benefit',
              'Keine künstlichen Zusatzstoffe oder Aromen',
              'Benefit',
              'Schokolade aus Kooperative Anamnese',
              'Vegan & Bio',
            ]}
            rating={{ value: 5, label: 'Gekauft von 30493 Menschen' }}
            actionLabel="Call To Action"
            href="/de-de/store"
          />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'content-contact-form',
    figma: 'ContentModules / ContactForm',
    nodeId: '7988:22598',
    code: '<ContactForm onSubmit={…} />',
    note: 'State=Default und State=Success (Zustand nach dem Absenden, keine Prop). Das Nachrichtenfeld ist Input / Field mit Type=Textarea.',
    render: () => (
      <div className="flex w-full flex-wrap gap-lg">
        <div className="w-full max-w-128">
          <ContactForm />
        </div>
        <div className="w-full max-w-128">
          <ContactForm defaultSent />
        </div>
      </div>
    ),
  },
  {
    id: 'content-cms-recipe-step',
    figma: 'ContentModules / CMS / RecipeStep',
    nodeId: '9325:70427',
    code: '<RecipeStep label="Schritt 1" meta="ca. 10 Min" image={image}>…</RecipeStep>',
    note: 'Has Img? (Bild rechts, unter 2 × 320 px darunter) und Open? (Buttons / DisclosureToggle klappt bis auf die Kopfzeile zu).',
    render: () => (
      <div className="flex w-full flex-col gap-lg">
        <Specimen label="Has Img?=True · Open?=True">
          <RecipeStep label={RECIPE_STEPS[0]!.label} meta={RECIPE_STEPS[0]!.meta} image={RECIPE_STEPS[0]!.image}>
            {RECIPE_STEPS[0]!.text}
          </RecipeStep>
        </Specimen>
        <Specimen label="Has Img?=False · Open?=True">
          <RecipeStep label={RECIPE_STEPS[1]!.label} meta={RECIPE_STEPS[1]!.meta}>
            {RECIPE_STEPS[1]!.text}
          </RecipeStep>
        </Specimen>
        <Specimen label="Open?=False">
          <RecipeStep
            label={RECIPE_STEPS[2]!.label}
            meta={RECIPE_STEPS[2]!.meta}
            image={RECIPE_STEPS[2]!.image}
            defaultOpen={false}
          >
            {RECIPE_STEPS[2]!.text}
          </RecipeStep>
        </Specimen>
      </div>
    ),
  },
  {
    id: 'content-basic-with-disclosure',
    figma: 'ContentModules / BasicWithDisclosure',
    nodeId: '8141:22208',
    code: '<BasicWithDisclosure title="…" text="…" signets={4} />',
    note: 'Zu: Absatz auf 3 Zeilen gekürzt. Offen: voller Absatz und Siegel als Platzhalter.',
    render: () => (
      <div className={grid}>
        <Specimen label="State=Default">
          <BasicWithDisclosure title={HEADLINE} text={COMPANY} signets={4} />
        </Specimen>
        <Specimen label="State=Open">
          <BasicWithDisclosure title={HEADLINE} text={COMPANY} signets={4} defaultOpen />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'content-media-text',
    figma: 'ContentModules / CMS / MediaText',
    nodeId: '7565:24424',
    code: '<MediaText title="…" text="…" image={image} />',
    render: () => <MediaText title="Unsere Partnerschaften - Wie wir Freundschaften schließen" text={LOREM} />,
  },
  {
    id: 'content-custom-with-img',
    figma: 'ContentModules / CMS / CustomContentWithImg',
    nodeId: '7660:20273',
    code: '<CustomContentWithImg image={image}><ContentBasic … /></CustomContentWithImg>',
    render: () => (
      <div className="flex w-full flex-col gap-xl">
        <Specimen label="LeftColumnSlotVariant=Basic · H1 / Default">
          <CustomContentWithImg>
            <ContentBasic headline={HEADLINE} headlineType="h1" headingLevel="h3" paragraphs={[LOREM]} />
          </CustomContentWithImg>
        </Specimen>
        <Specimen label="LeftColumnSlotVariant=CTA">
          <CustomContentWithImg>
            <ContentCta
              title="Wir haben noch mehr krasse Produkte"
              text={COMPANY}
              actionLabel="Call To Action"
              href="/de-de/store"
            />
          </CustomContentWithImg>
        </Specimen>
        <Specimen label="LeftColumnSlotVariant=ContactForm">
          <CustomContentWithImg>
            <ContactForm />
          </CustomContentWithImg>
        </Specimen>
      </div>
    ),
  },
  {
    id: 'content-custom-with-text',
    figma: 'ContentModules / CMS / CustomContentWithText',
    nodeId: '7988:22954',
    code: '<CustomContentWithText left={<ContentBasic … />} right={<Ingredients … />} />',
    render: () => (
      <div className="flex w-full flex-col gap-xl">
        <Specimen label="Basic · Ingredients">
          <CustomContentWithText
            left={<ContentBasic headline={HEADLINE} headingLevel="h3" paragraphs={[LOREM]} />}
            right={<Ingredients ingredients={PRODUCT_DETAIL.ingredients!} />}
          />
        </Specimen>
        <Specimen label="Basic · BulletList">
          <CustomContentWithText
            left={<ContentBasic headline={HEADLINE} headingLevel="h3" paragraphs={[LOREM]} />}
            right={
              <BulletedList
                items={[
                  'Dieses Unternehmen hat ... Mitarbeiter:innen',
                  'Keine künstlichen Zusatzstoffe oder Aromen',
                  'Publikumsliebling',
                  'Verpackung: vollständig recyclebar oder Pfand',
                  'Schokolade aus Kooperative Anamnese',
                  'Vegan & Bio',
                ]}
              />
            }
          />
        </Specimen>
        <Specimen label="ContactForm · DefaultParagraph">
          <CustomContentWithText
            left={<ContactForm />}
            right={
              <DefaultParagraph size="lg">
                Dieser Absatz charakterisiert den Snack, erzählt etwas über die Herkunft.
              </DefaultParagraph>
            }
          />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'content-editorial',
    figma: 'ContentModules / CMS / Editorial',
    nodeId: '3164:4506',
    code: '<Editorial headline="…" columns={[…, …]} footnote="…" />',
    render: () => (
      <div className="flex w-full flex-col gap-xl">
        <Specimen label="H1 · LG · zwei Spalten · Footnote">
          <Editorial
            headline="Unser Nachhaltigkeitsranking"
            columns={[LOREM, LOREM]}
            footnote="*Hier mehr über unsere Nachhaltigkeitsskala erfahren"
          />
        </Specimen>
        <Specimen label="H3 · MD">
          <Editorial
            headline="Unser Nachhaltigkeitsranking"
            headlineType="h3"
            paragraphSize="md"
            columns={[COMPANY, COMPANY]}
          />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'content-editorial-values',
    figma: 'ContentModules / CMS / Editorial (Werte) · Values · ImpactScale',
    nodeId: '3164:4640',
    code: '<EditorialValues /> · <ImpactScale level="tree" />',
    note: 'Illustrationen (Values, ImpactScale) als Platzhalterflächen.',
    render: () => (
      <div className="flex w-full flex-col gap-xl">
        <EditorialValues />
        <Specimen label="Values · ImpactScale">
          <div className="flex flex-wrap items-end gap-md">
            {VALUES.map((v) => (
              <ValueIllustration key={v.key} label={v.label} />
            ))}
            <ImpactScale level="tree" />
            <ImpactScale level="medium" />
            <ImpactScale level="seedling" />
            <ImpactScale level="world" />
          </div>
        </Specimen>
      </div>
    ),
  },
  {
    id: 'content-sustainability-tabs',
    figma: 'ContentModules / SustainabilityTabs',
    nodeId: '8144:22842',
    code: '<SustainabilityTabs content={{ "social-commitment": [...] }} />',
    note: 'Tab-Widget ohne <section>. In jeder Kategorie ist nur ein Modul offen.',
    render: () => (
      <SustainabilityTabs
        content={{
          'social-commitment': [
            { title: 'Zertifizierungen & Standards', text: COMPANY, signets: 4 },
            { title: 'Soziales Engagement', text: COMPANY },
            { title: 'Mitarbeitende', text: COMPANY },
          ],
          'cultivation-environment': [{ title: 'Anbau', text: COMPANY }],
          'supply-chain-fairness': [{ title: 'Faire Preise', text: COMPANY }],
          transportation: [{ title: 'Ohne Flugzeug', text: COMPANY }],
        }}
      />
    ),
  },
]
