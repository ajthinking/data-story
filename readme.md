## DataStory :dizzy:

![tests](https://github.com/ajthinking/data-story/actions/workflows/test.yml/badge.svg)
![status](https://img.shields.io/badge/status-unstable-yellow)
![npm version](https://img.shields.io/npm/v/@data-story/core?label=core&color=green)
![npm version](https://img.shields.io/npm/v/@data-story/ui?label=ui&color=green)
![npm version](https://img.shields.io/npm/v/@data-story/nodejs?label=nodejs&color=green)
![vs code extension](https://vsmarketplacebadges.dev/version/ajthinking.ds-ext.svg)

🛠️ Real-time, observable, [Flow-based programming](http://en.wikipedia.org/wiki/Flow-based_programming) for React, Node.js and VS Code. <a href="https://datastory.dev" target="_blank">Docs</a>
| <a href="https://datastory.dev/playground" target="_blank">Playground</a>

![ds-tech-gif](https://github.com/user-attachments/assets/d2dbbdda-8757-43b1-a749-c24646e3d315)

### VS Code extension
A _preliminary implementation_ is available under name [`ds-ext`](https://marketplace.visualstudio.com/items?itemName=ajthinking.ds-ext).

![trimmed-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/0941a210-252a-4c23-9309-f115b7c212e0)

### Usage with React
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

## Installation
```bash
yarn add @data-story/ui
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
````

## License
[MIT](https://opensource.org/license/mit)
