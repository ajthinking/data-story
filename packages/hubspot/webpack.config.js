const path = require('path');
const ShebangPlugin = require('webpack-shebang-plugin');

module.exports = {
  devtool: "source-map",
  entry: './dist/server/socket.js', // Path to your main js file, check this is right
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js' // Where the bundle will be output
  },
  target: 'node', // IMPORTANT: This is required for webpack-node-externals to work
  // externals: [nodeExternals()], // IMPORTANT: This is required for webpack-node-externals to work
  mode: 'development', // Use 'production' or 'development' mode
  plugins: [
    new ShebangPlugin()
  ]
};