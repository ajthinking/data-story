import { Application, coreNodeProvider, Diagram } from '@data-story/core';
import React from 'react';
import { DataStory } from '@data-story/ui';
import { loadDiagram, LocalStorageKey,  SaveComponent } from './Save';
import { ServerRequest } from '../const';

export default ({ mode }: {mode?: 'js' | 'node'}) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();

  const { diagram } = loadDiagram(LocalStorageKey);
  const [initDiagram] = React.useState<Diagram>(diagram);

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 72px)' }} data-cy="playground">
      <DataStory
        slotComponents={[
          <SaveComponent/>,
        ]}
        initDiagram={initDiagram}
        server={mode === 'node'
          ? { type: 'SOCKET', url: ServerRequest }
          : { type: 'JS', app }}
      />
    </div>
  );
};
