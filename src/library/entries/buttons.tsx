import { CarouselNav } from '@/components/ui/carousel-nav'
import { DisclosureToggle } from '@/components/ui/disclosure-toggle'
import { Counter } from '@/components/ui/counter'
import { IconButton } from '@/components/ui/icon-button'
import { OptionSelectionButton } from '@/components/ui/option-selection-button'
import { PaymentButton } from '@modules/checkout/components/payment-button'
import { PlusMinus } from '@/components/ui/plus-minus'
import { ReactionCounter } from '@/components/ui/reaction-counter'
import { SegmentControlButton } from '@/components/ui/segment-control-button'
import { TabBar } from '@/components/ui/tab-bar'
import { IconCartEmpty, IconDelivery } from '@/components/icons'
import {
  BUTTON_FAMILIES,
  BUTTON_FIGMA_NAMES,
  Button,
  type ButtonFamily,
  type ButtonIntent,
  type ButtonSize,
} from '@/components/ui/button'
import { ButtonShape, type ButtonShapeKind } from '@/components/ui/button-shape'
import { Checkbox } from '@/components/ui/checkbox'
import { TabsContent } from '@/components/ui/tabs'
import { ThemeScope } from '@/components/ui/theme-scope'
import { PRODUCT_TABS } from '@/lib/design-system/tabs'
import { LIVELY_THEMES } from '@/lib/design-system/themes'
import { Specimen, ThemeMatrix } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const NODE_IDS: Record<ButtonFamily, string> = {
  'primary-lg': '509:1251',
  'inline-lg': '2342:2047',
  'primary-md': '2310:2156',
  'secondary-md': '2342:2052',
  'primary-sm': '2342:2053',
  'secondary-sm': '6799:19379',
  'inline-sm': '2359:3245',
  'card-sm': '7932:33160',
  'primary-xxs': '2328:2172',
  'secondary-xxs': '3911:18672',
  'inline-xxs': '3517:8568',
  'inline-xxxs': '6799:20185',
}

/** Familien mit Achse „Hug content?“ (SM) bzw. „Hug?“ (XXS Primary) in Figma, siehe 2.4. */
const WITH_HUG = new Set<ButtonFamily>(['primary-sm', 'secondary-sm'])

/** Familien mit Variante „Inactive?=True“ in Figma. */
const WITH_INACTIVE = new Set<ButtonFamily>(['primary-md', 'secondary-md', 'secondary-sm', 'primary-xxs'])

/** Familien mit „Show Icon?“ und Icon der Figma-Standardinstanz. */
const ICONS: Partial<Record<ButtonFamily, { Icon: typeof IconCartEmpty; className: string }>> = {
  'primary-md': { Icon: IconDelivery, className: 'size-6' },
  'secondary-md': { Icon: IconCartEmpty, className: 'size-[1.5625rem]' },
  'primary-sm': { Icon: IconCartEmpty, className: 'size-5' },
  'secondary-sm': { Icon: IconCartEmpty, className: 'size-[1.5625rem]' },
  'inline-sm': { Icon: IconCartEmpty, className: 'size-5' },
  'card-sm': { Icon: IconCartEmpty, className: 'size-5' },
}

const LABEL: Partial<Record<ButtonFamily, string>> = {
  'card-sm': 'Call to action',
}

function split(family: ButtonFamily) {
  const [intent, size] = family.split('-') as [ButtonIntent, ButtonSize]
  return { intent, size }
}

function FamilySpecimens({ family }: { family: ButtonFamily }) {
  const { intent, size } = split(family)
  const label = LABEL[family] ?? 'In den Warenkorb'
  const iconDef = ICONS[family]
  const icon = iconDef ? <iconDef.Icon aria-hidden className={iconDef.className} /> : undefined
  return (
    <>
      <Specimen label="Default">
        <Button intent={intent} size={size} icon={icon}>
          {label}
        </Button>
      </Specimen>
      <Specimen label="Hover">
        <Button intent={intent} size={size} icon={icon} forceHover>
          {label}
        </Button>
      </Specimen>
      {WITH_INACTIVE.has(family) ? (
        <Specimen label="Inaktiv">
          <Button intent={intent} size={size} icon={icon} disabled>
            {label}
          </Button>
        </Specimen>
      ) : null}
      {WITH_HUG.has(family) ? (
        <Specimen label="Hug content?=True">
          <Button intent={intent} size={size} width="hug">
            Kündigung zurücknehmen
          </Button>
        </Specimen>
      ) : null}
      {iconDef ? (
        <Specimen label="Ohne Icon">
          <Button intent={intent} size={size}>
            {label}
          </Button>
        </Specimen>
      ) : null}
    </>
  )
}

const familyEntries: LibraryEntry[] = BUTTON_FAMILIES.map((family) => {
  const { intent, size } = split(family)
  const isLg = size === 'lg'
  return {
    id: `buttons-${size}-${intent}`,
    figma: BUTTON_FIGMA_NAMES[family],
    nodeId: NODE_IDS[family],
    code: `<Button intent="${intent}" size="${size}" />`,
    note: isLg
      ? 'LG-Buttons nutzen die Tokens aus „Clrs / Mega Cards“ und folgen deshalb data-lively-theme (je Kampagne).'
      : undefined,
    render: () =>
      isLg ? (
        <div className="grid grid-cols-1 gap-sm md:grid-cols-2 lg:grid-cols-4">
          {LIVELY_THEMES.map((lively) => (
            <ThemeScope key={lively} livelyTheme={lively} className="flex flex-col gap-md rounded-sm p-md">
              <p className="type-navigation-endpoint text-content-weak">{lively}</p>
              <FamilySpecimens family={family} />
            </ThemeScope>
          ))}
        </div>
      ) : (
        <ThemeMatrix>{() => <FamilySpecimens family={family} />}</ThemeMatrix>
      ),
  }
})

const SHAPES: { shape: ButtonShapeKind; figma: string }[] = [
  { shape: 'oblong', figma: 'Shape=Oblong' },
  { shape: 'oval', figma: 'Shape=Oval' },
  { shape: 'very-oval', figma: 'Shape=Very oval' },
  { shape: 'very-oval-turned', figma: 'Shape=Very oval, Turned over?=True' },
]

export const buttonEntries: LibraryEntry[] = [
  {
    id: 'button-shape',
    figma: 'Button-Shape',
    nodeId: '7932:33229',
    code: '<ButtonShape shape="oblong" />',
    note: 'Absolut hinter dem Label (inset-0, preserveAspectRatio none), Farbe über currentColor. Das Label ist die einzige messende Ebene.',
    render: () => (
      <ThemeMatrix>
        {() =>
          SHAPES.map(({ shape, figma }) => (
            <Specimen key={shape} label={figma}>
              <span className="relative block h-btn-md w-full max-w-btn-max text-btn-primary-bg">
                <ButtonShape shape={shape} />
              </span>
            </Specimen>
          ))
        }
      </ThemeMatrix>
    ),
  },
  ...familyEntries,
  {
    id: 'buttons-disclosure-toggle',
    figma: 'Buttons / DisclosureToggle',
    nodeId: '9734:30031',
    code: '<DisclosureToggle open={open} onClick={…} />',
    note: 'Achsen Open? und State. Im Code trägt der Button aria-expanded; RecipeStep nutzt ihn zum Auf- und Zuklappen.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Open?=True · Default / Hover">
              <DisclosureToggle open />
              <DisclosureToggle open forceHover />
            </Specimen>
            <Specimen label="Open?=False · Default / Hover">
              <DisclosureToggle open={false} />
              <DisclosureToggle open={false} forceHover />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-xs-option-selection',
    figma: 'Buttons / XS / OptionSelectionButton',
    nodeId: '272:2159',
    code: '<OptionSelectionButton selected>130 g</OptionSelectionButton>',
    note: 'In Gruppen über Switches / OptionSelection (Radix ToggleGroup, role=radio).',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="130 g · Default / Selected">
              <OptionSelectionButton>130 g</OptionSelectionButton>
              <OptionSelectionButton selected>130 g</OptionSelectionButton>
            </Specimen>
            <Specimen label="1 kg · Default / Hover / Selected">
              <OptionSelectionButton>1 kg</OptionSelectionButton>
              <OptionSelectionButton forceHover>1 kg</OptionSelectionButton>
              <OptionSelectionButton selected>1 kg</OptionSelectionButton>
            </Specimen>
            <Specimen label="showIcon={false}">
              <OptionSelectionButton showIcon={false}>1 kg</OptionSelectionButton>
            </Specimen>
            <Specimen label="5,5 kg · Default / Selected">
              <OptionSelectionButton>5,5 kg</OptionSelectionButton>
              <OptionSelectionButton selected>5,5 kg</OptionSelectionButton>
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-xs-segment-control',
    figma: 'Buttons / XS / SegmentControlButton',
    nodeId: '3925:20314',
    code: '<SegmentControlButton selected>Über dieses Produkt</SegmentControlButton>',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Default">
              <SegmentControlButton>Über dieses Produkt</SegmentControlButton>
            </Specimen>
            <Specimen label="Hover">
              <SegmentControlButton forceHover>Über dieses Produkt</SegmentControlButton>
            </Specimen>
            <Specimen label="Selected">
              <SegmentControlButton selected>Über dieses Produkt</SegmentControlButton>
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-xs-tab-bar',
    figma: 'Buttons / XS / TabBar',
    nodeId: '3970:22955',
    code: '<TabBar items={PRODUCT_TABS} defaultValue="origin" />',
    note: 'role=tablist mit role=tab (Radix Tabs). Pfeiltasten wechseln den Tab.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <TabBar items={PRODUCT_TABS} defaultValue="origin" aria-label="Produktinformationen">
            {PRODUCT_TABS.map((t) => (
              <TabsContent key={t.value} value={t.value} className="type-default-text-s text-content-weak">
                Inhalt {t.label}
              </TabsContent>
            ))}
          </TabBar>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-checkbox',
    figma: 'Buttons / CheckBox',
    nodeId: '3517:8647',
    code: '<Checkbox defaultChecked />',
    note: 'shadcn/ui Checkbox (Radix). Figma pinnt cole-tint-surface-snow; prop theme={null} erbt den Modus.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="On?=False / On?=True">
              <Checkbox aria-label="Nicht gewählt" />
              <Checkbox aria-label="Gewählt" defaultChecked />
            </Specimen>
            <Specimen label="theme={null} (erbt den Modus)">
              <Checkbox aria-label="Nicht gewählt" theme={null} />
              <Checkbox aria-label="Gewählt" theme={null} defaultChecked />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-payment',
    figma: 'Buttons / Payment',
    nodeId: '3230:22134',
    code: '<PaymentButton />',
    note: 'Optional logo-Prop für ein Zahlungsart-Logo hinter dem Label (in Figma nicht belegt).',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Default">
              <PaymentButton />
            </Specimen>
            <Specimen label="Hover">
              <PaymentButton forceHover />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-carousel-nav',
    figma: 'Buttons / CarouselNav',
    nodeId: '2038:4884',
    code: '<CarouselNav size="huge" direction="left" />',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Huge · links / rechts">
              <CarouselNav size="huge" direction="left" />
              <CarouselNav size="huge" direction="right" />
            </Specimen>
            <Specimen label="Huge · Hover">
              <CarouselNav size="huge" direction="left" forceHover />
              <CarouselNav size="huge" direction="right" forceHover />
            </Specimen>
            <Specimen label="SM · links / rechts">
              <CarouselNav size="sm" direction="left" />
              <CarouselNav size="sm" direction="right" />
            </Specimen>
            <Specimen label="SM · Hover">
              <CarouselNav size="sm" direction="left" forceHover />
              <CarouselNav size="sm" direction="right" forceHover />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-icon-button',
    figma: 'Buttons / IconButton',
    nodeId: '2588:2421',
    code: '<IconButton label="Warenkorb schließen" />',
    render: () => (
      <ThemeMatrix>
        {() =>
          ['Warenkorb schließen', 'Suche schließen', 'Navigation schließen'].map((label) => (
            <Specimen key={label} label={label}>
              <IconButton label={label} />
              <IconButton label={label} forceHover />
            </Specimen>
          ))
        }
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-counter',
    figma: 'Buttons / Counter',
    nodeId: '2442:2491',
    code: '<Counter defaultValue={1} />',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Default (interaktiv)">
              <Counter defaultValue={1} />
            </Specimen>
            <Specimen label="Minus-Hover">
              <Counter defaultValue={2} forceHover="minus" />
            </Specimen>
            <Specimen label="Plus-Hover">
              <Counter defaultValue={2} forceHover="plus" />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-plus-minus',
    figma: 'Buttons / PlusMinus',
    nodeId: '2228:2503',
    code: '<PlusMinus variant="plus" state="default" />',
    render: () => (
      <ThemeMatrix>
        {() =>
          (['default', 'active', 'inactive'] as const).map((state) => (
            <Specimen key={state} label={`State=${state}`}>
              <PlusMinus variant="min" state={state} />
              <PlusMinus variant="plus" state={state} />
            </Specimen>
          ))
        }
      </ThemeMatrix>
    ),
  },
  {
    id: 'buttons-reaction-counter',
    figma: 'Buttons / ReactionCounter',
    nodeId: '2070:1506',
    code: '<ReactionCounter likes={2} />',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Variant=1 · 0 Likes">
              <ReactionCounter likes={0} showReport={false} />
            </Specimen>
            <Specimen label="Variant=2 · 2 Likes + Melden">
              <ReactionCounter likes={2} />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
]
