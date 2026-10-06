#!/usr/bin/env node
// Liest src/styles/design-system/app.css und schreibt src/library/generated/foundations.ts.
// Die Bibliothek (Next und Storybook) zeigt daraus Farben, Textstile, Abstände,
// Breiten, Höhen und Breakpoints. app.css bleibt die einzige Quelle.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const css = readFileSync(path.join(root, 'src/styles/design-system/app.css'), 'utf8')

/** Inhalt des ersten Blocks, der mit `selector` beginnt (ab Position `from`). */
function blockAfter(selector, from = 0) {
  const start = css.indexOf(selector, from)
  if (start === -1) return null
  const open = css.indexOf('{', start)
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}') {
      depth--
      if (depth === 0) return { body: css.slice(open + 1, i), end: i }
    }
  }
  return null
}

/** Deklarationen mit Gruppen aus Kommentaren „---- Name ----“ bzw. „/* Name *\/“. */
function declarations(body) {
  const out = []
  let group = ''
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    const g = line.match(/^\/\*\s*-{2,}\s*(.+?)\s*-{2,}/) || line.match(/^\/\*\s*([^*]+?)\s*\*\/$/)
    if (g) {
      group = g[1].replace(/\s*[—-]\s*".*$/, '').trim()
      continue
    }
    const d = line.match(/^--([\w-]+)\s*:\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?/)
    if (d) out.push({ name: d[1], value: d[2].trim(), comment: d[3] ?? '', group })
  }
  return out
}

const section = (marker) => css.indexOf(marker)

// 1. Primitives
const primitives = declarations(blockAfter(':root', section('1. PRIMITIVES')).body)

// 2a. globale Modi
const THEMES = [
  'cole-tint-surface-warm',
  'cole-tint-surface-snow',
  'purple-tint-surface-warm',
  'purple-tint-surface-snow',
]
const globalThemes = Object.fromEntries(THEMES.map((t) => [t, declarations(blockAfter(`[data-theme="${t}"]`).body)]))

// 2b. Einzelmodus
const singleMode = declarations(blockAfter(':root', section('2b. SINGLE-MODE')).body)

// 2c. Kampagnen
const LIVELY = ['blue-pistacio-green', 'orange-black', 'happy-christmas', 'purple-black']
const lively = Object.fromEntries(LIVELY.map((t) => [t, declarations(blockAfter(`[data-lively-theme="${t}"]`).body)]))

// 2e. Special
const SPECIAL = ['forest', 'lilac']
const special = Object.fromEntries(
  SPECIAL.map((t) => [t, declarations(blockAfter(`[data-special-theme="${t}"]`).body)]),
)

// 3. Farb-Utilities
const colorUtilities = declarations(blockAfter('\n@theme inline {').body)
  .filter((d) => d.name.startsWith('color-'))
  .map((d) => ({
    utility: d.name.replace(/^color-/, ''),
    source: d.value.replace(/^var\(--(.+)\)$/, '$1'),
    group: d.group,
  }))

// 4. statische Skalen
const statics = declarations(blockAfter('\n@theme static {').body).filter((d) => !d.name.endsWith('*'))
const pick = (prefix) =>
  statics
    .filter((d) => d.name.startsWith(prefix))
    .map((d) => ({ name: d.name.slice(prefix.length), value: d.value, comment: d.comment }))

// 2d. Höhen
const heights = declarations(blockAfter(':root', section('2d. COMPONENT HEIGHTS')).body).map((d) => ({
  name: d.name.replace(/^height-/, ''),
  value: d.value,
  comment: d.comment,
}))

// 4. Effektstile (Schatten), auch mehrzeilige Werte
const shadows = [
  ...blockAfter('\n@theme static {').body.matchAll(
    /--((?:inset-)?shadow-[\w-]+)\s*:\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?/g,
  ),
].map((m) => ({ name: m[1], value: m[2].replace(/\s+/g, ' ').trim(), comment: m[3] ?? '' }))

// 6. Textstile
const textStyles = []
for (const m of css.matchAll(/@utility (type-[\w-]+)\s*\{\s*\/\*\s*(.+?)\s*\*\/([^}]*)\}/g)) {
  const props = Object.fromEntries([...m[3].matchAll(/([\w-]+)\s*:\s*([^;]+);/g)].map((p) => [p[1], p[2].trim()]))
  textStyles.push({ utility: m[1], figma: m[2], props })
}

const data = {
  primitives: primitives.map(({ name, value, group }) => ({ name, value, group })),
  globalThemes: Object.fromEntries(
    Object.entries(globalThemes).map(([k, v]) => [k, v.map(({ name, value }) => ({ name, value }))]),
  ),
  singleMode: singleMode.map(({ name, value, group }) => ({ name, value, group })),
  lively: Object.fromEntries(
    Object.entries(lively).map(([k, v]) => [k, v.map(({ name, value }) => ({ name, value }))]),
  ),
  special: Object.fromEntries(
    Object.entries(special).map(([k, v]) => [k, v.map(({ name, value }) => ({ name, value }))]),
  ),
  colorUtilities,
  breakpoints: pick('breakpoint-'),
  fonts: pick('font-'),
  textSizes: pick('text-'),
  leading: pick('leading-'),
  tracking: pick('tracking-'),
  spacing: pick('spacing-'),
  containers: pick('container-'),
  heights,
  shadows,
  textStyles,
}

const out = path.join(root, 'src/library/generated/foundations.ts')
mkdirSync(path.dirname(out), { recursive: true })
writeFileSync(
  out,
  `// Generiert von scripts/gen-foundations.mjs aus src/styles/design-system/app.css. Nicht von Hand bearbeiten.\n` +
    `export const FOUNDATIONS = ${JSON.stringify(data, null, 2)} as const\n`,
)
console.log(
  `foundations: ${data.primitives.length} Primitives, ${data.colorUtilities.length} Farb-Utilities, ` +
    `${data.textStyles.length} Textstile, ${data.spacing.length} Abstände, ${data.containers.length} Breiten, ${data.heights.length} Höhen, ${data.shadows.length} Schatten`,
)
