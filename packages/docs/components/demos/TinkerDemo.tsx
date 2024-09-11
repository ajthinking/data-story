import { DataStory } from '@data-story/ui'
import { core, str, } from '@data-story/core';
import { MockJSClient } from '../splash/MockJSClient';
import { useRequestApp } from '../hooks/useRequestApp';

// This component is just a place to sketch
export default () => {
  const { app, loading } = useRequestApp();

  const diagram = core.getDiagramBuilderV3()
    .add('Create')
    .get()

  diagram.params = [
    str({
      name: 'message',
      help: 'A message to pass on into the execution.',
    })
  ]
  const client = new MockJSClient({ diagram: diagram, app });

  if (loading || !client) return null;
  return (
    <div className="w-full h-1/2">
      <DataStory
        client={client}
      />
    </div>
  );
};
