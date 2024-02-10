import { defineConfig } from 'vitest/config'

/**
 * This file is needed to make vscode vitetest extension work
 */
export default defineConfig({
  test: {
    globals: true,
  },
})