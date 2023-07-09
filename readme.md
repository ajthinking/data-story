# Migrating to a monorepo

### Installation
`yarn`

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
- error TypeError: (0 , react_1.useState) is not a function or its return value is not iterable
    at Hey (webpack://@data-story/ui/./dist/components/Hey.js?:7:56)
    at stringify (<anonymous>)
- error TypeError: (0 , react_1.useState) is not a function or its return value is not iterable
    at Hey (webpack://@data-story/ui/./dist/components/Hey.js?:7:56)
    at stringify (<anonymous>)
digest: "2005000493"
```

This happens while `client` trying to render a minimal component `<Hey />` from `ui`.

Once that example is working, we need to export and render the actual `<DataStory />` component and ensure all functionallity and styles are working.
