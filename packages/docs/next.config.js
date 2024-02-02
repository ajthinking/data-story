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
        use: [ 'source-map-loader' ],
      });

      baseConfig.ignoreWarnings = [ /Failed to parse source map/ ];
    }
    baseConfig.resolve.alias = {
      ...baseConfig.resolve.alias,
      'react/jsx-runtime.js': 'react/jsx-runtime',
      'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
    };

    baseConfig.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            ['@babel/plugin-transform-react-jsx', { jsxRuntime: 'classic', }]
          ]
        }
      }
    });
    baseConfig.resolve.fallback = { fs: false };

    return baseConfig;
  },
};
