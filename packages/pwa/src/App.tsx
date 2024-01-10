import { DataStory } from '@data-story/ui'
import { coreNodeProvider, Application, type Computer  } from '@data-story/core';
import { ReadComputer } from './ReadFile';
function App({ mode}: { mode?: 'js' | 'node' }) {
  const originalRegister = coreNodeProvider.register;

  coreNodeProvider.register = (app: Application) => {
    originalRegister(app);

    const pwaComputer: Map<string, Computer> = new Map();
    pwaComputer.set(ReadComputer.name, ReadComputer);

    app.addComputers(pwaComputer);
  }

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
