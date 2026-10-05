import { AddressSearch } from '@modules/checkout/components/address-search'
import { FormField } from '@/components/ui/form-field'
import { InputField } from '@/components/ui/input-field'
import { Button } from '@/components/ui/button'
import { Specimen, ThemeMatrix } from '@/library/showcase'
import type { LibraryEntry } from '@/library/types'

const COUNTRIES = [
  { value: 'DE', label: 'Deutschland' },
  { value: 'AT', label: 'Österreich' },
  { value: 'CH', label: 'Schweiz' },
]

const LABEL = 'E-Mail'
const VALUE = 'medina.wagenrode@example.org'

export const inputEntries: LibraryEntry[] = [
  {
    id: 'inputs-field',
    figma: 'Input / Field',
    nodeId: '9563:39197',
    code: '<InputField type="email" label="E-Mail" required error="Ungültige E-Mail: muss @ enthalten" />',
    note: 'Achsen Type (Text, Password, Select, Textarea) und State (Default, Focus, Filled, Valid, Missing, Invalid, Disabled). Der Zustand entsteht aus Fokus, Eingabe und error; forceActive zeigt Focus nur in der Bibliothek. Aufbau: 2-tarabao/2.10-eingabefelder-aufbau.md.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <div className="grid grid-cols-1 gap-md md:grid-cols-2">
            <Specimen label="Text · Default">
              <InputField label={LABEL} required type="email" />
            </Specimen>
            <Specimen label="Text · Focus">
              <InputField label={LABEL} required type="email" defaultValue="med" forceActive />
            </Specimen>
            <Specimen label="Text · Filled">
              <InputField label={LABEL} required type="email" defaultValue={VALUE} />
            </Specimen>
            <Specimen label="Text · Valid">
              <InputField label={LABEL} required type="email" defaultValue={VALUE} valid />
            </Specimen>
            <Specimen label="Text · Missing">
              <InputField label={LABEL} required type="email" error="Wir brauchen Deine E-Mail-Adresse" />
            </Specimen>
            <Specimen label="Text · Invalid">
              <InputField
                label={LABEL}
                required
                type="email"
                defaultValue="medina.wagenrode.example.org"
                error="Ungültige E-Mail: muss @ enthalten"
              />
            </Specimen>
            <Specimen label="Text · Disabled">
              <InputField label={LABEL} required type="email" defaultValue={VALUE} disabled />
            </Specimen>
            <Specimen label="Text · Präfix (Bestellnummer)">
              <InputField
                label="Bestellnummer (nach #)"
                required
                prefix="#"
                inputMode="numeric"
                defaultValue="489443"
              />
            </Specimen>
            <Specimen label="Password · Filled">
              <InputField label="Passwort" required type="password" defaultValue="geheim1234" />
            </Specimen>
            <Specimen label="Password · Invalid">
              <InputField
                label="Passwort"
                required
                type="password"
                defaultValue="geheim"
                error="Das Passwort braucht mindestens 8 Zeichen"
              />
            </Specimen>
            <Specimen label="Select · Filled">
              <InputField label="Land" required type="select" options={COUNTRIES} defaultValue="DE" />
            </Specimen>
            <Specimen label="Select · Missing">
              <InputField label="Land" required type="select" options={COUNTRIES} error="Bitte wähle ein Land" />
            </Specimen>
            <Specimen label="Textarea · Default">
              <InputField label="Deine Nachricht oder Frage hier" required type="textarea" />
            </Specimen>
            <Specimen label="Textarea · Filled">
              <InputField
                label="Deine Nachricht oder Frage hier"
                required
                type="textarea"
                defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
              />
            </Specimen>
            <Specimen label="Textarea · Invalid">
              <InputField
                label="Deine Nachricht oder Frage hier"
                required
                type="textarea"
                defaultValue="Hi"
                error="Bitte schreib uns ein paar Worte mehr"
              />
            </Specimen>
            <Specimen label="Show message=False">
              <InputField label={LABEL} required type="email" error="Ungültige E-Mail" showMessage={false} />
            </Specimen>
          </div>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'inputs-field-with-button',
    figma: 'Felder mit Button · Components / Cart / VoucherInput · voucher-row',
    nodeId: '3325:5910',
    code: '<FormField label="Gutschein" action={<Button intent="primary" size="xxs">Einlösen</Button>} />',
    note: '2.10 „So baust Du Felder mit Button“: Input / Field und Button in einer Zeile (flex-row, unten bündig) bzw. Spalte. remoteError zeigt eine Meldung des Servers über dem Feld, warning einen schließbaren Hinweis darunter.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <div className="flex flex-col gap-lg">
            <Specimen label="Gutschein · leer">
              <FormField
                label="Gutschein"
                action={
                  <Button intent="primary" size="xxs" disabled>
                    Einlösen
                  </Button>
                }
              />
            </Specimen>
            <Specimen label="Gutschein · Invalid">
              <FormField
                label="Gutschein"
                defaultValue="PA23"
                error="Mindestens 5 Zeichen"
                action={
                  <Button intent="primary" size="xxs" disabled>
                    Einlösen
                  </Button>
                }
              />
            </Specimen>
            <Specimen label="Gutschein · Meldung des Servers">
              <FormField
                label="Gutschein"
                defaultValue="PALEO23"
                remoteError="Dieser Gutschein Code existiert nicht (mehr)"
                action={
                  <Button intent="primary" size="xxs">
                    Einlösen
                  </Button>
                }
              />
            </Specimen>
            <Specimen label="Nachname · Hinweis unter dem Feld">
              <FormField
                label="Nachname"
                required
                defaultValue="Me"
                valid
                warning="Hast Du Dich vertippt oder ist Dein Name besonders kurz?"
              />
            </Specimen>
          </div>
        )}
      </ThemeMatrix>
    ),
  },
  {
    id: 'inputs-address-search',
    figma: 'Components / Checkout / AddressSearch',
    nodeId: '9779:30099',
    code: '<AddressSearch value="Ber" suggestions={[…]} onSelect={…} onManualEntry={…} />',
    note: 'State Default, Focus, Missing (error) und Selected (selected). Klick ins Feld: Default/Missing → Focus → Selected. „Manuell eingeben“ öffnet die manuelle Eingabe des AddressFieldsets.',
    render: () => (
      <ThemeMatrix columns={2}>
        {() => (
          <div className="grid grid-cols-1 gap-md md:grid-cols-2">
            <Specimen label="Default">
              <AddressSearch />
            </Specimen>
            <Specimen label="Focus (Eingabe läuft)">
              <AddressSearch value="Ber" />
            </Specimen>
            <Specimen label="Missing">
              <AddressSearch error="" />
            </Specimen>
            <Specimen label="Selected">
              <AddressSearch selected={{ id: '1', address1: 'Berliner Str. 01' }} />
            </Specimen>
          </div>
        )}
      </ThemeMatrix>
    ),
  },
]
