import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { type ManifestOptions, VitePWA } from 'vite-plugin-pwa'
import manifest from './public/manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    workbox: {
      clientsClaim: true,
      skipWaiting: true
    },
    includeAssets: ['./public/favicon.ico', './public/robots.txt', './public/manifest.json'],
    manifest: manifest as ManifestOptions
  })],
  optimizeDeps: {
    include: ["@data-story/core", "@data-story/hubspot", "@data-story/nodejs", "@data-story/openai", "@data-story/ui"]
  },
})
