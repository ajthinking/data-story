import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@data-story/core", "@data-story/hubspot", "@data-story/nodejs", "@data-story/openai", "@data-story/ui"]
  },
})
