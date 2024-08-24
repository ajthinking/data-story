import { Application, core, coreNodeProvider, nodes } from '@data-story/core';
import React from 'react';
import { DataStory, type DataStoryObservers } from '@data-story/ui';
import { ServerRequest } from '../../const';
import { MockJSClient } from '../splash/MockJSClient';

export default ({ mode, observers }:
{
  mode?: 'js' | 'node',
  observers?: DataStoryObservers
}) => {
  const app = new Application()
    .register(coreNodeProvider)
    .boot();
  const { Signal, Table } = nodes;

  const diagram = core.getDiagramBuilder()
    .add(Signal, { period: 5, count: 30 })
    .add(Table)
    .get();
  const client = new MockJSClient(diagram);

  return (
    <div className="w-full" style={{ height: '36vh' }}>
      <DataStory
        client={client}
        observers={observers}
        server={{ type: 'JS', app }}
      />
    </div>
  );
};
