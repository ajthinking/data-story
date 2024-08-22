'use client'

import { DataStory, WorkspaceApiClient } from '@data-story/ui';
import { Application, coreNodeProvider, nodes } from '@data-story/core';
import { useMemo } from 'react';

export default () => {
  const app = new Application();
  app.register(coreNodeProvider);
  app.boot();

  const client = useMemo(() =>  new WorkspaceApiClient(), []);

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        server={{ type: 'JS', app }}
      />
    </div>
  );
};
