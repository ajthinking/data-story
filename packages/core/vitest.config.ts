import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    // Dropped because of CJS is deprecated
    // coverage: {
    //   all: true,
    //   exclude: [
    //     './**/*.test.ts',
    //     './dist/**',
    //     './src/types/**',
    //     './src/support/computerTester/**'
    //   ]
    // },
  },
})