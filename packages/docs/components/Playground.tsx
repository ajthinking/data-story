'use client'

import { Application, coreNodeProvider } from '@data-story/core';
import React, { useMemo } from 'react';
import { DataStory, WorkspaceApiJSClient, WorkspaceSocketClient } from '@data-story/ui';
import { SaveComponent } from './Save';

export default Playground;

const app = new Application()
  .register(coreNodeProvider)
  .boot();

function Playground({ mode }: {mode?: 'js' | 'node'}) {
  const client = useMemo(() => {
    if (mode === 'node') return new WorkspaceSocketClient();

    return new WorkspaceApiJSClient(app)
  }, [mode]);

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 72px)' }} data-cy="playground">
      <DataStory
        client={client}
        slotComponents={[
          <SaveComponent/>,
        ]}
        server={{ type: 'JS', app: null }}
        initSidebarKey="explorer"
      />
    </div>
  );
};
