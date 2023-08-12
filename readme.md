## DataStory :dizzy:

Visual Programming | Data Transformation | ETL | Process design

![ds_readme_gif](https://user-images.githubusercontent.com/3457668/229267838-b8dcc5cc-9639-4f95-962b-48eae8250d4e.gif)

## Resources

<a href="https://data-story-docs.vercel.app/" target="_blank">Docs</a>



## Installation
```bash
yarn add @data-story/ui
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
