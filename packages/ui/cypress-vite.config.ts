import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  // Development mode configuration
  mode: 'development',

  // Entry point (Vite uses index.html as entry by default, but we can specify)
  root: path.resolve(__dirname),

  // Resolve configuration
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
  },
});
