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
    ...Object.keys(deps)
  ],
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ]
  }
};
