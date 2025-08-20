import { defineConfig } from 'cypress';
import bundlerConfig from './packages/ui/cypress-vite.config';

export default defineConfig({
  component: {
    specPattern: '**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: bundlerConfig,
    },
    viewportWidth: 384,
    viewportHeight: 216,
  },
});
