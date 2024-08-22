import { DataStory } from '@data-story/ui'
import { Application, core, coreNodeProvider, nodes, str, } from '@data-story/core';
import { JSClient } from '../splash/MockJSClient';

// This component is just a place to sketch
export default () => {
  const { Create, Table, Input, Map, Output, ConsoleLog } = nodes;

  const app = new Application();
  app.register(coreNodeProvider);

  app.boot();

  const diagram = core.getDiagramBuilderV3()
    .add('Create')
    .get()

  diagram.params = [
    str({
      name: 'message',
      help: 'A message to pass on into the execution.',
    })
  ]
  const client = new JSClient(diagram);

  return (
    <div className="w-full h-1/2">
      <DataStory
        server={{ type: 'JS', app }}
        client={client}
      />
    </div>
  );
};
