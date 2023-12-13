import path from 'path';

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'hjson.bundle.js',
    globalObject: 'this',
    module: true,    
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
