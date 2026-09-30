import storybook from 'eslint-plugin-storybook'
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'

// Wie apps/medusa-storefront (ADR 0002): @medusajs/* nur in **/medusa*.ts
// und **/mapper.ts. Komponenten bekommen eigene View-Model-Typen.
const medusaImportRestriction = {
  patterns: [
    {
      group: ['@medusajs/*'],
      message: 'Import @medusajs/* only from **/medusa*.ts or **/mapper.ts (see ADR 0002).',
    },
  ],
}

export default [
  {
    ignores: [
      '.next/**',
      'storybook-static/**',
      'playwright-report/**',
      'test-results/**',
      'coverage/**',
      'src/locales/**/messages.{js,ts}',
      'next-env.d.ts',
    ],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['**/medusa*.ts', '**/mapper.ts', '**/*medusa*.test.ts', '**/*mapper*.test.ts'],
    rules: { 'no-restricted-imports': ['error', medusaImportRestriction] },
  },
  ...storybook.configs['flat/recommended'],
]
