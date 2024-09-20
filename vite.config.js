// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react({ jsxRuntime: 'classic' })],
    define: { 'process.env.NODE_ENV': '"production"' },
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/app/index.tsx'),
            name: 'app',
            // the proper extensions will be added
            fileName: 'app'
        },
        outDir: 'dist/app'
    },
})