# Migrating to a monorepo

## Installation
```bash
yarn add @data-story/ui`
```

## Example Usage
```tsx
import '@data-story/ui/dist/data-story.css';
import { DataStory } from '@data-story/ui'

export default function Home() {
  return (
    <main>
      <DataStory />
    </main>
  )
}
```

## Development Installation
### in root
```
yarn set version berry
yarn
npx nodemon -x "npx @data-story/core server"
```

### in core
```
yarn tsc --watch
npx webpack --watch
```

### in ui
```
yarn tsc --watch
yarn watch:css
npx webpack --watch
```

### in client
```
yarn dev
```

## Todo
- [ ] prevent conflicting css (if client have their own tailwindcss)
- [ ] installation in non workspace app via `yarn add @data-story/ui` gives:
```
- error Error [TypeError]: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at eval (webpack://@data-story/ui/../../node_modules/@reactflow/core/dist/esm/index.js?:82:74)
    at ../../node_modules/@reactflow/core/dist/esm/index.js (webpack-internal:///(sc_server)/./node_modules/@data-story/ui/dist/bundle.js:25:13)
    at __nested_webpack_require_711056__ (webpack-internal:///(sc_server)/./node_modules/@data-story/ui/dist/bundle.js:894:49)
    at eval (webpack://@data-story/ui/../../node_modules/reactflow/dist/esm/index.js?:69:73)
    at ../../node_modules/reactflow/dist/esm/index.js (webpack-internal:///(sc_server)/./node_modules/@data-story/ui/dist/bundle.js:75:13)
    at __nested_webpack_require_711056__ (webpack-internal:///(sc_server)/./node_modules/@data-story/ui/dist/bundle.js:894:49)
    at eval (webpack://@data-story/ui/./dist/components/DataStory/dataStoryControls.js?:5:21)
    at ./dist/components/DataStory/dataStoryControls.js (webpack-internal:///(sc_server)/./node_modules/@data-story/ui/dist/bundle.js:185:13)
    at __nested_webpack_require_711056__ (webpack-internal:///(sc_server)/./node_modules/@data-story/ui/dist/bundle.js:894:49)
    at eval (webpack://@data-story/ui/./dist/components/DataStory/DataStory.js?:32:29) {
  digest: undefined
}
```
