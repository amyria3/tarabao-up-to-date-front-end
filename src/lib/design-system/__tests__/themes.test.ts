import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import { GLOBAL_THEMES, LIVELY_THEMES, REQUIRED_GLOBAL_THEME_TOKENS, SPECIAL_THEMES } from '@/lib/design-system/themes'

const css = readFileSync(path.resolve(__dirname, '../../../styles/design-system/app.css'), 'utf8')

function block(selector: string) {
  const start = css.indexOf(selector)
  if (start === -1) return null
  const open = css.indexOf('{', start)
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    if (css[i] === '}') depth--
    if (depth === 0) return css.slice(open + 1, i)
  }
  return null
}

describe('app.css Theme-Achsen', () => {
  it.each(GLOBAL_THEMES)('data-theme="%s" setzt alle 63 Pflicht-Tokens', (theme) => {
    const body = block(`[data-theme="${theme}"]`)
    expect(body, `Block für ${theme} fehlt`).not.toBeNull()
    const missing = REQUIRED_GLOBAL_THEME_TOKENS.filter((token) => !body!.includes(`${token}:`))
    expect(missing).toEqual([])
  })

  it('führt genau 63 Pflicht-Tokens', () => {
    expect(REQUIRED_GLOBAL_THEME_TOKENS).toHaveLength(63)
  })

  it.each(LIVELY_THEMES)('data-lively-theme="%s" existiert', (theme) => {
    expect(block(`[data-lively-theme="${theme}"]`)).not.toBeNull()
  })

  it.each(SPECIAL_THEMES)('data-special-theme="%s" existiert', (theme) => {
    expect(block(`[data-special-theme="${theme}"]`)).not.toBeNull()
  })
})
