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
  const { Create, Table, Input, Map, Output, ConsoleLog, Signal, Ignore } = nodes;

  const app = new Application();
  app.register(coreNodeProvider);

  // Make a nested node
  const nestedNode = new DiagramBuilder()
    .withParams([
      str({
        name: 'log_message',
        value: 'hey a log message'}
      )
    ])
    .add(nodes.Input, { port_name: 'input'})
    .add(nodes.Map, { json: JSON.stringify({
      message: 'Hello World, @{log_message}!',
    })})
    .add(nodes.Output, { port_name: 'output'})
    .add(ConsoleLog)
    .add(Create, { data: JSON.stringify({
      message: 'Create, @{log_message}!',
    })})
    .add(ConsoleLog)
    .get()

  // Hack to test if this really works
  const param = nestedNode.params.find(param => param.name === 'log_message') as StringableParam;
  param.interpolate = true;

  app.addNestedNode('InstantLog', nestedNode);

  app.boot();

  const diagram = new DiagramBuilder()
    .add(Signal, { count: 3 })
    .addNestedNode('InstantLog', nestedNode)
    .add(Ignore)
    .get()

  const nestedNodes = {
    'InstantLog': nestedNode,
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
