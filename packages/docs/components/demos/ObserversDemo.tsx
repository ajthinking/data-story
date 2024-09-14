import { core, nodes } from '@data-story/core';
import React from 'react';
import { DataStory, type DataStoryObservers } from '@data-story/ui';
import { MockJSClient } from '../splash/MockJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

export default ({ mode, observers }:
{
  mode?: 'js' | 'node',
  observers?: DataStoryObservers
}) => {
  const { Signal, Table } = nodes;
  const diagram = core.getDiagramBuilder()
    .add(Signal, { period: 5, count: 30 })
    .add(Table)
    .get();

  const { app, loading } = useRequestApp();
  const client = new MockJSClient({ diagram: diagram, app });

  if (loading || !client) return null;
  return (
    <div className="w-full" style={{ height: '36vh' }}>
      <DataStory
        client={client}
        observers={observers}
        hideControls={['save']}
      />
    </div>
  );
};
