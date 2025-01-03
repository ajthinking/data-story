'use client'

import { DataStory } from '@data-story/ui';
import { core, nodes } from '@data-story/core';
import { CustomizeJSClient } from '../../splash/CustomizeJSClient';
import { useRequestApp } from '../../hooks/useRequestApp';

export default () => {
  const { Signal, Comment, Ignore } = nodes;
  const { app, loading } = useRequestApp();

  const diagram = core.getDiagramBuilder()
    .add('Signal', { label: 'DataSource', period: 200, count: 100 })
    .add('Ignore', { label: 'Storage' })
    .add('Comment', { content: '### Single Diagram 🔥' })
    .get();

  const client = new CustomizeJSClient({ diagram: diagram, app });

  if(!client) return null;

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        hideControls={true}
        hideSidebar={true}
        hideActivityBar={true}
      />
    </div>
  );
};
