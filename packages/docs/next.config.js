const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
});

const pwaConfig = withPWA();
const nextraConfig = withNextra(pwaConfig);

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
