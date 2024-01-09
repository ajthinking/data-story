import type { PluginOption } from 'vite';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { type ManifestOptions, VitePWA } from 'vite-plugin-pwa'
import manifest from './public/manifest.json';

export function watchNodeModules(modules: string[]): PluginOption {
  return {
    name: 'watch-node-modules',
    config() {
      return {
        server: {
          watch: {
            ignored: modules.map((m) => `!**/node_modules/${m}/**`),
          },
        },
        optimizeDeps: {
          exclude: modules,
        },
      };
    },
  };
}

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
    }),
    watchNodeModules([
      '@data-story/core',
      '@data-story/ui',
      '@data-story/hubspot',
      '@data-story/nodejs',
      '@data-story/openai',
    ]),
  ],
  server: {},
  optimizeDeps: {
    include: [
      "react/jsx-runtime",
      "@data-story/core",
      "@data-story/hubspot",
      "@data-story/nodejs",
      "@data-story/openai",
      "@data-story/ui"
    ]
  },
  resolve: {
    preserveSymlinks: true,
  },
})
