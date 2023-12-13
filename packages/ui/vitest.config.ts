import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // setupFiles: ['./test/setup.ts'],
    include: ['test/**/*.test.ts', 'src/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    watch: false,
    globals: true,
  },
})
