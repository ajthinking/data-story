import { DataStory } from '@data-story/ui'
import {
  Application,
  DiagramBuilder,
  coreNodeProvider,
  nodes,
  UnfoldedDiagramFactory,
  str,
  core,
} from '@data-story/core';
import { MockJSClient } from '../splash/MockJSClient';

export default ({ part }: { part: 'MAIN' | 'NESTED_NODE' | 'MAIN_UNFOLDED'}) => {
  const { Create, Table, Input, Map, Output, ConsoleLog } = nodes;

  // *************************************
  // Make a nested node
  // *************************************
  const nestedNode = core.getDiagramBuilder()
    .withParams([
      str({
        name: 'stamp',
        value: 'foo'}
      )
    ])
    .add(nodes.Input, { port_name: 'input'})
    .add(nodes.Map, { json: JSON.stringify({
      foo: 'bar',
      global_param_access: 'The foo stamp was >>>@{stamp}<<<',
    })})
    .add(nodes.Output, { port_name: 'stamped'})
    .get()

  // *************************************
  // Make app, register nested node
  // *************************************
  const app = new Application();
  app.register(coreNodeProvider);
  app.addNestedNode('FooBarStamper', nestedNode);
  app.boot();

  // *************************************
  // Build main diagram, use the nested node
  // *************************************
  const diagram = core.getDiagramBuilder()
    .add({ ...Create, label: 'Users'}, { data: JSON.stringify([
      { name: 'Alice', age: 23 },
      { name: 'Bob', age: 34 },
      { name: 'Charlie', age: 45 },
    ]) })
    .addNestedNode('FooBarStamper', nestedNode)
    .add(Table)
    .get()

  // *************************************
  // Unfold diagram (for visualization purposes)
  // *************************************
  const nestedNodes = {
    'FooBarStamper': nestedNode,
  }

  const unfolded = new UnfoldedDiagramFactory(
    diagram.clone(),
    nestedNodes
  ).unfold();

  const mainClient = new MockJSClient(diagram);
  const mainUnfoldedClient = new MockJSClient(unfolded.diagram);
  const nestedNodeClient = new MockJSClient(nestedNode);

  // *************************************
  // Render requested part
  // *************************************
  return (
    <div className="w-full h-1/4">
      {part === 'MAIN' && <DataStory
        server={{ type: 'JS', app }}
        onInitialize={({ run }) => run()}
        client={mainClient}
      />}
      {part === 'NESTED_NODE' && <DataStory
        server={{ type: 'JS', app }}
        client={nestedNodeClient}
      />}
      {part === 'MAIN_UNFOLDED' && <DataStory
        server={{ type: 'JS', app }}
        client={mainUnfoldedClient}
      />}
    </div>
  );
};
