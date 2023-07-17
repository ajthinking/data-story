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