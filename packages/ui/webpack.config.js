const path = require('path');
const dependencies = require('./package.json').dependencies;

const externalsDeps = Object.keys(dependencies);

const commonJSConfig = (env, options) => ({
  devtool: 'source-map',
  mode: 'development',
  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.cjs',
    libraryTarget: 'commonjs2',
    clean: {
      keep: /(data-story.css)|(bundle.mjs(\.map|\.LICENSE.txt)?)/,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  externals: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    ...externalsDeps,
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});

const esmConfig = (env, options) => ({
  devtool: 'source-map',
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.mjs',
    libraryTarget: 'module',
    clean: {
      keep: /(data-story.css)|(bundle.cjs(\.map|\.LICENSE.txt)?)/,
    },
    library: {
      type: 'module',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  externals: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    ...externalsDeps,
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  externalsType: 'module',
  experiments: {
    outputModule: true,
  },
});

module.exports = function (...args) {
  return [commonJSConfig(...args), esmConfig(...args)];
};
