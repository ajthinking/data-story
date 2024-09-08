import { Application, coreNodeProvider } from '@data-story/core';
import React, { useMemo } from 'react';
import { DataStory, WorkspaceApiJSClient, WorkspaceSocketClient } from '@data-story/ui';
import { SaveComponent } from './Save';
import useRequest from 'ahooks/lib/useRequest';

export default Playground;

const appAsync = new Application()
  .register(coreNodeProvider)
  .boot();

function Playground({ mode }: {mode?: 'js' | 'node'}) {
  const {data: app, loading} = useRequest(async () => appAsync);

  const client = useMemo(() => {
    if (mode === 'node') return new WorkspaceSocketClient();
    if (!loading) return new WorkspaceApiJSClient(app);
    return null;
  }, [mode, app, loading]);

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 72px)' }} data-cy="playground">
      <DataStory
        client={client}
        slotComponents={[
          <SaveComponent/>,
        ]}
        server={{ type: 'JS' }}
        initSidebarKey="explorer"
      />
    </div>
  );
};
