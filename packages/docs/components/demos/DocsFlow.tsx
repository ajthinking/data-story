import { DataStory } from '@data-story/ui'
import { core, multiline, sleep, str, } from '@data-story/core';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';
import useRequest from 'ahooks/lib/useRequest';

export default () => {
  const { app, loading: appLoading } = useRequestApp();

  const { data: diagram, loading: diagramLoading } = useRequest(async() => {
    await core.boot();
    const diagram = core.getDiagramBuilderV3()
      .add('Signal', { period: 20, count: 100000 })
      .add('Pass', { label: 'Transforms' })
      .add('Ignore', { label: 'Actions' })
      .add('Ignore', { label: 'Storage' })
      .add('Comment', {
        content: multiline`
      ### DataStory 🔥
      Combine data sources, transforms, actions, APIs, storage and more. Create custom nodes for your business logic.
    `
      })
      .connect()
      .place()
      .jiggle({ x: 60, y: 25 })
      .get()

    diagram.params = [
      str({
        name: 'message',
        help: 'A message to pass on into the execution.',
      })
    ]
    return diagram;
  });

  const client = new CustomizeJSClient({ diagram, app });

  if (appLoading || !client || diagramLoading) return null;

  return (
    <div className="w-full h-1/6">
      <DataStory
        client={client}
        onInitialize={(options) => {
          sleep(1000).then(() => {
            options.run()
          })
        }}
        hideControls={true}
        hideActivityBar={true}
      />
    </div>
  );
};
