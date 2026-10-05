#!/usr/bin/env node
// Erzeugt docs/MAPPING.md: Figma-Komponente → Code-Komponente → Datei → Bibliothek.
// Quelle sind die Einträge in src/library/entries/*.tsx (figma, nodeId, code, id).
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const entriesDir = path.join(root, 'src/library/entries')
const componentsDirs = [path.join(root, 'src/components'), path.join(root, 'src/modules')]
const FILE_KEY = 'rLwATluwV4CSS5rXceLptH'
// Gegenstücke in apps/medusa-storefront je Datei (gleicher Pfad = gleiche Komponente)
const counterparts = JSON.parse(readFileSync(path.join(root, 'scripts/storefront-counterparts.json'), 'utf8'))

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) {
      if (name !== '__tests__') walk(full, out)
    } else if (/\.tsx?$/.test(name) && !/\.stories\./.test(name)) out.push(full)
  }
  return out
}

const exportsIndex = new Map()
for (const file of componentsDirs.flatMap((d) => walk(d))) {
  const text = readFileSync(file, 'utf8')
  const names = [...text.matchAll(/export (?:function|const) ([A-Z][A-Za-z0-9]*)/g)].map((m) => m[1])
  for (const m of text.matchAll(/export \{([^}]+)\}/g)) {
    names.push(
      ...m[1]
        .split(',')
        .map((x) => x.trim().replace(/^type /, ''))
        .filter((x) => /^[A-Z]/.test(x)),
    )
  }
  for (const n of names) if (!exportsIndex.has(n)) exportsIndex.set(n, path.relative(root, file))
}

const categoryOf = {
  'foundations.tsx': 'foundations',
  'pages.tsx': 'pages',
  'templates.tsx': 'templates',
  'sections.tsx': 'sections',
  'layout.tsx': 'layout',
  'navigation.tsx': 'navigation',
  'components.tsx': 'components',
  'product.tsx': 'components',
  'nutmixer.tsx': 'components',
  'cart.tsx': 'components',
  'checkout.tsx': 'components',
  'account.tsx': 'components',
  'content-modules.tsx': 'content-modules',
  'cards.tsx': 'cards',
  'buttons.tsx': 'buttons',
  'switches.tsx': 'switches',
  'inputs.tsx': 'inputs',
  'primitives.tsx': 'primitives',
}

const rows = []
for (const name of readdirSync(entriesDir).sort()) {
  const text = readFileSync(path.join(entriesDir, name), 'utf8')
  const re = /id: '([^']+)',\s*\n\s*figma: '([^']+)',(?:\s*\n\s*nodeId: '([^']+)',)?(?:\s*\n\s*code: '([^']*)',)?/g
  for (const m of text.matchAll(re)) {
    const [, id, figma, nodeId, code = ''] = m
    if (id === 'templates-page' && name === 'pages.tsx') categoryOf['pages.tsx#tpl'] = 'templates'
    const tags = [...code.matchAll(/<([A-Z][A-Za-z0-9]*)/g)].map((t) => t[1])
    const comp = tags.find((t) => t !== 'Tabs') ?? tags[0]
    const file = comp ? exportsIndex.get(comp) : undefined
    const cat = id === 'templates-page' ? 'templates' : categoryOf[name]
    rows.push({ cat, figma, nodeId, comp, file, id })
  }
}

const order = Object.values(categoryOf)
rows.sort((a, b) => order.indexOf(a.cat) - order.indexOf(b.cat))
const esc = (s) => s.replace(/\|/g, '\\|')
let md = `# Zuordnung Figma → Code

Diese Tabelle erzeugt \`pnpm gen:mapping\` aus den Einträgen der Bibliothek (\`src/library/entries\`).
Jede Zeile nennt die Figma-Komponente, ihren Knoten in „B2C und CI“, die React-Komponente, die Datei,
ihr Gegenstück in \`apps/medusa-storefront\` (aus \`scripts/storefront-counterparts.json\`; „gleich“ = derselbe Pfad)
und den Anker in der Bibliothek (\`/de-de/page/komponenten-<kategorie>#<anker>\`).

| Kategorie | Figma | Knoten | Komponente | Datei | Storefront | Bibliothek |
| --- | --- | --- | --- | --- | --- | --- |
`
for (const r of rows) {
  const node = r.nodeId
    ? `[${r.nodeId}](https://www.figma.com/design/${FILE_KEY}/B2C-und-CI?node-id=${r.nodeId.replace(':', '-')})`
    : '–'
  const twin = r.file ? counterparts[r.file] : undefined
  const sf = twin ? (twin === r.file ? 'gleich' : '`' + twin + '`') : '–'
  md += `| ${r.cat} | ${esc(r.figma)} | ${node} | ${r.comp ? '`' + r.comp + '`' : '–'} | ${r.file ? '`' + r.file + '`' : '–'} | ${sf} | \`${r.cat}#${r.id}\` |\n`
}
writeFileSync(path.join(root, 'docs/MAPPING.md'), md)
console.log(`docs/MAPPING.md — ${rows.length} Einträge`)
