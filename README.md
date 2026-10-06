# Tarabao Front-End Complete

Dieses Projekt setzt die Figma-Datei „B2C und CI“ (Seite COMPONENTS & SCREENS) vollständig als
React-Komponenten um. Es nutzt Next.js 16, Tailwind CSS v4 mit dem Tarabao-Designsystem (`app.tcss`)
und shadcn/ui als Basis. Die Komponenten passen zu `apps/medusa-storefront`: Sie bekommen View-Modelle,
und ein Mapper übersetzt die Daten aus Medusa.

Unter `/de-de` läuft der Shop mit denselben Routen und Ordnern wie `apps/medusa-storefront`:
Startseite → Shop (`/categories`) → Kategorie → Produktseite, dazu Warenkorb, Kasse, Account,
Widerruf und die statischen Seiten unter `/page/…`. Alle Seiten sind über Nav, Karten, Breadcrumb und
Footer verbunden. Die Daten kommen als Beispieldaten aus `src/lib/shop` (Katalog, Inhalte, Routen).

Die Komponenten-Bibliothek unter `/de-de/page/komponenten` (Footer → „Komponenten-Bibliothek“) zeigt
jede Figma-Komponente mit allen Varianten und Farbmodi, geordnet nach Kategorien. Sie liegt wie
„Über uns“ unter `/page/…`, jede Kategorie unter `/de-de/page/komponenten-<kategorie>`. Jeder Eintrag
verlinkt den Figma-Knoten und nennt den Code-Namen. Die Kategorie „Pages“ verlinkt die Routen des Shops.

## So startest Du das Projekt

Das Projekt liegt in `Dokumente/TARABAO Code/Front-End-Complete`, direkt neben dem Monorepo `tarabao`.
Node 22 und pnpm 10 reichen. Es braucht weder ein Medusa-Backend noch env-Variablen, da es mit
Beispieldaten (`src/lib/fixtures`) läuft.

Hast Du den Ordner verschoben, führst Du einmal `pnpm install --force` aus. So schreibt pnpm die
Pfade in `node_modules/.bin` neu.

Beim ersten Mal installierst Du die Pakete:

```bash
pnpm install
```

Danach startest Du das Projekt:

```bash
pnpm dev
```

So läuft der Shop unter `http://localhost:8000/de-de` und die Bibliothek unter
`http://localhost:8000/de-de/page/komponenten`. Storybook zeigt jede Komponente einzeln wie in der
Storefront unter `http://localhost:6006`, die Grundlagen (Farben, Textstile, Abstände) unter
„Design System/Foundations“:

```bash
pnpm storybook
```

### So läuft das Projekt neben der Storefront

Die Storefront nutzt ebenfalls Port 8000. Starte dieses Projekt deshalb in einem zweiten Terminal-Tab
auf Port 8001:

```bash
cd "$HOME/Documents/TARABAO Code/Front-End-Complete"
pnpm exec next dev --turbopack -p 8001
```

So erreichst Du die Storefront unter `http://localhost:8000/de-de` und dieses Projekt unter
`http://localhost:8001/de-de`. Ctrl + C beendet das Projekt im jeweiligen Tab.

## Diese Befehle prüfen das Projekt

| Befehl                 | Was er tut                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `pnpm check`           | TypeScript, ESLint, Stilregeln, Tests und Build nacheinander                        |
| `pnpm check:styles`    | Prüft Klassen: keine px-Werte, keine Hex-Farben, nur die Breakpoints md und lg      |
| `pnpm test`            | Vitest mit Testing Library (Interaktionen, Mapper, Themes)                          |
| `pnpm gen:mapping`     | Erzeugt `docs/MAPPING.md` (Figma → Komponente → Datei) aus den Bibliothekseinträgen |
| `pnpm build-storybook` | Baut Storybook statisch nach `storybook-static`                                     |

## So ist das Projekt aufgebaut

Das Projekt spiegelt die Ordner und Routen von `apps/medusa-storefront`. So liegt jede Komponente schon
an dem Pfad, an dem sie in der Storefront liegt oder liegen würde, und ein PR übernimmt sie ohne Umbau.

```
src/
├─ app/[countryCode]/
│  ├─ (main)/                    Shop-Seiten, Header und Footer kommen aus layout.tsx
│  │  ├─ page.tsx                Startseite
│  │  ├─ categories/             Shop (Übersicht) und categories/[category] mit flachen Handles
│  │  ├─ products/[handle]/      Produktseite
│  │  ├─ cart/ account/ withdrawal/ order/confirmed/[id]/
│  │  ├─ page/[slug]/            statische Seiten und Komponenten-Bibliothek
│  │  └─ store/ nussmixer/ blog/ Seiten aus Figma ohne Gegenstück in der Storefront
│  └─ (checkout)/checkout/       Kasse, Schritt über ?step=email|delivery|payment|review
├─ components/
│  ├─ ui/                        gemeinsame Bausteine, flach (Button, MegaSwitch, InputField, Karten …)
│  ├─ LexicalRenderers/          CMS-Inhaltsmodule (CardRow, MegaCards, ContactForm, Editorial …)
│  └─ icons/                     Figma-Icons (nur in diesem Projekt)
├─ modules/<ablauf>/
│  ├─ components/<name>/         Bausteine eines Ablaufs (cart, checkout, products, account …)
│  └─ templates/                 Seitenvorlagen ohne Header und Footer
├─ lib/
│  ├─ view-models/               Typen, die die Komponenten kennen
│  ├─ medusa/mapper.ts           Medusa (@medusajs/types) → View-Modelle
│  ├─ fixtures/                  Beispieldaten mit den Texten aus Figma
│  ├─ shop/                      Routen, Katalog, statische Inhalte, Header und Footer der Layouts
│  └─ design-system/             Themes, Nachhaltigkeitskategorien, Tabs, Nussmixer-Kategorien
├─ library/                      Komponenten-Bibliothek: Einträge, Seiten, Stories (nur in diesem Projekt)
└─ styles/design-system/app.css  app.tcss unverändert
docs/
├─ ABWEICHUNGEN.md               bewusste Abweichungen, offene Punkte, Barrierefreiheit
├─ MAPPING.md                    Figma → Code → Gegenstück in der Storefront (erzeugt)
└─ adr/0002-view-models.md       Warum Komponenten nur View-Modelle kennen
```

### So entscheidest Du, wo eine Komponente liegt

1. Hat die Storefront dieselbe Komponente, liegt sie am selben Pfad. Beispiele sind
   `components/ui/mega-switch.tsx` und `modules/products/components/choice/index.tsx`.
2. Nutzen mehrere Abläufe einen Baustein (Buttons, Switches, Inputs, Karten, Typografie), liegt er flach
   in `components/ui`.
3. Gehört ein Baustein zu einem Ablauf, liegt er in `modules/<ablauf>/components/<name>/index.tsx`.
4. Ist ein Baustein ein CMS-Inhaltsmodul, liegt er in `components/LexicalRenderers`.
5. Ist es eine ganze Seite, liegt die Vorlage in `modules/<ablauf>/templates`. Die Route in `app/` lädt
   nur die Daten und ruft die Vorlage auf. So kommen Header und Footer aus dem Layout der Routengruppe.

Die Dateinamen folgen den Figma-Namen. Heißt das Gegenstück in der Storefront anders, nennt
`docs/MAPPING.md` es in der Spalte „Storefront“. Die Zuordnung steht in
`scripts/storefront-counterparts.json`.

### So bekommt jede Komponente ihre Story

Jede Komponenten-Datei hat genau eine Story-Datei direkt daneben, aufgebaut wie in der Storefront:

| Komponente                                       | Story-Datei                                                    | Titel in Storybook                    |
| ------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------- |
| `components/ui/mega-switch.tsx`                  | `components/ui/mega-switch.stories.tsx`                        | `Components/UI/MegaSwitch`            |
| `components/LexicalRenderers/CardRow.tsx`        | `components/LexicalRenderers/CardRow.stories.tsx`              | `Components/LexicalRenderers/CardRow` |
| `modules/cart/components/cart-summary/index.tsx` | `modules/cart/components/cart-summary/CartSummary.stories.tsx` | `Components/CartSummary`              |

Die Story nennt in der Beschreibung zuerst den Figma-Namen und den Knoten. Jede Figma-Variante, die die
Komponente über eine Prop abbildet, bekommt eine eigene Story (`Default`, `Hover`, `Selected` …). Weitere
Komponenten derselben Datei erscheinen als eigene Stories. Story-Namen und Beschreibungen sind englisch wie
in der Storefront, die Texte in der Oberfläche bleiben deutsch. Die Daten kommen aus `src/lib/fixtures`.
Den Farbmodus wählst Du in der Werkzeugleiste von Storybook.

### So zeigt die Breadcrumb den Pfad

Die Breadcrumb folgt der Storefront: Startseite → Shop → Oberkategorie → Kategorie, auf der Produktseite
zusätzlich → Produkt. Die Dots aus Figma stehen für die Startseite und verlinken sie. Statische Seiten,
Warenkorb, Kasse, Konto und Widerruf zeigen wie in der Storefront keine Breadcrumb.

## So arbeitet die Designerin mit dem Projekt

Die Designerin öffnet die Bibliothek im Browser. Jeder Eintrag verlinkt den Figma-Knoten im Dev Mode.
So vergleicht sie Code und Figma Seite an Seite.

- `docs/ABWEICHUNGEN.md` sammelt alles, was bewusst von Figma abweicht, und jede Stelle, an der Figma
  uneindeutig ist. Jede Zeile nennt den Figma-Knoten.
- Der Abschnitt „Offene Punkte zur Barrierefreiheit“ listet Kontraste, die aus den Figma-Tokens kommen.
  Das Projekt übernimmt die Tokens unverändert. Die Designerin entscheidet über neue Werte.
- Bilder und Illustrationen erscheinen als Platzhalterflächen in `surface-placeholder`. So bleiben Maße
  und Seitenverhältnisse wie in Figma.

## So arbeitet der Entwickler mit dem Projekt

Der Entwickler baut Seiten aus Sections und Sections aus Komponenten, wie in 2.7 Layout beschrieben.

1. **Daten kommen über View-Modelle.** Eine Komponente bekommt z. B. `ProductCardModel` oder `CartModel`,
   nie ein Medusa-Objekt. `src/lib/medusa/mapper.ts` übersetzt `HttpTypes.StoreProduct`,
   `StoreCart`, `StoreCartLineItem` und Adressen. So laufen alle Komponenten ohne Backend.
2. **Aktionen kommen als Callbacks.** `onAddToCart`, `onSubmit`, `onQuantityChange` usw. rufen die
   Server Actions der Storefront auf. Die Komponenten halten nur ihren sichtbaren Zustand.
3. **Slots bekommen kein Element.** Inhalte eines Figma-Slots folgen direkt im Wrapper der Section oder
   des Moduls.
4. **Farben kommen nur aus semantischen Tokens.** Den Farbmodus setzt `data-theme` am Container, z. B.
   `<Section theme="purple-tint-surface-snow">`.
5. **Die Bibliothek ist die Referenz.** Ein neuer Zustand bekommt einen Eintrag in
   `src/library/entries/<kategorie>.tsx`. Danach erzeugt `pnpm gen:mapping` die Zuordnung neu.

Ein Bibliothekseintrag rendert als Server-Komponente. Übergib ihm deshalb keine Funktionen als Props,
und rufe keine Funktionen aus `'use client'`-Dateien auf. Gemeinsame Konstanten liegen in `src/lib`.

## So arbeitet ein KI-Agent mit dem Projekt

Ein KI-Agent liest vor jeder Änderung die Figma-Komponente (Varianten, Tokens, Textstile) und nutzt
vorhandene Komponenten, Stile und Variablen, statt neue zu bauen.

- Er schreibt Klassen in twuc bzw. rem und prüft mit `pnpm check:styles`.
- Er ersetzt Bilder und Illustrationen durch `ProductImage` (Platzhalter).
- Er übernimmt die Höhe einer Seite nicht aus Figma. Sie ergibt sich aus `min-h-dvh`.
- Er trägt jede Abweichung in `docs/ABWEICHUNGEN.md` ein und nennt dort den Figma-Knoten.
- Er misst Interaktionen im Browser nach (Playwright), z. B. das Ausweichen in der Discovery-Reihe:
  Ist die Karte ganz rechts, rückt der Inhalt nach links. Ist sie ganz links, rückt der Nachbar nach
  rechts. Sonst rücken die Nachbarn zu beiden Seiten.
- Er schreibt zu jeder neuen Komponente eine Story nach „So bekommt jede Komponente ihre Story“.
- Er legt jede neue Komponente nach den Regeln in „So entscheidest Du, wo eine Komponente liegt“ ab
  und trägt ein Gegenstück in der Storefront in `scripts/storefront-counterparts.json` ein.
- Er beendet eine Aufgabe erst, wenn `pnpm check` ohne Fehler durchläuft.

## So startest Du die Storefront

Die Storefront liegt im Monorepo unter `Dokumente/TARABAO Code/tarabao/apps/medusa-storefront`. Sie
zeigt echte Daten aus Medusa (Staging), Payload und ERPNext.

Beim ersten Mal richtest Du sie so ein:

1. Installiere im Hauptordner `tarabao` alle Pakete mit `pnpm install`. Ein Install nur für die
   Storefront (`--filter`) reicht nicht, da die Storefront `@lingui/loader` nutzt, ihn aber nicht als
   eigene Abhängigkeit führt.
2. Baue das interne Paket `@tarabao/erpnext` einmal mit `pnpm --filter @tarabao/erpnext build`. Sein
   Ordner `dist` liegt nicht in Git.
3. Lege die env-Variablen in `apps/medusa-storefront/.env.local` ab. Die Werte bekommst Du von Lukas.
   Git ignoriert die Datei.
4. Setze in `.env.local` ein `#` vor `POSTHOG_API_KEY`, die `GRAFANA_…`-Zeilen und
   `NEXT_PUBLIC_FARO_URL`. So landen lokale Besuche nicht in der echten Auswertung.
5. Hast Du den Ordner `tarabao` verschoben, führst Du im Hauptordner `pnpm install --force` aus. pnpm
   schreibt beim Installieren feste Pfade in `node_modules/.bin`. Nach dem Verschieben zeigen diese ins
   Leere, und Next.js findet z. B. `@lingui/loader` nicht mehr.

Danach öffnest Du ein Terminal im Hauptordner `tarabao` und startest die Storefront:

```bash
cd apps/medusa-storefront
pnpm dev
```

Starte `pnpm dev` nicht im Hauptordner selbst. Dort startet der Befehl alle 16 Apps des Monorepos, und
eine abstürzende App bricht alle anderen mit ab.

Bestellungen landen im Staging-System von Medusa. Payload und ERPNext sind dagegen die Live-Systeme.

## So kommen Komponenten in die Storefront

Das Team pflegt die Storefront und übernimmt dieses Projekt nicht als Ganzes. Jede Komponente kommt
einzeln per Pull Request in `tarabao/tarabao`, und das Team reviewt jeden PR. Dieses Projekt dient dabei
als Vorlage und Codequelle.

Für jeden PR gelten die Regeln aus `apps/medusa-storefront/DESIGN-SYSTEM.md`:

- Eine Komponente kommt nur hinein, wenn sie UI in einem bestehenden Ablauf ersetzt. Den ganzen
  Figma-Katalog nachzubauen, schließt die Datei aus.
- Die Storefront ordnet nach Funktion (`src/modules/cart`, `src/modules/products` …). Dieses Projekt
  ordnet genauso. So übernimmt ein PR den Pfad unverändert, und `docs/MAPPING.md` nennt das Gegenstück.
- Die Komponente bekommt ihre Daten über die Mapper der Storefront (`src/lib/data/…/mapper.ts`).
  Medusa-Typen (`@medusajs/*`) stehen nur in `mapper.ts`- und `medusa*.ts`-Dateien.
- Neue Tokens trägt der PR bewusst in `src/styles/design-system/app.css` und `DESIGN-SYSTEM.md` ein.
  Die Storefront übernimmt Änderungen aus Figma nicht automatisch.

Zwischen beiden Projekten bestehen diese Unterschiede (Stand 06.10.2026):

| Thema                               | Storefront                                                    | Dieses Projekt                                        |
| ----------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| Breakpoints                         | `lg` 964 px, Tailwind-Standards `sm`, `md`, `xl`, `2xl` aktiv | `md` 768 px, `lg` 1024 px, `sm`, `xl`, `2xl` entfernt |
| `--vivid-red-100`                   | `#e00000` (Kontrast nach WCAG AA)                             | `#e00000` wie die Storefront (Figma `#ff0000`)        |
| Grundschrift (`html`)               | Browser-Standard (16 px)                                      | 90 %, alle rem-Werte skalieren mit                    |
| Abstände mit Zahlen (`h-5`, `w-20`) | erzeugen keine Klasse (`--spacing-*: initial`)                | erzeugen Klassen                                      |
| Tokens                              | Schnappschuss von app.tcss (10.08.); Branch `design-system/figma-tokens` Stand 06.10. | app.tcss vom 06.10.                   |
| `Button`                            | `intent` × `size` (`lg`, `md`, `sm`)                          | zusätzlich `card`, `md-oval`, `xxs`, `xxxs`, `width` und `megaCard` |
| Links                               | `LocalizedClientLink` setzt das Länderkürzel                  | `routes(countryCode)` mit `next/link`                 |

Die Breakpoints betreffen jede Seite. Darüber entscheidet das Team, bevor ein PR sie ändert.

Vor jedem PR laufen in `apps/medusa-storefront` diese Prüfungen ohne Fehler durch:

```bash
pnpm tsc
pnpm lint
pnpm exec vitest run src
pnpm check:legacy-styles
```

## So kommt das Projekt ins Git

Dieses Projekt liegt im eigenen Repository `amyria3/tarabao-up-to-date-front-end`. Pull Requests für
die Storefront entstehen im Monorepo `tarabao`.

Änderungen an diesem Projekt sicherst Du so:

```bash
git add .
git commit -m "Kurze Beschreibung der Änderung"
git push
```

`node_modules`, `.next` und `storybook-static` gehören nicht ins Repository (`.gitignore`).
