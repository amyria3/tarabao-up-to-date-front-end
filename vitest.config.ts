import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(new URL(import.meta.url).pathname)

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/*.stories.tsx'],
  },
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      '@modules': path.resolve(dirname, './src/modules'),
      '@lib': path.resolve(dirname, './src/lib'),
    },
  },
})
