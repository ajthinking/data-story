import { Application, coreNodeProvider } from '@data-story/core';
import React, { useMemo } from 'react';
import { DataStory, WorkspaceApiJSClient, WorkspaceSocketClient } from '@data-story/ui';
import { SaveComponent } from './Save';
import useRequest from 'ahooks/lib/useRequest';

export default Playground;

function Playground({ mode }: {mode?: 'js' | 'node'}) {
  const appAsync = new Application()
    .register(coreNodeProvider)
    .boot();

  const {data: app, loading} = useRequest(async () => appAsync, {
    manual: false,
  }, []);
  console.log('11111111', app, loading);

  const client = useMemo(() => {
    if (mode === 'node') return new WorkspaceSocketClient();
    if (loading) return null;
    return new WorkspaceApiJSClient(app);
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
