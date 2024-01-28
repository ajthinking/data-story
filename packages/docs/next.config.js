const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const nextraConfig = withNextra({});

module.exports = {
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
    }

    return baseConfig;
  },
};
