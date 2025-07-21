import { DataStory } from '@data-story/ui'
import { core, multiline, sleep, str } from '@data-story/core';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';
import { useRequestApp } from '../hooks/useRequestApp';
import useRequest from 'ahooks/lib/useRequest';

export default () => {
  const { app, loading: appLoading } = useRequestApp();

  const { data: diagram, loading: diagramLoading } = useRequest(async() => {
    await core.boot();
    const diagram = core.getDiagramBuilder()
      .add('Create')
      .add('Request')
      .add('Sleep', { duration: 200 })
      .add('Table')
      .add('Throw', {
        message: 'Something went wrong',
        position: { x: 450, y: 250 },
      })
      .add('Comment', {
        content: multiline`
          ### DataStory 🔥
          Combine data sources, transforms, actions, APIs, storage and more. Create custom nodes for your business logic.
        `,
        position: { x: 100, y: -150 },
      })
      .connect(`
        Create.1.output ---> Request.1.input
        Request.1.items ---> Sleep.1.input
        Request.1.error ---> Throw.1.input
        Sleep.1.output ---> Table.1.input
      `)
      .place()
      .jiggle({ x: 60, y: 25 })
      .get()

    diagram.params = [
      str({
        name: 'message',
        help: 'A message to pass on into the execution.',
      }),
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
        hideActivityBar={true}
      />
    </div>
  );
};
