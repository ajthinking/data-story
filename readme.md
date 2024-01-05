## DataStory :dizzy:

Visual Programming | Data Transformation | ETL | Process design

![ds_readme_gif](https://user-images.githubusercontent.com/3457668/229267838-b8dcc5cc-9639-4f95-962b-48eae8250d4e.gif)


<a href="https://datastory.dev/docs" target="_blank">Docs</a>
| <a href="https://datastory.dev/playground" target="_blank">Playground</a>


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
    <main className="h-screen">
      <DataStory />
    </main>
  )
}
```

## Testing
When you're writing tests in your local environment

```bash 
# run component tests and then chose component test
yarn cy:open

# run e2e tests and then chose e2e test
yarn dev
yarn cy:open

# test on ci, only run @data-story/ui,  @data-story/core and e2e tests
yarn ci:test
```

## PWA
you can install playground as a PWA app on your device

```bash
cd ./packages/pwa
yarn

# run dev server
yarn dev
```

## License
[MIT](https://opensource.org/licenses/MIT)
