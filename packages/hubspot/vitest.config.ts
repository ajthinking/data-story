import { defineConfig } from 'vitest/config'

export default defineConfig({ 
  test: {
    globals: true,
    coverage: {
      all: true,
      exclude: [
        './**/*.test.ts',
        './dist/**',
      ]
    },
  },
})