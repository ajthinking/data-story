const path = require('path');
const deps = require('./package.json').dependencies;

const commonJSConfig = {
  devtool: 'source-map',
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  externals: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    ...Object.keys(deps)
  ],
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
  }
};

const esmConfig = {
  devtool: 'source-map',
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.mjs',
    libraryTarget: 'module',
    clean: true,
    library: {
      type: 'module',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  externals: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    ...Object.keys(deps)
  ],
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
  },
  externalsType: 'module',
  experiments: {
    outputModule: true,
  },
};

module.exports = [commonJSConfig, esmConfig];
