import { defineConfig } from 'cypress';
import * as webpackConfig from './packages/ui/webpack.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: webpackConfig.default,
    },
  },
});
