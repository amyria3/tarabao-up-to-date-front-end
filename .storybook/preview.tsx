import type { Preview } from '@storybook/nextjs-vite'

import { ThemeScope } from '@/components/ui/theme-scope'
import {
  DEFAULT_GLOBAL_THEME,
  GLOBAL_THEMES,
  LIVELY_THEMES,
  type GlobalTheme,
  type LivelyTheme,
} from '@/lib/design-system/themes'

import '@/styles/globals.css'
import './fonts.css'

/**
 * Farbmodus in der Toolbar wie ein Modus-Pin in Figma (Clrs / Color Modes).
 * Die Bibliotheks-Stories zeigen ohnehin alle vier Modi nebeneinander.
 */
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Clrs / Color Modes (data-theme)',
      toolbar: { title: 'Modus', icon: 'paintbrush', items: [...GLOBAL_THEMES], dynamicTitle: true },
    },
    lively: {
      description: 'Clrs / Mega Cards (data-lively-theme)',
      toolbar: { title: 'Kampagne', icon: 'star', items: ['—', ...LIVELY_THEMES], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: DEFAULT_GLOBAL_THEME, lively: '—' },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as GlobalTheme
      const lively = context.globals.lively as LivelyTheme | '—'
      return (
        <ThemeScope
          theme={theme}
          livelyTheme={lively === '—' ? undefined : lively}
          className="min-h-dvh p-md font-body antialiased"
        >
          <Story />
        </ThemeScope>
      )
    },
  ],
  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i } },
    a11y: { test: 'todo' },
  },
}

export default preview
