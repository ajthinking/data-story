'use client'

import { DataStory } from '@data-story/ui';
import { core, nodes } from '@data-story/core';
import { CustomizeJSClient } from '../../splash/CustomizeJSClient';
import { useRequestApp } from '../../hooks/useRequestApp';

export default () => {
  const { Signal, Comment, Ignore } = nodes;

  const diagram = core.getDiagramBuilder()
    .add({ ...Signal, label: 'DataSource' }, { period: 200, count: 100 })
    .add({ ...Ignore, label: 'Storage' })
    .above('Signal.1').add(Comment, { content: '### Custom Config Activity Bar 🔥' })
    .get();
  const { app } = useRequestApp();
  const client = new CustomizeJSClient({ diagram: diagram, app });

  if (!client) return null;

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        hideControls={true}
        hideSidebar={true}
        hideActivityBar={['settings']}
      />
    </div>
  );
};
