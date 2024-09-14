import { DataStory } from '@data-story/ui'
import { core, str, } from '@data-story/core';
import { MockJSClient } from '../splash/MockJSClient';
import { useRequestApp } from '../hooks/useRequestApp';
import useRequest from 'ahooks/lib/useRequest';

// This component is just a place to sketch
export default () => {
  const { app, loading: appLoading } = useRequestApp();

  const { data: diagram, loading: diagramLoading } = useRequest(async() => {
    await core.boot();
    const diagram = core.getDiagramBuilderV3()
      .add('Create')
      .get()

    diagram.params = [
      str({
        name: 'message',
        help: 'A message to pass on into the execution.',
      })
    ]
    return diagram;
  });

  const client = new MockJSClient({ diagram, app });

  if (appLoading || !client || diagramLoading) return null;
  return (
    <div className="w-full h-1/2">
      <DataStory
        client={client}
        hideControls={['save']}
      />
    </div>
  );
};
