import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default (async () => {
  const { default: nextra } = await import('nextra');

  const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
  });

  const nextraConfig = withNextra({});

  return {
    ...nextraConfig,
    images: {
      unoptimized: true,
    },
    webpack: (config, context) => {
      const baseConfig = nextraConfig.webpack(config, context);

      if (context.dev) {
        baseConfig.devtool = 'source-map';

        baseConfig.module.rules.push({
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
        });
        baseConfig.ignoreWarnings = [/Failed to parse source map/];
        /**
         * https://webpack.js.org/configuration/module/#modulenoparse
         * https://github.com/microsoft/TypeScript/issues/39436
         */
        if (!baseConfig.module.noParse) {
          baseConfig.module.noParse = (content) => {
            return /[\/\\]node_modules[\/\\]typescript[\/\\]lib[\/\\]typescript\.js$|[\/\\]node_modules[\/\\]@typescript[\/\\]vfs[\/\\]dist[\/\\]vfs\.esm\.js$/.test(content);
          }
        }
      }

      if (!context.isServer && process.env.ANALYZE_ENV === 'true') {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            analyzerPort: context.isServer ? 8888 : 8889,
            reportFilename: './analyze/server.html',
            openAnalyzer: process.env.ANALYZE_ENV === 'true',
          }),
        );
      }

      baseConfig.devServer = {
        ...baseConfig.devServer,
        port: 'auto',
      };

      return baseConfig;
    },
  };
})();
