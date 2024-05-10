import { DataStory } from '@data-story/ui'
import {
  Application,
  DiagramBuilder,
  coreNodeProvider,
  nodes,
  UnfoldedDiagramFactory,
  multiline,
  str,
  StringableParam,
} from '@data-story/core';

export default ({ part }: { part: 'MAIN' | 'NESTED_NODE' | 'MAIN_UNFOLDED'}) => {
  const { Create, Table, Input, Map, Output, ConsoleLog } = nodes;

  const app = new Application();
  app.register(coreNodeProvider);

  // Make a nested node
  const nestedNode = new DiagramBuilder()
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

  // Hack to test if this really works
  const param = nestedNode.params.find(param => param.name === 'stamp') as StringableParam;
  param.interpolate = true;

  app.addNestedNode('FooBarStamper', nestedNode);

  app.boot();

  const diagram = new DiagramBuilder()
    .add({ ...Create, label: 'Users'}, { data: JSON.stringify([
      { name: 'Alice', age: 23 },
      { name: 'Bob', age: 34 },
      { name: 'Charlie', age: 45 },
    ]) })
    .addNestedNode('FooBarStamper', nestedNode)
    // .linkByLabel('Create.output', 'NestedNode.acceptable')
    .add(Table)
    .get()

  const nestedNodes = {
    'FooBarStamper': nestedNode,
  }

  const unfolded = new UnfoldedDiagramFactory(
    diagram.clone(), // TODO, unfolding should not mutate the diagram
    nestedNodes
  ).unfold();

  return (
    <div className="w-full h-1/2">
      {part === 'MAIN' && <DataStory
        server={{ type: 'JS', app }}
        callback={({ run }) => run()}
        initDiagram={diagram}
      />}
      {part === 'NESTED_NODE' && <DataStory
        server={{ type: 'JS', app }}
        initDiagram={nestedNode}
      />}
      {part === 'MAIN_UNFOLDED' && <DataStory
        server={{ type: 'JS', app }}
        initDiagram={
          unfolded.diagram
        }
      />}
    </div>
  );
};
