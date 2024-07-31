## DataStory :dizzy:

Bringing [flow-based programming](http://en.wikipedia.org/wiki/Flow-based_programming) to React and Node.js.

Visual Programming | Data Transformation | ETL | Process design

<a href="https://datastory.dev" target="_blank">Docs</a>
| <a href="https://datastory.dev/playground" target="_blank">Playground</a>

![ds_readme_gif](https://user-images.githubusercontent.com/3457668/229267838-b8dcc5cc-9639-4f95-962b-48eae8250d4e.gif)


![tests](https://github.com/ajthinking/data-story/actions/workflows/test.yml/badge.svg)
![status](https://img.shields.io/badge/status-unstable-yellow)
![npm version](https://img.shields.io/npm/v/@data-story/core?label=core&color=green)
![npm version](https://img.shields.io/npm/v/@data-story/ui?label=ui&color=green)
![npm version](https://img.shields.io/npm/v/@data-story/nodejs?label=nodejs&color=green)


## Installation
```bash
yarn add @data-story/ui
```

## Example Usage
```tsx
import '@data-story/ui/data-story.css';
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

## License
[MIT](https://opensource.org/licenses/MIT)
