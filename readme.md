# Migrating to a monorepo

### Installation

### in core
```
yarn tsc --watch
npx webpack --watch
```

### in ui
```
yarn tsc --watch
npx webpack --watch
```

### in client
```
yarn dev
```
go to localhost:3000, See it crash


```
- error Error [TypeError]: (0 , react__WEBPACK_IMPORTED_MODULE_1__.createContext) is not a function
    at eval (webpack://@data-story/ui/../../node_modules/@reactflow/core/dist/esm/index.js?:82:74)
    at ../../node_modules/@reactflow/core/dist/esm/index.js (webpack-internal:///(sc_server)/../ui/dist/bundle.js:25:13)
    at __nested_webpack_require_710141__ (webpack-internal:///(sc_server)/../ui/dist/bundle.js:899:49)
    at eval (webpack://@data-story/ui/../../node_modules/reactflow/dist/esm/index.js?:69:73)
    at ../../node_modules/reactflow/dist/esm/index.js (webpack-internal:///(sc_server)/../ui/dist/bundle.js:75:13)
    at __nested_webpack_require_710141__ (webpack-internal:///(sc_server)/../ui/dist/bundle.js:899:49)
    at eval (webpack://@data-story/ui/./dist/components/DataStory/dataStoryControls.js?:5:21)
    at ./dist/components/DataStory/dataStoryControls.js (webpack-internal:///(sc_server)/../ui/dist/bundle.js:185:13)
    at __nested_webpack_require_710141__ (webpack-internal:///(sc_server)/../ui/dist/bundle.js:899:49)
    at eval (webpack://@data-story/ui/./dist/components/DataStory/DataStory.js?:32:29) {
  digest: undefined
}
```