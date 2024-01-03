import * as UI from '@data-story/ui'
import * as Core from '@data-story/core';
function App({ mode}: { mode?: 'js' | 'node' }) {
  const app = new Core.Application()
    .register(Core.coreNodeProvider)
    .boot();

  return (
    <div style={{ height: '100vh', width: '100vw' }} data-cy="playground">
      <UI.DataStory
        server={mode === 'node'
          ? { type: 'SOCKET', url: 'ws://localhost:3100' }
          : { type: 'JS', app }}
      />
    </div>
  );
}

export default App
