import { DataStory } from '@data-story/ui'
import { core, multiline, sleep, str, } from '@data-story/core';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';
import useRequest from 'ahooks/lib/useRequest';

export default () => {
  const { app, loading: appLoading } = useRequestApp();

  const { data: diagram, loading: diagramLoading } = useRequest(async() => {
    console.log('Dhe fuck?')
    await core.boot();
    const diagram = core.getDiagramBuilderV3()
      .add('Signal', { label: 'Read',period: 20, count: 100000 })
      .add('Pass', { label: 'Transform' })
      .add('Sample', { label: 'Filter' })
      .add('Ignore', { label: 'Act' })
      .add('Ignore', { label: 'Ignore' })
      .add('Comment', {
        content: multiline`
          ### DataStory 🔥
          Combine data sources, transforms, actions, APIs, storage and more. Create custom nodes for your business logic.
        `,
        position: { x: 100, y: -150 },
      })
      .connect(`
        Signal.1.output ---> Pass.1.input
        Pass.1.output ---> Sample.1.input
        Sample.1.sampled ---> Ignore.1.input
        Sample.1.not_sampled ---> Ignore.2.input
      `)
      .place()
      .jiggle({ x: 60, y: 25 })
      .get()

    diagram.params = [
      str({
        name: 'message',
        help: 'A message to pass on into the execution.',
      })
    ]

    console.log({
      xs: diagram.nodes.map(n => n.position!.x),
      ys: diagram.nodes.map(n => n.position!.y),
    })

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
