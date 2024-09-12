'use client'

import { DataStory } from '@data-story/ui';
import { core, nodes } from '@data-story/core';
import { MockJSClient } from '../../splash/MockJSClient';
import { useMemo } from 'react';
import { useRequestApp } from '../../hooks/useRequestApp';

export default () => {
  const customNodeDescription = ['Comment', 'Ignore', 'Signal', 'ConsoleLog', 'Input'];
  const { app, loading } = useRequestApp();

  const nodeDescriptions = useMemo(() => {
    if (!loading && app) {
      return app.descriptions().filter((node) => customNodeDescription.includes(node.name));
    }
    return [];
  }, [app, loading]);

  const { Signal, Comment, Ignore } = nodes;

  const diagram = core.getDiagramBuilder()
    .add({ ...Signal, label: 'DataSource' }, { period: 200, count: 100 })
    .add({ ...Ignore, label: 'Storage' })
    .above('Signal.1').add(Comment, { content: '### Add Node Description 🔥' })
    .get();

  const client = useMemo(() => {
    return new MockJSClient({ diagram, app, nodeDescriptions });
  }, [diagram, app, nodeDescriptions]);

  if (!client) return null;

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        hideActivityBar={true}
      />
    </div>
  );
};
