[docs](https://data-story-docs.vercel.app)

### TODO
In general, how to have many outputs from my library @data-story/core ?

1. A server executable: After transpiling with tsc, webpack bundles a file server.js (all code in one file as a distribution). This is already complete
2. Usage as a dependency. I have many exported modules. These are exposed in my package json files key as "dist". This works great, I can import these in a React app and use them in third party stuff.
3. Some things (fs etc) should also be exported for usage in NodeJS. How can I do this step? I cant put them in same index.ts exporting to dist, because then the browser stuff will brake. Please help me. Below I will give you some files of my project.

package.json:
{
  "name": "@data-story/core",
  "version": "0.0.67",
  "main": "dist/index.js",
  "type": "commonjs",
  "types": "dist/index.d.ts",
  "bin": {
    "server": "dist/server.js"
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "ts-node ./src/server/socket.ts",
    "tinker": "npx ts-node ./src/tinker.ts",
    "test": "vitest",
    "build": "tsc && webpack"
  },
  "dependencies": {
    "@hubspot/api-client": "^8.8.1",
    "@types/node": "18.14.2",
    "axios": "^1.3.4",
    "dotenv": "^16.0.3",
    "openai": "^3.2.1",
    "ws": "^8.12.1"
  },
  "devDependencies": {
    "@types/glob": "^8.1.0",
    "@types/ws": "^8.5.4",
    "@vitest/coverage-c8": "^0.29.7",
    "nodemon": "^2.0.21",
    "ts-node": "^10.9.1",
    "typescript": "4.9.5",
    "vitest": "^0.29.2",
    "webpack": "^5.88.1",
    "webpack-cli": "^5.1.4",
    "webpack-shebang-plugin": "^1.1.8"
  }
}

webpack.config.js:
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

tsconfig.json:
{
  "compilerOptions": {
    "target": "ES6",
    "lib": [
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "dist",
    "esModuleInterop": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "noImplicitAny": true,
    "types": [
      "vitest/globals"
    ],
    "declaration": true
  },
  "ts-node": {
    "compilerOptions": {
      "module": "CommonJS"
    }
  },
  "include": [
    "./src/**/*.ts"
  ],
  "exclude": [
    "./node_modules",
  ]
}

ChatGPT
The problem you're describing is how to package a library that has both Node.js-specific exports and browser-specific exports. This is indeed tricky because you don't want to bundle Node.js-specific code (like fs) with the browser-specific code. Here's a solution you can consider:

1. Multiple Entry Points
You need to create multiple entry points for different use cases:

One for browser usage, which can be bundled without any Node.js-specific dependencies.
One for Node.js usage, which includes all the Node.js-specific dependencies like fs.
Directory Structure:
lua
Copy code
src/
|-- browser/
|   |-- index.ts
|
|-- node/
|   |-- index.ts
|
|-- shared/
    |-- some-module.ts
browser/index.ts and node/index.ts are your entry points for browser and Node.js respectively. Any modules that are common to both environments can be placed in the shared/ directory.

2. Update tsconfig.json
You'll want to produce separate TypeScript builds for both Node.js and the browser. Update the tsconfig.json to produce different outputs:

json
Copy code
{
  "compilerOptions": {
    ...
    "outDir": "./dist",
    ...
  },
  "include": [
    "./src/**/*.ts"
  ]
}
With this configuration, TypeScript will compile your .ts files to JavaScript and output them to the dist/ directory maintaining the directory structure.

3. Update webpack.config.js
To bundle code specifically for the browser, you'll need to specify an entry point for the browser. Given the directory structure proposed, it would be ./dist/browser/index.js.

js
Copy code
entry: {
  server: './dist/node/index.js',
  browser: './dist/browser/index.js'
},
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].js'
},
This will produce both server.js and browser.js in the dist/ directory.

4. Update package.json
You need to provide pointers to the correct files for both browser and Node.js.

json
Copy code
{
  "main": "dist/node/index.js",
  "browser": "dist/browser/index.js",
  ...
}
The "main" field is used by default for both Node.js and the browser. The "browser" field provides an alternative entry point specifically for browser environments and tools that respect this field (like Webpack and Browserify).

5. Conditional Exports (Optional)
If you want more granular control, Node.js introduced "conditional exports" in package.json, allowing you to define different entry points based on the environment.

json
Copy code
{
  ...
  "exports": {
    "./node": "./dist/node/index.js",
    "./browser": "./dist/browser/index.js",
    ".": {
      "import": "./dist/node/index.mjs",
      "require": "./dist/node/index.js",
      "browser": "./dist/browser/index.js"
    }
  },
  ...
}
Using this method, you can directly import the environment-specific version using:

js
Copy code
import core from '@data-story/core/node';
or

js
Copy code
import core from '@data-story/core/browser';
Or simply use:

js
Copy code
import core from '@data-story/core';
Which will use the right version based on the environment.

Summary:
By adopting this strategy, you can efficiently bundle and export your library for both Node.js and browser environments without intermixing incompatible dependencies.