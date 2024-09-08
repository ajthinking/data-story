'use client'

import { DataStory } from '@data-story/ui';
import { Application, core, coreNodeProvider, nodes } from '@data-story/core';
import { MockJSClient } from '../../splash/MockJSClient';
import useRequest from 'ahooks/lib/useRequest';
import { useMemo } from 'react';

export default () => {
  const customNodeDescription = ['Comment', 'Ignore', 'Signal', 'ConsoleLog', 'Input'];
  const {data: app, loading} = useRequest(async () => new Application()
    .register(coreNodeProvider)
    .boot());

  const nodeDescriptions = useMemo(() => {
    if (!loading) {
      return app.descriptions().filter((node) => customNodeDescription.includes(node.name));
    }
    return [];
  }, [app, loading]);

  const { Signal, Comment, Ignore } = nodes;

  const diagram = core.getDiagramBuilder()
    .add({...Signal, label: 'DataSource'}, { period: 200, count: 100})
    .add({...Ignore, label: 'Storage'})
    .above('Signal.1').add(Comment, { content:'### Add Node Description 🔥'})
    .get();

  const client = useMemo(() => new MockJSClient(diagram, app, nodeDescriptions), [diagram, app, nodeDescriptions]);

  return (
    <div className="w-full h-80 border-gray-400 border-4">
      <DataStory
        client={client}
        server={{ type: 'JS' }}
        hideActivityBar={true}
      />
    </div>
  );
};
