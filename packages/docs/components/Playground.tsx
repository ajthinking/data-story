import React, { useEffect, useState } from 'react';
import { createJSClient, createSocketClient, DataStory } from '@data-story/ui';
import { useRequestApp } from './hooks/useRequestApp';
import { ToastComponent } from './Toast';
import { Diagram } from '@data-story/core';

export default Playground;

const loadDiagram = (key: string) => {
  let initDiagram = new Diagram();

  if (typeof window === 'undefined' || !localStorage?.getItem(key)) {
    return initDiagram;
  }

  const json = localStorage?.getItem(key);
  const { diagram } = JSON.parse(json!);

  initDiagram = new Diagram({
    nodes: diagram.nodes,
    links: diagram.links
  });

  return initDiagram;
}

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

  const initDiagram = loadDiagram('data-story-tree');
  if (loading || !client) return null;

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 72px)' }} data-cy="playground">
      <DataStory
        client={client}
        initDiagram={initDiagram}
      >
        <ToastComponent/>
      </DataStory>
    </div>
  );
};
