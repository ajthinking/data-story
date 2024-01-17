import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist/vite',
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/testTools.ts'),
      name: 'testToolsName',
      // the proper extensions will be added
      fileName: 'test-tools',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vitest'],
      // output: {
      //   // Provide global variables to use in the UMD build
      //   // for externalized deps
      //   globals: {
      //     vitest: 'vitest',
      //   },
      // },
    },
  },
})