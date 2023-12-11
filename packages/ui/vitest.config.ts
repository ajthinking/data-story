import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    // setupFiles: ['./test/setup.ts'],
    // coverage: {
    //   reporter: ['text', 'json', 'html'],
    // },
    include: ['test/**/*.test.ts', 'src/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
    watch: false,
    globals: true,
  },
})
