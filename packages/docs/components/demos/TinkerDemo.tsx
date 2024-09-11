import { DataStory } from '@data-story/ui'
import { core, str, } from '@data-story/core';
import { MockJSClient } from '../splash/MockJSClient';

// This component is just a place to sketch
export default () => {
  const diagram = core.getDiagramBuilderV3()
    .add('Create')
    .get()

  diagram.params = [
    str({
      name: 'message',
      help: 'A message to pass on into the execution.',
    })
  ]
  const client = new MockJSClient(diagram);

  return (
    <div className="w-full h-1/2">
      <DataStory
        client={client}
      />
    </div>
  );
};
