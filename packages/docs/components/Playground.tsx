import { DataStory } from '@data-story/ui'
import { coreNodeProvider, Application } from '@data-story/core';

export default ({ mode}: { mode?: 'js' | 'node' }) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();

  return (
    <div className="w-full" style={{ height: '100vh' }} data-cy="playground">
      <DataStory
        server={mode === 'node'
          ? { type: 'SOCKET', url: 'ws://localhost:3100' }
          : { type: 'JS', app }}
      />
    </div>
  );
};
