import { defineConfig } from 'cypress';
import webpackConfig from './packages/ui/cypress-webpack.config';

export default defineConfig({
  component: {
    specPattern: '**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: webpackConfig
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
});
