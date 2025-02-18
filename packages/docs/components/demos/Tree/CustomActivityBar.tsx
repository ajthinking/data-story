'use client'

import { DataStory } from '@data-story/ui';
import { core } from '@data-story/core';
import { CustomizeJSClient } from '../../splash/CustomizeJSClient';
import { useRequestApp } from '../../hooks/useRequestApp';

export default () => {
  const diagram = core.getDiagramBuilder()
    .add('Signal', { label: 'DataSource', period: 200, count: 100 })
    .add('Ignore', { label: 'Storage' })
    .add('Comment', { content: '### Custom Config Activity Bar 🔥' })
    .get();
  const { app } = useRequestApp();
  const client = new CustomizeJSClient({ diagram: diagram, app });

  if (!client) return null;

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        hideSidebar={true}
        hideActivityBar={['settings']}
      />
    </div>
  );
};
