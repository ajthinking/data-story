const path = require('path');

module.exports = {
  devtool: "source-map",
  mode: 'development',
  entry: './dist/index.js',
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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};