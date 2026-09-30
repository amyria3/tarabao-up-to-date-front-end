#!/usr/bin/env node
// Prüft Klassen in src/**/*.tsx gegen die Regeln aus 2-tarabao (2.3, 2.4, 2.7):
// 1. keine px-Werte in Layout-Klassen (Maßeinheit twuc bzw. rem) — Konturen (stroke-[…px]) ausgenommen
// 2. keine Hex-Farben in Klassen (Farben nur über Tokens)
// 3. keine Breakpoints außer md und lg (app.css kennt nur diese beiden)
// 4. @medusajs/* nur in medusa*.ts, mapper.ts, proxy.ts (ADR 0002; ESLint prüft zusätzlich)
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const src = path.join(root, 'src')
const SKIP_DIRS = new Set(['icons'])
const problems = []

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(full)
    } else if (/\.(tsx?|mdx)$/.test(name)) check(full)
  }
}

function check(file) {
  const rel = path.relative(root, file)
  const text = readFileSync(file, 'utf8')
  const lines = text.split('\n')
  lines.forEach((line, i) => {
    const where = `${rel}:${i + 1}`
    for (const m of line.matchAll(/\b[\w:-]*-\[(-?[\d.]+)px\]/g)) {
      if (!/stroke-\[/.test(m[0])) problems.push(`${where}  px-Wert in Klasse: ${m[0]}`)
    }
    for (const m of line.matchAll(/\b(?:bg|text|border|fill|stroke|outline)-\[#[0-9a-fA-F]{3,8}\]/g)) {
      problems.push(`${where}  Hex-Farbe in Klasse: ${m[0]}`)
    }
    for (const m of line.matchAll(/(?<![\w-])(sm|xl|2xl):[a-z]/g)) {
      if (/className|cn\(|'/.test(line)) problems.push(`${where}  Breakpoint ${m[1]}: gibt es in app.css nicht`)
    }
    if (/from ['"]@medusajs\//.test(line) && !/(medusa[^/]*\.ts|mapper\.ts|proxy\.ts)$/.test(file)) {
      problems.push(`${where}  @medusajs-Import außerhalb der Adapter (ADR 0002)`)
    }
  })
}

walk(src)
if (problems.length) {
  console.error(`check:styles — ${problems.length} Befund(e):\n` + problems.map((p) => '  ' + p).join('\n'))
  process.exit(1)
}
console.log('check:styles — keine Befunde')
