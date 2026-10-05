import {
  NutmixerCategoryNavigation,
  NutmixerTab,
  SustainabilityCategoryButton,
  SustainabilityCategoryNavigation,
} from '@/components/ui/category-navigation'
import { Choice } from '@modules/products/components/choice'
import { InformationBubble } from '@/components/ui/information-bubble'
import { MegaSwitch } from '@/components/ui/mega-switch'
import { OptionSelection, PACKAGING_OPTIONS } from '@/components/ui/option-selection'
import { RadioField, RadioOption } from '@/components/ui/radio-field'
import { SwitchToggleGroup } from '@/components/ui/switch-toggle-group'
import { RadioGroup } from '@/components/ui/radio-group'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { SUSTAINABILITY_CATEGORIES } from '@/lib/design-system/sustainability'
import { NUTMIXER_CATEGORIES } from '@/lib/design-system/nutmixer'
import { Specimen, ThemeMatrix } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const ADDRESS = (
  <address className="flex flex-col not-italic font-body text-14 font-medium text-content-text">
    <span>Vorname* Nachname*</span>
    <span>Straße* Hausnummer</span>
    <span>02853 Paddelberg</span>
  </address>
)

export const switchEntries: LibraryEntry[] = [
  {
    id: 'switches-toggle-group',
    figma: 'Switches / ToggleGroup',
    nodeId: '3690:15429',
    code: '<SwitchToggleGroup options={…} defaultValue="1" />',
    note: 'Figma pinnt purple-tint-surface-warm; prop theme={null} erbt den Modus des Containers.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Selected Option?=1">
              <SwitchToggleGroup
                aria-label="Beispiel"
                options={[
                  { value: '1', label: 'Über dieses Produkt' },
                  { value: '2', label: 'Herkunft & Impact' },
                ]}
                defaultValue="1"
              />
            </Specimen>
            <Specimen label="theme={null} · Selected Option?=2">
              <SwitchToggleGroup
                aria-label="Beispiel"
                theme={null}
                options={[
                  { value: '1', label: 'Über dieses Produkt' },
                  { value: '2', label: 'Herkunft & Impact' },
                ]}
                defaultValue="2"
              />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'switches-option-selection',
    figma: 'Switches / OptionSelection',
    nodeId: '8087:20747',
    code: '<OptionSelection options={PACKAGING_OPTIONS} />',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Selected=05kg">
              <OptionSelection options={PACKAGING_OPTIONS} defaultValue="0.5kg" />
            </Specimen>
            <Specimen label="Selected=Selected2">
              <OptionSelection options={PACKAGING_OPTIONS} defaultValue="1kg" />
            </Specimen>
            <Specimen label="Selected=Selected3">
              <OptionSelection options={PACKAGING_OPTIONS} defaultValue="5.5kg" />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'switches-mega-switch',
    figma: 'Switches / MegaSwitch',
    nodeId: '8847:23405',
    code: '<MegaSwitch defaultChecked={false} />',
    note: 'role=switch (Radix Switch). Leertaste oder Klick schaltet zwischen Einmalkauf und Abo.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Switched?=False">
              <MegaSwitch aria-label="Bestellart" />
            </Specimen>
            <Specimen label="Switched?=True">
              <MegaSwitch aria-label="Bestellart" defaultChecked />
            </Specimen>
            <Specimen label="State=Hover">
              <MegaSwitch aria-label="Bestellart" forceHover />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'switches-radio',
    figma: 'Switches / Radio · Components / RadioButtonGroup',
    nodeId: '3795:12348',
    code: '<RadioField options={[{ value, label, description }]} />',
    note: 'RadioButtonGroup (3793:15664) ist eine Option der Gruppe: Content=Plain Text | Component | Address, State=Default | Selected | Inactive | Error.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Option 1?=True">
              <RadioField
                aria-label="Versandmethode"
                options={[
                  { value: 'a', label: 'Label', description: 'Content' },
                  { value: 'b', label: 'Label', description: 'Content' },
                ]}
              />
            </Specimen>
            <Specimen label="State=Inactive">
              <RadioGroup aria-label="Beispiel">
                <RadioOption value="x" label="Label" description="Content" state="inactive" />
              </RadioGroup>
            </Specimen>
            <Specimen label="State=Error">
              <RadioGroup aria-label="Beispiel">
                <RadioOption
                  value="x"
                  label="Label"
                  description="Content"
                  state="error"
                  feedback={
                    <p
                      role="alert"
                      className="w-full rounded-[0.125rem] bg-error-bg px-sm py-xs type-input-warning-default-text text-content-text"
                    >
                      Diese Bestellung kann nicht ausgewählt werden.
                    </p>
                  }
                />
              </RadioGroup>
            </Specimen>
            <Specimen label="Content=Address · Selected">
              <RadioField
                aria-label="Adresse"
                options={[{ value: 'home', label: 'Lieferadresse', children: ADDRESS }]}
              />
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'switches-information-bubble',
    figma: 'Information Bubble',
    nodeId: '8817:23243',
    code: '<InformationBubble fill={false}>…</InformationBubble> · <InformationBubble variant="badge">Schritt 1</InformationBubble>',
    note: 'Property 1=Badge (Hug, ohne Icon) zeigt Rezeptangaben und Schrittnummern.',
    render: () => (
      <ThemeMatrix>
        {() => (
          <>
            <Specimen label="Fill?=True">
              <InformationBubble>Vorteil bei Versandkosten Erklärung</InformationBubble>
            </Specimen>
            <Specimen label="Fill?=False">
              <InformationBubble fill={false}>Vorteil bei Versandkosten Erklärung</InformationBubble>
            </Specimen>
            <Specimen label="Show Icon=false">
              <InformationBubble fill={false} showIcon={false}>
                Erklärung Kündigung
              </InformationBubble>
            </Specimen>
            <Specimen label="Property 1=Badge">
              <div className="flex flex-wrap gap-sm">
                <InformationBubble variant="badge">Arbeitszeit 15 Min.</InformationBubble>
                <InformationBubble variant="badge">Schritt 1</InformationBubble>
              </div>
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'switches-choice',
    figma: 'Choice',
    nodeId: '8819:23124',
    code: '<Choice defaultSubscription={false} />',
    note: 'Figma pinnt cole-tint-surface-warm. Texte der Information Bubbles sind in Figma Platzhalter.',
    render: () => (
      <div className="grid grid-cols-1 gap-md lg:grid-cols-2">
        <Specimen label="Default Variant choosen?=True (Einmalkauf)">
          <Choice />
        </Specimen>
        <Specimen label="Default Variant choosen?=False (Abo)">
          <Choice defaultSubscription />
        </Specimen>
      </div>
    ),
  },
  {
    id: 'switches-nutmixer-category-navigation',
    figma: 'Switches / NutmixerCategoryNavigation · NutmixerTabs',
    nodeId: '8555:24862',
    code: '<Tabs defaultValue="nuesse"><NutmixerCategoryNavigation /></Tabs>',
    note: 'NutmixerTabs (8557:28249) sind die Tabs der Navigation; role=tablist/tab.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Selected=Nüsse">
              <Tabs defaultValue="nuesse" className="w-full">
                <NutmixerCategoryNavigation />
                {NUTMIXER_CATEGORIES.map((c) => (
                  <TabsContent key={c.value} value={c.value} className="type-default-text-s text-content-weak">
                    Inhalt {c.label}
                  </TabsContent>
                ))}
              </Tabs>
            </Specimen>
            <Specimen label="NutmixerTabs · Default / Selected / Show Icon">
              <NutmixerTab>Nüsse</NutmixerTab>
              <NutmixerTab selected>Nüsse</NutmixerTab>
              <NutmixerTab selected showIcon>
                Nüsse
              </NutmixerTab>
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'switches-sustainability-category-navigation',
    figma: 'Switches / SustainabilitCategoryNavigation · SustainabilitCategoryNavigationButton',
    nodeId: '8126:25292',
    code: '<Tabs defaultValue="transportation"><SustainabilityCategoryNavigation /></Tabs>',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <>
            <Specimen label="Selected=No Plane">
              <Tabs defaultValue="transportation" className="w-full">
                <SustainabilityCategoryNavigation />
                {SUSTAINABILITY_CATEGORIES.map((c) => (
                  <TabsContent key={c.key} value={c.key} className="pt-md type-default-text-s text-content-weak">
                    Inhalt {c.label}
                  </TabsContent>
                ))}
              </Tabs>
            </Specimen>
            <Specimen label="Button · SelectedTab?=False / True">
              {SUSTAINABILITY_CATEGORIES.map((c) => (
                <SustainabilityCategoryButton key={c.key} category={c.key}>
                  {c.label}
                </SustainabilityCategoryButton>
              ))}
              {SUSTAINABILITY_CATEGORIES.map((c) => (
                <SustainabilityCategoryButton key={`${c.key}-on`} category={c.key} selected>
                  {c.label}
                </SustainabilityCategoryButton>
              ))}
            </Specimen>
          </>
        )}
      </ThemeMatrix>
    ),
  },
]
