import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, type ManifestOptions } from 'vite-plugin-pwa'
import manifest from './public/manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      injectRegister: 'auto',
      strategies: 'generateSW',
      includeAssets: ['./public/favicon.ico', './public/robots.txt'],
      manifest: manifest as ManifestOptions
    })
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime", "@data-story/core", "@data-story/hubspot", "@data-story/nodejs", "@data-story/openai", "@data-story/ui"]
  },
  resolve: {
    preserveSymlinks: true,
  },
})
