import React, { useMemo } from 'react';
import { DataStory, WorkspaceApiJSClient, WorkspaceSocketClient } from '@data-story/ui';
import { useRequestApp } from './hooks/useRequestApp';
import { ToastComponent } from './Toast';

export default Playground;

function Playground({ mode }: {mode?: 'js' | 'node'}) {
  const { app, loading } = useRequestApp();

  const client = useMemo(() => {
    if (mode === 'node') return new WorkspaceSocketClient();
    if (!loading) return new WorkspaceApiJSClient(app);
    return null;
  }, [mode, app, loading]);

  if(loading || !client) return null;

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 72px)' }} data-cy="playground">
      <DataStory
        toastSlotComponent={<ToastComponent />}
        client={client}
        initSidebarKey="explorer"
      />
    </div>
  );
};
