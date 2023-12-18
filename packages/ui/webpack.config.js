const path = require('path');

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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
};
