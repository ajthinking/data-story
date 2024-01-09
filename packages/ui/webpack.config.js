const path = require('path');
const deps = require('./package.json').dependencies;

const baseConfig = {
  devtool: 'source-map',
  mode: 'development',
  entry: './src/index.ts',
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

// CommonJS Config
const commonJsConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.cjs.js',
    libraryTarget: 'commonjs2'
  },
};

// ESM Config
const esmConfig = {
  ...baseConfig,
  target: 'es2020',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.esm.js',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  }
};

// 导出两个配置
module.exports = [commonJsConfig ];
