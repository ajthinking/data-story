import { defineConfig } from 'vite';
import { resolve } from 'path';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
  plugins: [
    externalizeDeps(),
  ],
  build: {
    outDir: 'dist/esm',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@data-story/core',
      formats: ['es'],
      fileName: 'index'
    },
    sourcemap: true
  },
});
