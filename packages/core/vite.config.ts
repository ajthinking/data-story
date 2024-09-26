import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist/esm',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.ts'),
      },
      output: {
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]-[hash].mjs',
        assetFileNames: '[name]-[hash][extname]',
        dir: resolve(__dirname, 'dist/esm'),
        format: 'es',
        sourcemap: true,
      },
    },
  },
});
