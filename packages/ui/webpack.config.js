const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
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
      }
    ]
  },
  externals: [
    'react',
    'react-dom',
    ...Object.keys(deps)
  ],
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
  }
};
