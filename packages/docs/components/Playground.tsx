import React, { useEffect, useState } from 'react';
import { createJSClient, createSocketClient, DataStory } from '@data-story/ui';
import { useRequestApp } from './hooks/useRequestApp';
import { ToastComponent } from './Toast';

export default Playground;

function Playground({ mode }: {mode?: 'js' | 'node'}) {
  const { app, loading } = useRequestApp();
  const [client, setClient] = useState(null);

  useEffect(() => {
    if (mode === 'node') {
      const { client, dispose } = createSocketClient();
      setClient(client);
      return dispose;
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== 'node' && !loading) {
      const client = createJSClient(app);
      setClient(client);
    }
  }, [mode, app, loading]);

  if (loading || !client) return null;

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 72px)' }} data-cy="playground">
      <DataStory
        client={client}
      >
        <ToastComponent/>
      </DataStory>
    </div>
  );
};
