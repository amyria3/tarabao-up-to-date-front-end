import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { PageBreadcrumb } from '@/components/design-system/templates/page-breadcrumb'

const ITEMS = [{ label: 'Gefriergetrocknete Beeren', href: '#' }]
const CURRENT = 'Gefriergetrocknete Himbeeren in Zartbitterschokolade'

let frames: FrameRequestCallback[] = []

/** Scrollt und führt danach den nächsten Frame aus, wie der Browser. */
function scrollTo(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  fireEvent.scroll(window)
  const queued = frames
  frames = []
  queued.forEach((cb) => cb(0))
}

describe('PageBreadcrumb', () => {
  beforeEach(() => {
    frames = []
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb))
    vi.stubGlobal('cancelAnimationFrame', () => {})
    scrollTo(0)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('klebt als eigene Ebene unter dem Header', () => {
    render(<PageBreadcrumb items={ITEMS} current={CURRENT} />)
    const nav = screen.getByRole('navigation', { name: 'Brotkrumen' })
    const layer = nav.closest('[data-slot="page-breadcrumb"]')
    expect(layer?.className).toContain('sticky')
    expect(layer?.className).toContain('top-(--header-height)')
    expect(layer?.className).toContain('scroll-down:-translate-y-full')
  })

  it('setzt ohne CSS-Scroll-State die Scrollrichtung am <html>', () => {
    const { unmount } = render(<PageBreadcrumb items={ITEMS} current={CURRENT} />)
    const root = document.documentElement
    expect(root.dataset.scrollDirection).toBeUndefined()

    scrollTo(120)
    expect(root.dataset.scrollDirection).toBe('down')

    scrollTo(118)
    expect(root.dataset.scrollDirection).toBe('down')

    scrollTo(60)
    expect(root.dataset.scrollDirection).toBe('up')

    unmount()
    expect(root.dataset.scrollDirection).toBeUndefined()
  })
})
