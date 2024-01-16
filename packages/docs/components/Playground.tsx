import { Application, coreNodeProvider, Diagram } from '@data-story/core';
import React from 'react';
import { DataStory } from '@data-story/ui';
import { loadDiagram, LocalStorageKey, SaveComponent } from './Save';

export default ({ mode }: {mode?: 'js' | 'node'}) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();

  const { diagram } = loadDiagram(LocalStorageKey);
  const [initDiagram] = React.useState<Diagram>(diagram);

  return (
    <div className="w-full" style={{ height: '100vh' }} data-cy="playground">
      <DataStory
        slotComponent={<SaveComponent/>}
        initDiagram={initDiagram}
        server={mode === 'node'
          ? { type: 'SOCKET', url: 'ws://localhost:3100' }
          : { type: 'JS', app }}
      />
    </div>
  );
};
