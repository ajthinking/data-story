import path from 'path';

// CommonJS
const commonJsConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'hjson.bundle.cjs',
    library: {
      type: 'commonjs2',
    },
  },
  resolve: {
    extensions: ['.js']
  },
  mode: 'production',
};

// ESM
const esmConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'hjson.bundle.mjs',
    library: {
      type: 'module',
    },
  },
  resolve: {
    extensions: ['.js']
  },
  mode: 'production',
  experiments: {
    outputModule: true,
  },
};

export default [commonJsConfig, esmConfig];
