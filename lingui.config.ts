import { formatter } from '@lingui/format-po'

/** @type {import('@lingui/conf').LinguiConfig} */
export default {
  locales: ['en', 'de'],
  sourceLocale: 'de',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
  format: formatter(),
} as const
