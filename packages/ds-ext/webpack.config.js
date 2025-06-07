'use strict';

const path = require('path');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node', // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // use production mode for tree shaking when building for production

  entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    clean:{
      keep: /app\//
    }

  },
  externals: [
    {
      vscode: 'commonjs vscode', // the vscode-module is created on-the-fly and must be excluded.
      '@duckdb/node-api': 'commonjs @duckdb/node-api',
    },
  ],
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [
          /src\/app\/.*/,
          /node_modules/,
        ],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: 'log', // enables logging required for problem matchers
  },
  optimization: {
    // Enable tree shaking
    usedExports: true,
    minimize: process.env.NODE_ENV === 'production',
    concatenateModules: process.env.NODE_ENV === 'production', // Scope hoisting
    providedExports: true,
    mangleExports: process.env.NODE_ENV === 'production',
  },
};

module.exports = [extensionConfig];
