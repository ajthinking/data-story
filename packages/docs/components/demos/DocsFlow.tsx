import { DataStory } from '@data-story/ui'
import { core, multiline, nodes, } from '@data-story/core';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

export default () => {
  const { Signal, Pass, Comment, Ignore } = nodes;

  const diagram = core.getDiagramBuilder()
    .add({ ...Signal, label: 'DataSource' }, { period: 20, count: 100000 })
    .add({ ...Pass, label: 'Transforms' })
    .add({ ...Ignore, label: 'Actions' })
    .from('Pass.1.output').below('Ignore.1').add({ ...Pass, label: 'APIs' })
    .add({ ...Ignore, label: 'Storage' })
    .jiggle({ x: 60, y: 25 })
    .above('Signal.1').add(Comment, {
      content: multiline`
      ### DataStory 🔥
      Combine data sources, transforms, actions, APIs, storage and more. Create custom nodes for your business logic.
    `
    })
    .get()

  const { app, loading } = useRequestApp();
  const client = new CustomizeJSClient({ diagram: diagram, app });

  if (loading || !client) return null;

  return (
    <div className="w-full h-1/6">
      <DataStory
        client={client}
        onInitialize={(options) => options.run()}
        hideControls={true}
        hideActivityBar={true}
      />
    </div>
  );
};
