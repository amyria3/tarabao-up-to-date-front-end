# Tarabao Front-End Complete

Dieses Projekt setzt die Figma-Datei „B2C und CI“ (Seite COMPONENTS & SCREENS) vollständig als
React-Komponenten um. Es nutzt Next.js 16, Tailwind CSS v4 mit dem Tarabao-Designsystem (`app.tcss`)
und shadcn/ui als Basis. Die Komponenten passen zu `apps/medusa-storefront`: Sie bekommen View-Modelle,
und ein Mapper übersetzt die Daten aus Medusa.

Die Bibliothek unter `/de-de/library` zeigt jede Figma-Komponente mit allen Varianten und Farbmodi.
Jeder Eintrag verlinkt den Figma-Knoten und nennt den Code-Namen.

## So startest Du das Projekt

```bash
pnpm install
pnpm dev          # http://localhost:8000/de-de → Übersicht, /de-de/library/<kategorie>
pnpm storybook    # http://localhost:6006, dieselben Einträge je Kategorie
```

Node 22 und pnpm 10 reichen. Das Projekt braucht kein Medusa-Backend, da die Bibliothek mit
Beispieldaten (`src/lib/fixtures`) läuft.

## Diese Befehle prüfen das Projekt

| Befehl                 | Was er tut                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `pnpm check`           | TypeScript, ESLint, Stilregeln, Tests und Build nacheinander                        |
| `pnpm check:styles`    | Prüft Klassen: keine px-Werte, keine Hex-Farben, nur die Breakpoints md und lg      |
| `pnpm test`            | Vitest mit Testing Library (Interaktionen, Mapper, Themes)                          |
| `pnpm gen:mapping`     | Erzeugt `docs/MAPPING.md` (Figma → Komponente → Datei) aus den Bibliothekseinträgen |
| `pnpm build-storybook` | Baut Storybook statisch nach `storybook-static`                                     |

## So ist das Projekt aufgebaut

```
src/
├─ app/[countryCode]/            Übersicht und Bibliothek (/de-de/library/<kategorie>)
├─ components/
│  ├─ ui/                        shadcn/ui-Basis im Tarabao-Vokabular (Button, Checkbox, Tabs …)
│  └─ design-system/             Figma-Komponenten nach Kategorie
│     ├─ primitives/ buttons/ inputs/ switches/ cards/ icons/ visuals/
│     ├─ navigation/ (Header, NavBar, Footer) · search/ filter/
│     ├─ product/ nutmixer/ cart/ checkout/ cancellation/ account/ recipe/
│     ├─ content-modules/        ContentModules und CMS-Module
│     ├─ sections/ templates/    Sections, Templates / Section, Page, Cards Order
│     └─ pages/                  Seiten als Kompositionen (Produkt, Nussmixer, Konto, Blog, Rezept, Kategorie, Rechtstexte, Kasse)
├─ lib/
│  ├─ view-models/               Typen, die die Komponenten kennen
│  ├─ medusa/mapper.ts           Medusa (@medusajs/types) → View-Modelle
│  ├─ fixtures/                  Beispieldaten mit den Texten aus Figma
│  └─ design-system/             Themes, Nachhaltigkeitskategorien, Tabs, Nussmixer-Kategorien
├─ library/                      Einträge der Bibliothek je Kategorie, Stories
└─ styles/design-system/app.css  app.tcss unverändert
docs/
├─ ABWEICHUNGEN.md               bewusste Abweichungen, offene Punkte, Barrierefreiheit
├─ MAPPING.md                    Figma → Code (erzeugt)
└─ adr/0002-view-models.md       Warum Komponenten nur View-Modelle kennen
```

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
- Er beendet eine Aufgabe erst, wenn `pnpm check` ohne Fehler durchläuft.

## So kommt das Projekt ins Git

```bash
git checkout -b feature/front-end-complete
git add .
git commit -m "Front-End Complete: Figma B2C und CI als Komponenten-Bibliothek"
git push -u origin feature/front-end-complete
# danach auf GitHub einen Pull Request gegen main öffnen
```

`node_modules`, `.next` und `storybook-static` gehören nicht ins Repository (`.gitignore`).
