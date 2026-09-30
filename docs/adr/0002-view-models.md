# ADR 0002: Komponenten kennen nur View-Modelle

Stand: 29.09.2026 · übernommen aus `apps/medusa-storefront`

## Die Entscheidung

Die Komponenten unter `src/components` importieren nie `@medusajs/*`. Sie bekommen eigene Typen aus
`src/lib/view-models`. Nur `src/lib/medusa/mapper.ts` und Dateien `**/medusa*.ts` übersetzen
Medusa-Daten in diese Typen.

## Darum gilt die Entscheidung

- Die Bibliothek und Storybook laufen ohne Backend, da Beispieldaten dieselben Typen füllen.
- Ein Update von Medusa ändert nur den Mapper, nicht die Komponenten.
- Die View-Modelle enthalten fertig formatierte Texte (Preise, Grundpreise, Daten). So bleibt die
  Formatierung an einer Stelle.

## So wird die Regel geprüft

ESLint (`no-restricted-imports` in `eslint.config.js`) und `pnpm check:styles` melden jeden Import von
`@medusajs/*` außerhalb der erlaubten Dateien.
