import { DataStory } from '@data-story/ui'
import { coreNodeProvider, Application } from '@data-story/core';
function App({ mode}: { mode?: 'js' | 'node' }) {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden' }} data-cy="playground">
      <DataStory
        server={mode === 'node'
          ? { type: 'SOCKET', url: 'ws://localhost:3100' }
          : { type: 'JS', app }}
      />
    </div>
  );
}

export default App
