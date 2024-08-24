'use client'

import { DataStory } from '@data-story/ui';
import { Application, core, coreNodeProvider, nodes } from '@data-story/core';
import { JSClient } from '../../splash/MockJSClient';

export default () => {
  const customNodeDescription = ['Comment', 'Ignore', 'Signal', 'ConsoleLog', 'Input'];
  const app = new Application();
  app.register(coreNodeProvider);
  app.boot();
  const nodeDescriptions = app.descriptions().filter((node) => customNodeDescription.includes(node.name));

  const { Signal, Comment, Ignore } = nodes;

  const diagram = core.getDiagramBuilder()
    .add({...Signal, label: 'DataSource'}, { period: 200, count: 100})
    .add({...Ignore, label: 'Storage'})
    .above('Signal.1').add(Comment, { content:'### Add Node Description 🔥'})
    .get();

  const client = new JSClient(diagram, nodeDescriptions);

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        server={{ type: 'JS', app }}
        hideActivityBar={true}
      />
    </div>
  );
};
