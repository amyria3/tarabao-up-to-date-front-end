import type { StorybookConfig } from '@storybook/nextjs-vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [getAbsolutePath('@storybook/addon-docs'), getAbsolutePath('@storybook/addon-a11y')],
  framework: {
    name: getAbsolutePath('@storybook/nextjs-vite'),
    options: {},
  },
  staticDirs: ['../public'],
  async viteFinal(config) {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': resolve(__dirname, '../src'),
          '@modules': resolve(__dirname, '../src/modules'),
          '@lib': resolve(__dirname, '../src/lib'),
        },
      },
    }
  },
}
export default config
